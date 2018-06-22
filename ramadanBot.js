const date = require('date-and-time')

let Ramadan = function (options) {
    let that = this;

    let ramadanStartDay;
    let ramadanEndDay;
    let ramadanLaylatCheckDay;

    // process state flags
    let ramadanSahaState;
    let ramadanSahaAndThankingState;


    this.init = function () {
        let defaultOptions = {
            sahaRamdankTime: [{
                hours: 8,
                minutes: 0,
                seconds: 0,
                effectiveRange: null
            }],
            sahaFtourekTime: [{
                hours: 18,
                minutes: 0,
                seconds: 0,
                effectiveRange: null

            }],
            sahaShourekTime: [{
                    hours: 23,
                    minutes: 0,
                    seconds: 0,
                    effectiveRange: null
                },
                {
                    hours: 3,
                    minutes: 0,
                    seconds: 0,
                    effectiveRange: null
                }
            ],
            checkTimeInterval: 1800000, // half an hour
            ramadanStartDay: null,
            ramadanEndDay: null,
            ramadanLaylatCheckDay: null,
            print: {
                /**
                 * callback, consoleLog, callback&consoleLog, alert ...
                 */
                mod: 'callback',
                callback: null
            }
        }

        options = Object.assign({}, defaultOptions, options);

        // options.sahaRamdankTime = Object.assign({}, defaultOptions.sahaRamdankTime, options.sahaRamdankTime);

        // options.sahaFtourekTime = Object.assign({}, defaultOptions.sahaFtourekTime, options.sahaFtourekTime);

        // options.sahaShourekTime = Object.assign({}, defaultOptions.sahaShourekTime, options.sahaShourekTime);

        options.print = Object.assign({}, defaultOptions.print, options.print);

        // ramadan days
        ramadanStartDay = options.ramadanStartDay ? this.zeroDateTime(options.ramadanStartDay) : null;
        ramadanEndDay = options.ramadanEndDay ? this.zeroDateTime(options.ramadanEndDay) : null;
        ramadanLaylatCheckDay = options.ramadanLaylatCheckDay ? this.zeroDateTime(options.ramadanLaylatCheckDay) : null;

        // process state flags
        ramadanSahaState = false;
        ramadanSahaAndThankingState = false;

        this.initSahaTime();
    }


    this.setRamadanStartDay = function (date) {
        ramadanStartDay = this.zeroDateTime(date);
        options.ramadanStartDay = this.zeroDateTime(date);
    }
    this.setRamadanEndDay = function (date) {
        ramadanEndDay = this.zeroDateTime(date);
        options.ramadanEndDay = this.zeroDateTime(date);
    }
    this.setRamadanLaylatCheckDay = function (date) {
        ramadanLaylatCheckDay = this.zeroDateTime(date);
        options.ramadanLaylatCheckDay = this.zeroDateTime(date);
    }
    // what this function does is initiating and appending the vars that need to be added isSaidVar
    this.initSahaTime = function (sahaTimeProp) {
        if (typeof sahaTimeProp === 'undefined') {
            let sahaTimeProps = ['sahaRamdankTime', 'sahaFtourekTime', 'sahaShourekTime'];

            sahaTimeProps.forEach(function (prop) {
                initOneSahaTime(prop);
            });
        } else {
            initOneSahaTime(sahaTimeProp);
        }
    }

    function initOneSahaTime(sahaTimeProp) {
        for (let i = 0; i < options[sahaTimeProp].length; i++) {
            // first we  parse
            options[sahaTimeProp][i] = that.sahaTimeParse(options[sahaTimeProp][i]);

            // we get our time object
            // isSaid and lastTomorowTime flag for one time saying per day
            options[sahaTimeProp][i].isSaid = false;
            options[sahaTimeProp][i].lastTomorowTime = null;
            if (typeof options[sahaTimeProp][i].effectiveRange === 'undefined') {
                options[sahaTimeProp][i].effectiveRange = null;
            }
        }
    }

    this.addNewSahaTime = function (sahatimeType, timeobj) {
        // don't forget to init it
    }

    this.removeSahaTime = function (sahatimeType, timeobj) {

    }



    this.timesEquale = function (time1, time2) {
        let time1PropNm = Object.getOwnPropertyNames(time1);
        let time2PropNm = Object.getOwnPropertyNames(time2);

        for (let i = 0; i < time1PropNm.length; i++) {
            if (time1[time1PropNm[i]] !== time2[time2PropNm[i]]) {
                return false;
            }
        }
        return true;
    }

    this.setSahaShourkmTime = function (times) {
        options.sahaShourekTime = times;
        initOneSahaTime('sahaShourekTime');
    }

    this.setSahaFtourkmTime = function (hours, minutes, seconds) {
        options.sahaFtourekTime = times;
        initOneSahaTime('sahaFtourekTime');
    }

    this.setSahaRamdankmTime = function (hours, minutes, seconds) {
        options.sahaRamdankTime = times;
        initOneSahaTime('sahaRamdankTime');
    }

    this.getSahaRamdankTodayTime = function (todayDate, timeIndex) {
        if (typeof todayDate === 'undefined') {
            todayDate = new Date();
        } else {
            todayDate = new Date(todayDate.valueOf());
        }
        
        todayDate.setHours(options.sahaRamdankTime[timeIndex].hours);
        todayDate.setMinutes(options.sahaRamdankTime[timeIndex].minutes);
        todayDate.setSeconds(options.sahaRamdankTime[timeIndex].seconds);
        return todayDate;
    }

    this.getSahaFtourekTodayTime = function (todayDate, timeIndex) {
        if (typeof todayDate === 'undefined') {
            todayDate = new Date();
        } else {
            todayDate = new Date(todayDate.valueOf());
        }
        todayDate.setHours(options.sahaFtourekTime[timeIndex].hours);
        todayDate.setMinutes(options.sahaFtourekTime[timeIndex].minutes);
        todayDate.setSeconds(options.sahaFtourekTime[timeIndex].seconds);
        return todayDate;
    }

    this.getSahaShourekTodayTime = function (todayDate, timeIndex) {
        if (typeof todayDate === 'undefined') {
            todayDate = new Date();
        } else {
            todayDate = new Date(todayDate.valueOf());
        }
        todayDate.setHours(options.sahaShourekTime[timeIndex].hours);
        todayDate.setMinutes(options.sahaShourekTime[timeIndex].minutes);
        todayDate.setSeconds(options.sahaShourekTime[timeIndex].seconds);
        return todayDate;
    }

    this.getRamadanSahaState = function () {
        return ramadanSahaState;
    }

    this.getRamadanSahaAndThankingState = function () {
        return ramadanSahaAndThankingState;
    }

    this.itsRamadan = function (time) {
        if (typeof time === 'undefined') {
            time = new Date();
        } else {
            time = new Date(time.valueOf());
        }
        time = this.zeroDateTime(time);
        if (time - ramadanEndDay <= 0 && time - ramadanStartDay >= 0) {
            return true;
        }
        return false;
    }

    this.itsTwoDaysBeforeAid = function () {
        // to be done later
    }

    this.zeroDateTime = function (date) {
        date = new Date(date.valueOf());
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        return date;
    }

    // ramadan saha
    this.startRamadanSaha = function () {
        this.print('ramadanSahaAgent is turned On', 'start');
        ramadanSahaState = true;
        that.ramadanSaha();
        this.ramadanSahaAgent();
    }

    this.stopRamadanSaha = function () {
        ramadanSahaState = false;
        this.resetSahaIsSaidFlags();
        this.print('ramadanSahaAgent is turned Off', 'stop');
    }

    this.resetSahaIsSaidFlags = function () {
        let sahaTimeProp = ['sahaRamdankTime', 'sahaFtourekTime', 'sahaShourekTime'];
        sahaTimeProp.forEach(function (prop) {
            for(let i = 0; i < options[prop].length; i++){
                options[prop][i].isSaid = false;
            }
        });
    }


    this.ramadanSahaAgent = function () {
        setTimeout(() => {
            if (ramadanSahaState === true) {
                that.ramadanSaha();
                that.ramadanSahaAgent();
            }
        }, options.checkTimeInterval);
    }

    this.ramadanSaha = function () {
        let time = new Date();
        //saha ramdanek
        let sr_time = options.sahaRamdankTime;
        for (let i = 0; i < sr_time.length; i++) {
            let diffTime = time - this.getSahaRamdankTodayTime(time, i);
            if (diffTime >= 0 && !sr_time[i].isSaid) {
                if (sr_time[i].effectiveRange === null) {
                    this.print('Nice Ramadan, Saha Ramdankm, Ramadan Moubarek');
                    sr_time[i].isSaid = true;
                    sr_time[i].lastTomorowTime = this.getTomorowSahaRamdankTime(time, i);
                } else if (diffTime <= sr_time[i].effectiveRange * 1000) {
                    this.print('Nice Ramadan, Saha Ramdankm, Ramadan Moubarek');
                    sr_time[i].isSaid = true;
                    sr_time[i].lastTomorowTime = this.getTomorowSahaRamdankTime(time, i);
                }
            }
        }

        //saha ftourkm
        let sf_time = options.sahaFtourekTime;
        for (let i = 0; i < sf_time.length; i++) {
            let diffTime = time - this.getSahaFtourekTodayTime(time, i);

            if (diffTime >= 0 && !sf_time[i].isSaid) {
                if (sf_time[i].effectiveRange === null) {
                    // console.log('sahaftourk today time: ' + this.getSahaFtourekTodayTime().toString());
                    // console.log('time = ' + time.toString());
                    this.print('Saha ftourkm! ma taklch bzf !!');
                    sf_time[i].isSaid = true;
                    sf_time[i].lastTomorowTime = this.getTomorowSahaFtourkTime(time, i);
                } else if (diffTime <= sf_time[i].effectiveRange * 1000) {
                    this.print('Saha ftourkm! ma taklch bzf !!');
                    sf_time[i].isSaid = true;
                    sf_time[i].lastTomorowTime = this.getTomorowSahaFtourkTime(time, i);
                }
            }
        }

        //saha shourk
        let ss_time = options.sahaShourekTime;
        for (let i = 0; i < ss_time.length; i++) {
            let diffTime = time - this.getSahaShourekTodayTime(time, i);
            if (diffTime >= 0 && !ss_time[i].isSaid) {
                if (ss_time[i].effectiveRange === null) {
                    this.print('Saha Shourkm, and good night')
                    ss_time[i].isSaid = true;
                    ss_time[i].lastTomorowTime = this.getTomorowSahaShourekTime(time, i);
                } else if (diffTime <= ss_time[i].effectiveRange * 1000) {
                    this.print('Saha Shourkm, and good night')
                    ss_time[i].isSaid = true;
                    ss_time[i].lastTomorowTime = this.getTomorowSahaShourekTime(time, i);
                }
            }
        }

        this.ramdanSaha_resetSaidFlag();
    }

    this.ramdanSaha_resetSaidFlag = function (time) {
        if (typeof time === 'undefined') {
            time = new Date();
        }

        let sahaTimeProps = ['sahaRamdankTime', 'sahaFtourekTime', 'sahaShourekTime'];

        sahaTimeProps.forEach(function (prop) {
            for (let i = 0; i < options[prop].length; i++) {
                if (options[prop][i].lastTomorowTime && time - options[prop][i].lastTomorowTime >= 0) {
                    options[prop][i].isSaid = false;
                }
            }
        });

        // //saha ramdank
        // let sr_time = options.sahaRamdankTime;
        // for(let i = 0; i < sr_time.length; i++){
        //     if (typeof sr_time[i].lastTomorowTime !== 'undefined' && time - sr_time[i].lastTomorowTime >= 0) {
        //         sr_time[i].isSaid = false;
        //     }            
        // }

        // //saha ftourk
        // let sf_time = options.sahaRamdankTime;
        // for(let i = 0; i < ss_time.length; i++){
        //     if (typeof ss_time[i].lastTomorowTime !== 'undefined' && time - ss_time[i].lastTomorowTime >= 0) {
        //         ss_time[i].isSaid = false;
        //     }            
        // }

        // //saha shourek
        // let ss_time = options.sahaRamdankTime;     for(let i = 0; i < ss_time.length; i++){
        //     if (typeof ss_time[i].lastTomorowTime !== 'undefined' && time - ss_time[i].lastTomorowTime >= 0) {
        //         ss_time[i].isSaid = false;
        //     }            
        // }
    }

    this.getTomorowDate = function (date) {
        date = new Date(date.valueOf());
        return date.setDate(date.getDate() + 1);
    }

    this.getNextDaysDate = function (currentDate, howMuchDays) {
        currentDate = new Date(currentDate.valueOf());
        return currentDate.setDate(currentDate.getDate() + howMuchDays);
    }

    this.getTomorowSahaRamdankTime = function (time, timeInd) {
        if (typeof time === 'undefined') {
            time = new Date();
        }

        return this.getTomorowDate(this.getSahaRamdankTodayTime(time, timeInd));
    }

    this.getTomorowSahaFtourkTime = function (time, timeInd) {
        if (typeof time === 'undefined') {
            time = new Date();
        }

        return this.getTomorowDate(this.getSahaFtourekTodayTime(time, timeInd));
    }

    this.getTomorowSahaShourekTime = function (time, timeInd) {
        if (typeof time === 'undefined') {
            time = new Date();
        }

        return this.getTomorowDate(this.getSahaShourekTodayTime(time, timeInd));
    }

    // and thanking
    this.startRamadanSahaAndThanking = function (thankExpression) {
        this.print('RamadanSahaAndThankingAgent is turned On', 'start');
        ramadanSahaAndThankingState = true;
        this.ramadanSahaAndThanking(thankExpression);
        this.ramadanSahaAndThankingAgent(thankExpression);
    }

    this.stopRamadanSahaAndThanking = function () {
        ramadanSahaAndThankingState = false;
        this.resetSahaIsSaidFlags();
        this.print('RamadanSahaAndThankingAgent is turned off', 'stop');
    }

    this.ramadanSahaAndThanking = function (thankExpression) {
        this.print(thankExpression);
        this.ramadanSaha();
    }

    this.ramadanSahaAndThankingAgent = function (thankExpression) {
        setTimeout(() => {
            if (ramadanSahaAndThankingState === true) {
                that.ramadanSahaAndThanking(thankExpression);
                that.ramadanSahaAndThankingAgent(thankExpression);
            }
        }, options.checkTimeInterval);
    }


    this.print = function (msg, data) {
        if (options.print.mod.indexOf('callback') !== -1) {
            options.print.callback(msg, data);
        }
        if (options.print.mod.indexOf('consoleLog') !== -1) {
            console.log(msg);
        }
        if (options.print.mod.indexOf('alert') !== -1) {
            alert(msg);
        }
    }

    this.timeParseFromString = function (time) {
        let splited = time.split(':');
        switch (splited.length) {
            case 3:
                return {
                    hours: parseInt(splited[0]),
                    minutes: parseInt(splited[1]),
                    seconds: parseInt(splited[2])
                }
            case 2:
                return {
                    houres: 0,
                    minutes: parseInt(splited[0]),
                    seconds: parseInt(splited[1])
                }
            case 1:
                return {
                    houres: 0,
                    minutes: 0,
                    seconds: parseInt(splited[0])
                }
        }
    }

    this.sahaTimeParse = function (sahaTime) {
        if (typeof sahaTime === 'string') {
            return this.timeParseFromString(sahaTime);
        } else if (isObject(sahaTime)) { // case object
            if (sahaTime.hasOwnProperty('time')) { // case object with time property as string
                let timeObj = this.timeParseFromString(sahaTime.time);
                if (sahaTime.hasOwnProperty('effectiveRange')) {
                    timeObj.effectiveRange = sahaTime.effectiveRange;
                }
                return timeObj;
            } else { // case a correct object
                return sahaTime;
            }
        }
    }

    // pure object like crated with brakets
    function isObject(val) {
        if (val === null) {
            return false;
        }
        return (typeof val === 'object');
    }




    // here go the logic for the time prayer functionality  

    times

    function calculatePrayerTimesAndQueing () {
        for(let i = 0; i < .length; i++){
            
        }
    }


    let queue = [];

    /**
     queue = [{
        time: ,
        usersIds: [{}, {}, {}]   
     }] 
     */
    function nextPrayerAnouncement(queueIndex, userMessagesHandler) {
        let currentDate;
        if(queueIndex === 0) {
            currentDate = new Date();
        } else  {
            currentDate = queue;
        }
    }








    this.init();
}



/**
 * to do:
 * prayer reminder
 * 
 * timeout time smart and precise
 * 
 * reminders
 * 
 * some good wise things to say
 * 
 * 
 * more functions and tweaking, and message and options  (redesign what you did and get it better) (it's not good)
 * 
 * when you add prayer reminder; use prayer functionality in ramdanSaha Agent. time relative to prayer time!   (make those things optional)
 
 also handle cases where the necessary info aren't precised like (Ramadan days) ..etc
 */