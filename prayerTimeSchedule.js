const schedule = require('node-schedule');
const PrayerTimeFireStore = require('./prayerTimeFireStore');
const PrayerTimeWrapper = require('./prayerTimeWrapper');
const moment = require('moment-timezone')
const request = require('request');

class PrayerTimeScheduler {
    constructor(options, db, discordClient) {
        this.db = db;
        this.dc = discordClient;
        this.pt_fs = new PrayerTimeFireStore(db);
        this.rotationSchedule = null; // the one that rotate every one day and recalculate all the times for the new day
        this.reminderSchedulers = [];
        let ptwOpt = null;
        if (options && options.ptwOptions !== undefined) {
            ptwOpt = options.ptwOptions;
        }
        this.ptw = new PrayerTimeWrapper(ptwOpt);

        this.remindTimeRange = {
            time: 10,
            unit: 'm' // minutes
        }

        if (options && options.remindTimeRange) {
            this.remindTimeRange = options.remindTimeRange;
        }

        this.timesToScheduls = [
            'Fajr',
            'Dhuhr',
            'Asr',
            'Maghrib',
            'Isha'
        ];

        if (options && options.timesToScheduls) {
            this.timesToScheduls = options.timesToScheduls;
        }

    }

    isTimeTypeScheduled(timeType) {

        // console.log('time to schedules');
        // console.dir(this.timesToScheduls);
        // console.log('  ============= dd =========' + timeType);
        // let res =  (timeType in this.timesToScheduls);
        // console.log('res = ' + res.toString());
        // return res;

        for (let i = 0; i < this.timesToScheduls.length; i++) {
            if (this.timesToScheduls[i] === timeType) {
                return true;
            }
        }
        return false;
    }

    getCitiesAndSchedule() {
        // get cities from database
        let self = this;
        console.log("getting cities");
        this.pt_fs.getAllCities().then(function (snapshot) {
            snapshot.forEach(doc => {
                // here we get all cities docs
                let data = doc.data();
                let city = data.city;
                let country = data.country;

                self.ptw.setOptions({
                    city,
                    country
                });

                self.ptw.getTimingByCity().then(function (o) {
                    let timeZone = o.body.data.meta.timezone;

                    let day = numberToTwoDigit(o.body.data.date.gregorian.day.toString());

                    let month = numberToTwoDigit(o.body.data.date.gregorian.month.number.toString());

                    let year = o.body.data.date.gregorian.year.toString();

                    let dateFormated = `${year}-${month}-${day}`;

                    let timings = o.body.data.timings;

                    let haveSchedule = self.oneCitySchedule(country, city, timings, dateFormated, timeZone);

                    // check if any schedule was set! if not do it with the next day 
                    if (!haveSchedule) {
                        console.log(" ======= current day is passed! Scheduling the next day !!!!!!!!!!!");
                        
                        self.oneCityScheduleNextDay(country, city, dateFormated, timeZone);
                    }

                }).catch(function (err) {
                    console.error('Error: !!!');
                    console.error(err);
                });

                console.log(doc.id + ' => ' + doc.data());
                console.dir(doc.data());
            });
        }).catch(function (err) {
            console.error(err);
        });
    }

