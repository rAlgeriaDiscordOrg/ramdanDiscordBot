let Ramadan = function (options) ***REMOVED***
    let that = this;

    let ramadanStartDay;
    let ramadanEndDay;
    let ramadanLaylatCheckDay;

    // process state flags
    let ramadanSahaState;
    let ramadanSahaAndThankingState;


    this.init = function () ***REMOVED***
        let defaultOptions = ***REMOVED***
            sahaRamdankTime: [***REMOVED***
                hours: 8,
                minutes: 0,
                seconds: 0,
                effectiveRange: null
          ***REMOVED***],
            sahaFtourekTime: [***REMOVED***
                hours: 18,
                minutes: 0,
                seconds: 0,
                effectiveRange: null

          ***REMOVED***],
            sahaShourekTime: [***REMOVED***
                    hours: 23,
                    minutes: 0,
                    seconds: 0,
                    effectiveRange: null
              ***REMOVED***,
                ***REMOVED***
                    hours: 3,
                    minutes: 0,
                    seconds: 0,
                    effectiveRange: null
              ***REMOVED***
            ],
            checkTimeInterval: 1800000, // half an hour
            ramadanStartDay: null,
            ramadanEndDay: null,
            ramadanLaylatCheckDay: null,
            print: ***REMOVED***
                /**
                 * callback, consoleLog, callback&consoleLog, alert ...
                 */
                mod: 'callback',
                callback: null
          ***REMOVED***
      ***REMOVED***

        options = Object.assign(***REMOVED***}, defaultOptions, options);

        // options.sahaRamdankTime = Object.assign(***REMOVED***}, defaultOptions.sahaRamdankTime, options.sahaRamdankTime);

        // options.sahaFtourekTime = Object.assign(***REMOVED***}, defaultOptions.sahaFtourekTime, options.sahaFtourekTime);

        // options.sahaShourekTime = Object.assign(***REMOVED***}, defaultOptions.sahaShourekTime, options.sahaShourekTime);

        options.print = Object.assign(***REMOVED***}, defaultOptions.print, options.print);

        // ramadan days
        ramadanStartDay = options.ramadanStartDay ? this.zeroDateTime(options.ramadanStartDay) : null;
        ramadanEndDay = options.ramadanEndDay ? this.zeroDateTime(options.ramadanEndDay) : null;
        ramadanLaylatCheckDay = options.ramadanLaylatCheckDay ? this.zeroDateTime(options.ramadanLaylatCheckDay) : null;

        // process state flags
        ramadanSahaState = false;
        ramadanSahaAndThankingState = false;

        this.initSahaTime();
  ***REMOVED***


    this.setRamadanStartDay = function (date) ***REMOVED***
        ramadanStartDay = this.zeroDateTime(date);
        options.ramadanStartDay = this.zeroDateTime(date);
  ***REMOVED***
    this.setRamadanEndDay = function (date) ***REMOVED***
        ramadanEndDay = this.zeroDateTime(date);
        options.ramadanEndDay = this.zeroDateTime(date);
  ***REMOVED***
    this.setRamadanLaylatCheckDay = function (date) ***REMOVED***
        ramadanLaylatCheckDay = this.zeroDateTime(date);
        options.ramadanLaylatCheckDay = this.zeroDateTime(date);
  ***REMOVED***
    // what this function does is initiating and appending the vars that need to be added isSaidVar
    this.initSahaTime = function (sahaTimeProp) ***REMOVED***
        if (typeof sahaTimeProp === 'undefined') ***REMOVED***
            let sahaTimeProps = ['sahaRamdankTime', 'sahaFtourekTime', 'sahaShourekTime'];

            sahaTimeProps.forEach(function (prop) ***REMOVED***
                initOneSahaTime(prop);
          ***REMOVED***);
      ***REMOVED*** else ***REMOVED***
            initOneSahaTime(sahaTimeProp);
      ***REMOVED***
  ***REMOVED***

    function initOneSahaTime(sahaTimeProp) ***REMOVED***
        for (let i = 0; i < options[sahaTimeProp].length; i++) ***REMOVED***
            // first we  parse
            options[sahaTimeProp][i] = that.sahaTimeParse(options[sahaTimeProp][i]);

            // we get our time object
            // isSaid and lastTomorowTime flag for one time saying per day
            options[sahaTimeProp][i].isSaid = false;
            options[sahaTimeProp][i].lastTomorowTime = null;
            if (typeof options[sahaTimeProp][i].effectiveRange === 'undefined') ***REMOVED***
                options[sahaTimeProp][i].effectiveRange = null;
          ***REMOVED***
      ***REMOVED***
  ***REMOVED***

    this.addNewSahaTime = function (sahatimeType, timeobj) ***REMOVED***
        // don't forget to init it
  ***REMOVED***

    this.removeSahaTime = function (sahatimeType, timeobj) ***REMOVED***

  ***REMOVED***



    this.timesEquale = function (time1, time2) ***REMOVED***
        let time1PropNm = Object.getOwnPropertyNames(time1);
        let time2PropNm = Object.getOwnPropertyNames(time2);

        for (let i = 0; i < time1PropNm.length; i++) ***REMOVED***
            if (time1[time1PropNm[i]] !== time2[time2PropNm[i]]) ***REMOVED***
                return false;
          ***REMOVED***
      ***REMOVED***
        return true;
  ***REMOVED***

    this.setSahaShourkmTime = function (times) ***REMOVED***
        options.sahaShourekTime = times;
        initOneSahaTime('sahaShourekTime');
  ***REMOVED***

    this.setSahaFtourkmTime = function (hours, minutes, seconds) ***REMOVED***
        options.sahaFtourekTime = times;
        initOneSahaTime('sahaFtourekTime');
  ***REMOVED***

    this.setSahaRamdankmTime = function (hours, minutes, seconds) ***REMOVED***
        options.sahaRamdankTime = times;
        initOneSahaTime('sahaRamdankTime');
  ***REMOVED***

    this.getSahaRamdankTodayTime = function (todayDate, timeIndex) ***REMOVED***
        if (typeof todayDate === 'undefined') ***REMOVED***
            todayDate = new Date();
      ***REMOVED*** else ***REMOVED***
            todayDate = new Date(todayDate.valueOf());
      ***REMOVED***
        
        todayDate.setHours(options.sahaRamdankTime[timeIndex].hours);
        todayDate.setMinutes(options.sahaRamdankTime[timeIndex].minutes);
        todayDate.setSeconds(options.sahaRamdankTime[timeIndex].seconds);
        return todayDate;
  ***REMOVED***

    this.getSahaFtourekTodayTime = function (todayDate, timeIndex) ***REMOVED***
        if (typeof todayDate === 'undefined') ***REMOVED***
            todayDate = new Date();
      ***REMOVED*** else ***REMOVED***
            todayDate = new Date(todayDate.valueOf());
      ***REMOVED***
        todayDate.setHours(options.sahaFtourekTime[timeIndex].hours);
        todayDate.setMinutes(options.sahaFtourekTime[timeIndex].minutes);
        todayDate.setSeconds(options.sahaFtourekTime[timeIndex].seconds);
        return todayDate;
  ***REMOVED***

    this.getSahaShourekTodayTime = function (todayDate, timeIndex) ***REMOVED***
        if (typeof todayDate === 'undefined') ***REMOVED***
            todayDate = new Date();
      ***REMOVED*** else ***REMOVED***
            todayDate = new Date(todayDate.valueOf());
      ***REMOVED***
        todayDate.setHours(options.sahaShourekTime[timeIndex].hours);
        todayDate.setMinutes(options.sahaShourekTime[timeIndex].minutes);
        todayDate.setSeconds(options.sahaShourekTime[timeIndex].seconds);
        return todayDate;
  ***REMOVED***

    this.getRamadanSahaState = function () ***REMOVED***
        return ramadanSahaState;
  ***REMOVED***

    this.getRamadanSahaAndThankingState = function () ***REMOVED***
        return ramadanSahaAndThankingState;
  ***REMOVED***

    this.itsRamadan = function (time) ***REMOVED***
        if (typeof time === 'undefined') ***REMOVED***
            time = new Date();
      ***REMOVED*** else ***REMOVED***
            time = new Date(time.valueOf());
      ***REMOVED***
        time = this.zeroDateTime(time);
        if (time - ramadanEndDay <= 0 && time - ramadanStartDay >= 0) ***REMOVED***
            return true;
      ***REMOVED***
        return false;
  ***REMOVED***

    this.itsTwoDaysBeforeAid = function () ***REMOVED***
        // to be done later
  ***REMOVED***

    this.zeroDateTime = function (date) ***REMOVED***
        date = new Date(date.valueOf());
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        return date;
  ***REMOVED***

    // ramadan saha
    this.startRamadanSaha = function () ***REMOVED***
        this.print('ramadanSahaAgent is turned On', 'start');
        ramadanSahaState = true;
        that.ramadanSaha();
        this.ramadanSahaAgent();
  ***REMOVED***

    this.stopRamadanSaha = function () ***REMOVED***
        ramadanSahaState = false;
        this.resetSahaIsSaidFlags();
        this.print('ramadanSahaAgent is turned Off', 'stop');
  ***REMOVED***

    this.resetSahaIsSaidFlags = function () ***REMOVED***
        let sahaTimeProp = ['sahaRamdankTime', 'sahaFtourekTime', 'sahaShourekTime'];
        sahaTimeProp.forEach(function (prop) ***REMOVED***
            for(let i = 0; i < options[prop].length; i++)***REMOVED***
                options[prop][i].isSaid = false;
          ***REMOVED***
      ***REMOVED***);
  ***REMOVED***


    this.ramadanSahaAgent = function () ***REMOVED***
        setTimeout(() => ***REMOVED***
            if (ramadanSahaState === true) ***REMOVED***
                that.ramadanSaha();
                that.ramadanSahaAgent();
          ***REMOVED***
      ***REMOVED***, options.checkTimeInterval);
  ***REMOVED***

    this.ramadanSaha = function () ***REMOVED***
        let time = new Date();
        //saha ramdanek
        let sr_time = options.sahaRamdankTime;
        for (let i = 0; i < sr_time.length; i++) ***REMOVED***
            let diffTime = time - this.getSahaRamdankTodayTime(time, i);
            if (diffTime >= 0 && !sr_time[i].isSaid) ***REMOVED***
                if (sr_time[i].effectiveRange === null) ***REMOVED***
                    this.print('Nice Ramadan, Saha Ramdankm, Ramadan Moubarek');
                    sr_time[i].isSaid = true;
                    sr_time[i].lastTomorowTime = this.getTomorowSahaRamdankTime(time, i);
              ***REMOVED*** else if (diffTime <= sr_time[i].effectiveRange * 1000) ***REMOVED***
                    this.print('Nice Ramadan, Saha Ramdankm, Ramadan Moubarek');
                    sr_time[i].isSaid = true;
                    sr_time[i].lastTomorowTime = this.getTomorowSahaRamdankTime(time, i);
              ***REMOVED***
          ***REMOVED***
      ***REMOVED***

        //saha ftourkm
        let sf_time = options.sahaFtourekTime;
        for (let i = 0; i < sf_time.length; i++) ***REMOVED***
            let diffTime = time - this.getSahaFtourekTodayTime(time, i);

            if (diffTime >= 0 && !sf_time[i].isSaid) ***REMOVED***
                if (sf_time[i].effectiveRange === null) ***REMOVED***
                    // console.log('sahaftourk today time: ' + this.getSahaFtourekTodayTime().toString());
                    // console.log('time = ' + time.toString());
                    this.print('Saha ftourkm! ma taklch bzf !!');
                    sf_time[i].isSaid = true;
                    sf_time[i].lastTomorowTime = this.getTomorowSahaFtourkTime(time, i);
              ***REMOVED*** else if (diffTime <= sf_time[i].effectiveRange * 1000) ***REMOVED***
                    this.print('Saha ftourkm! ma taklch bzf !!');
                    sf_time[i].isSaid = true;
                    sf_time[i].lastTomorowTime = this.getTomorowSahaFtourkTime(time, i);
              ***REMOVED***
          ***REMOVED***
      ***REMOVED***

        //saha shourk
        let ss_time = options.sahaShourekTime;
        for (let i = 0; i < ss_time.length; i++) ***REMOVED***
            let diffTime = time - this.getSahaShourekTodayTime(time, i);
            if (diffTime >= 0 && !ss_time[i].isSaid) ***REMOVED***
                if (ss_time[i].effectiveRange === null) ***REMOVED***
                    this.print('Saha Shourkm, and good night')
                    ss_time[i].isSaid = true;
                    ss_time[i].lastTomorowTime = this.getTomorowSahaShourekTime(time, i);
              ***REMOVED*** else if (diffTime <= ss_time[i].effectiveRange * 1000) ***REMOVED***
                    this.print('Saha Shourkm, and good night')
                    ss_time[i].isSaid = true;
                    ss_time[i].lastTomorowTime = this.getTomorowSahaShourekTime(time, i);
              ***REMOVED***
          ***REMOVED***
      ***REMOVED***

        this.ramdanSaha_resetSaidFlag();
  ***REMOVED***

    this.ramdanSaha_resetSaidFlag = function (time) ***REMOVED***
        if (typeof time === 'undefined') ***REMOVED***
            time = new Date();
      ***REMOVED***

        let sahaTimeProps = ['sahaRamdankTime', 'sahaFtourekTime', 'sahaShourekTime'];

        sahaTimeProps.forEach(function (prop) ***REMOVED***
            for (let i = 0; i < options[prop].length; i++) ***REMOVED***
                if (options[prop][i].lastTomorowTime && time - options[prop][i].lastTomorowTime >= 0) ***REMOVED***
                    options[prop][i].isSaid = false;
              ***REMOVED***
          ***REMOVED***
      ***REMOVED***);

        // //saha ramdank
        // let sr_time = options.sahaRamdankTime;
        // for(let i = 0; i < sr_time.length; i++)***REMOVED***
        //     if (typeof sr_time[i].lastTomorowTime !== 'undefined' && time - sr_time[i].lastTomorowTime >= 0) ***REMOVED***
        //         sr_time[i].isSaid = false;
        //   ***REMOVED***            
        // }

        // //saha ftourk
        // let sf_time = options.sahaRamdankTime;
        // for(let i = 0; i < ss_time.length; i++)***REMOVED***
        //     if (typeof ss_time[i].lastTomorowTime !== 'undefined' && time - ss_time[i].lastTomorowTime >= 0) ***REMOVED***
        //         ss_time[i].isSaid = false;
        //   ***REMOVED***            
        // }

        // //saha shourek
        // let ss_time = options.sahaRamdankTime;     for(let i = 0; i < ss_time.length; i++)***REMOVED***
        //     if (typeof ss_time[i].lastTomorowTime !== 'undefined' && time - ss_time[i].lastTomorowTime >= 0) ***REMOVED***
        //         ss_time[i].isSaid = false;
        //   ***REMOVED***            
        // }
  ***REMOVED***

    this.getTomorowDate = function (date) ***REMOVED***
        date = new Date(date.valueOf());
        return date.setDate(date.getDate() + 1);
  ***REMOVED***

    this.getNextDaysDate = function (currentDate, howMuchDays) ***REMOVED***
        currentDate = new Date(currentDate.valueOf());
        return currentDate.setDate(currentDate.getDate() + howMuchDays);
  ***REMOVED***

    this.getTomorowSahaRamdankTime = function (time, timeInd) ***REMOVED***
        if (typeof time === 'undefined') ***REMOVED***
            time = new Date();
      ***REMOVED***

        return this.getTomorowDate(this.getSahaRamdankTodayTime(time, timeInd));
  ***REMOVED***

    this.getTomorowSahaFtourkTime = function (time, timeInd) ***REMOVED***
        if (typeof time === 'undefined') ***REMOVED***
            time = new Date();
      ***REMOVED***

        return this.getTomorowDate(this.getSahaFtourekTodayTime(time, timeInd));
  ***REMOVED***

    this.getTomorowSahaShourekTime = function (time, timeInd) ***REMOVED***
        if (typeof time === 'undefined') ***REMOVED***
            time = new Date();
      ***REMOVED***

        return this.getTomorowDate(this.getSahaShourekTodayTime(time, timeInd));
  ***REMOVED***

    // and thanking
    this.startRamadanSahaAndThanking = function (thankExpression) ***REMOVED***
        this.print('RamadanSahaAndThankingAgent is turned On', 'start');
        ramadanSahaAndThankingState = true;
        this.ramadanSahaAndThanking(thankExpression);
        this.ramadanSahaAndThankingAgent(thankExpression);
  ***REMOVED***

    this.stopRamadanSahaAndThanking = function () ***REMOVED***
        ramadanSahaAndThankingState = false;
        this.resetSahaIsSaidFlags();
        this.print('RamadanSahaAndThankingAgent is turned off', 'stop');
  ***REMOVED***

    this.ramadanSahaAndThanking = function (thankExpression) ***REMOVED***
        this.print(thankExpression);
        this.ramadanSaha();
  ***REMOVED***

    this.ramadanSahaAndThankingAgent = function (thankExpression) ***REMOVED***
        setTimeout(() => ***REMOVED***
            if (ramadanSahaAndThankingState === true) ***REMOVED***
                that.ramadanSahaAndThanking(thankExpression);
                that.ramadanSahaAndThankingAgent(thankExpression);
          ***REMOVED***
      ***REMOVED***, options.checkTimeInterval);
  ***REMOVED***


    this.print = function (msg, data) ***REMOVED***
        if (options.print.mod.indexOf('callback') !== -1) ***REMOVED***
            options.print.callback(msg, data);
      ***REMOVED***
        if (options.print.mod.indexOf('consoleLog') !== -1) ***REMOVED***
            console.log(msg);
      ***REMOVED***
        if (options.print.mod.indexOf('alert') !== -1) ***REMOVED***
            alert(msg);
      ***REMOVED***
  ***REMOVED***

    this.timeParseFromString = function (time) ***REMOVED***
        let splited = time.split(':');
        switch (splited.length) ***REMOVED***
            case 3:
                return ***REMOVED***
                    hours: parseInt(splited[0]),
                    minutes: parseInt(splited[1]),
                    seconds: parseInt(splited[2])
              ***REMOVED***
            case 2:
                return ***REMOVED***
                    houres: 0,
                    minutes: parseInt(splited[0]),
                    seconds: parseInt(splited[1])
              ***REMOVED***
            case 1:
                return ***REMOVED***
                    houres: 0,
                    minutes: 0,
                    seconds: parseInt(splited[0])
              ***REMOVED***
      ***REMOVED***
  ***REMOVED***

    this.sahaTimeParse = function (sahaTime) ***REMOVED***
        if (typeof sahaTime === 'string') ***REMOVED***
            return this.timeParseFromString(sahaTime);
      ***REMOVED*** else if (isObject(sahaTime)) ***REMOVED*** // case object
            if (sahaTime.hasOwnProperty('time')) ***REMOVED*** // case object with time property as string
                let timeObj = this.timeParseFromString(sahaTime.time);
                if (sahaTime.hasOwnProperty('effectiveRange')) ***REMOVED***
                    timeObj.effectiveRange = sahaTime.effectiveRange;
              ***REMOVED***
                return timeObj;
          ***REMOVED*** else ***REMOVED*** // case a correct object
                return sahaTime;
          ***REMOVED***
      ***REMOVED***
  ***REMOVED***

    // pure object like crated with brakets
    function isObject(val) ***REMOVED***
        if (val === null) ***REMOVED***
            return false;
      ***REMOVED***
        return (typeof val === 'object');
  ***REMOVED***




    // here go the logic for the time prayer functionality

    function nextPrayerAnouncement()



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