    oneCitySchedule(country, city, timings, dateFormated, timeZone) {
        let self = this;
        console.log("city !!!!!!! = " + city);
        let schedulePlanned = false;

        let timingsNames = Object.keys(timings);

        for (let i = 0; i < timingsNames.length; i++) {
            let timeName = timingsNames[i];
            let time = timings[timeName];

            console.log('timeName = ' + timeName);

            if (self.isTimeTypeScheduled(timeName)) {
                // console.log('timeName = ' + timeName);


                // console.log('date iso = ' + dateFormated);
                // console.log('time = ' + time);

                let jobTime_ = `${dateFormated} ${time}`;
                // console.log('jobTime = ' + jobTime_);
                let jobTime = moment.tz(jobTime_, timeZone);



                // console.log('jobe time = ' + jobTime.format());

                let currentTime = new Date();

                if (jobTime.toDate() - currentTime > 0) {
                    console.log('yea we get a time');
                    console.log(jobTime.format());

                    jobTime.subtract(self.remindTimeRange.time, self.remindTimeRange.unit);

                    let jobTimeDate = jobTime.toDate();
                    if (jobTimeDate - currentTime > 0) {
                        console.log("cool reminder nice");

                        console.log('reminder time = ' + jobTime.format());

                        // use jobtime date to create the scheduler

                        let schedulePos = self.reminderSchedulers.length;

                        self.reminderSchedulers.push(
                            schedule.scheduleJob(jobTimeDate, function () {
                                // here go the closures
                                // let city = city;
                                // let country = country;
                                //
                                console.log('The world is going to be better today.');
                                console.log('reminder trigered at ' + (new Date()).toString());
                                console.log('due to schedule at : ' + jobTime.format());

                                // here go the send to user
                                console.log("city = " + city);
                                console.log("country = " + country);
                                self.alertCityUsers(country, city, timeName).catch(function (err) {
                                    console.error(err);
                                });

                                if (timeName === 'Isha') {
                                    self.oneCityScheduleNextDay(country, city, dateFormated, timeZone);
                                }
                                // remove the scheduler obj from the list
                                self.removeSchedule(schedulePos);
                            })
                        );
                        schedulePlanned = true;
                        console.log('Schedule was set');
                    } else {
                        // treat the case where the salat time isn't reached yet but we passed the remind time

                        // send the messages right away.
                    }
                } else {
                    // treat here the case when the current time have passed the prayer time 

                    // one of the thing is to send messages rigth away
                    console.log('----------------- ' + timeName + ' passed ! ------------');
                }
            }
        }

        return schedulePlanned;
    }

    oneCityScheduleNextDay(country, city, dateFormated, timeZone) {
        let self = this;
        let nextDay = moment.tz(dateFormated, timeZone).add(1, 'day');

        let nextDayFormated = nextDay.format('YYYY-MM-DD');
        nextDay = moment.tz(nextDayFormated, timeZone);
        self.ptw.setOptions({
            date_or_timestamp: nextDay.toDate()
        });
        self.ptw.getTimingByCity().then(function (o) {
            let timings = o.body.data.timings;

            self.oneCitySchedule(country, city, timings, nextDayFormated, timeZone);
        }).catch(function (err) {
            console.error(err);  
        });
    }

    removeSchedule(pos) {
        this.reminderSchedulers.splice(pos, 1);
    }

    alertCityUsers(country, city, prayerTime) {
        let self = this;
        return new Promise(function (resolve, reject) {
            console.log('get users from db');
            self.pt_fs.getACityUsers(country, city).then(function (snapshot) {
                snapshot.forEach(doc => {
                    let d = doc.data();
                    console.log('going to fetch user');
                    let user = self.dc.users.get(d.id);
                    console.log('user (' + d.id + ',' + d.username + ') ===>');
                    console.dir(user);
                    self.alertUser(user, country, city, prayerTime);
                });
                console.log('finish');
                resolve(snapshot);
            }).catch(function (err) {
                console.error(err);
                reject(err);
            });
        });
    }

    alertUser(user, country, city, prayerTime) {
        let msg = `Time for Salat ${prayerTime} is in ${this.remindTimeRange.time} ${verbaliseTimeUnit(this.remindTimeRange.unit)}`;
        console.log(msg);
        user.send(msg);
    }

}


function verbaliseTimeUnit(unit) {
    switch (unit) {
        case 'm':
            return 'minutes';
        case 'mins':
            return 'minutes';
        case 'min':
            return 'minute';
        case 'h':
            return 'hours';

    }
}

function uriFormatParams(params) {
    return "?" + Object
        .keys(params)
        .map(function (key) {
            return key + "=" + encodeURIComponent(params[key])
        })
        .join("&")
}

function getUri(endPoint, params) {
    return endPoint + uriFormatParams(params);
}

function numberToTwoDigit(number) {
    if (number.length === 1) {
        number = "0" + number;
    }
    return number;
}

module.exports = PrayerTimeScheduler;