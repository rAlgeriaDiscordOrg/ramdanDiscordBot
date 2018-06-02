let request = require('request');

let PrayerTime = function (config) ***REMOVED***
    let defaultConfiguration;

    function init() ***REMOVED***
        defaultConfig = ***REMOVED***
            date_or_timestamp: null,
            city: null,
            country: null,
            state: null,
            address: null,
            latitude: null,
            longitude: null,
            method: null,
            tune: null,
            school: null,
            midnightMode: null,
            timezonestring: null,
            latitudeAdjustmentMethod: null
      ***REMOVED***

        config = Object.assign(***REMOVED***}, defaultConfig, config);
  ***REMOVED***

    this.setOption = function (configObj) ***REMOVED***
        //configObj = Object.assign(***REMOVED***}, config, configObj);  
        //config = configObj;

        config = Object.assign(***REMOVED***}, config, configObj);
  ***REMOVED***

    //////
    this.getTimingByCity = function () ***REMOVED***
        return new Promise(function (resolve, reject) ***REMOVED***
            let endPoint = "http://api.aladhan.com/v1/timingsByCity/:date_or_timestamp";
            let params = ***REMOVED***};

            checkSetGetParams(['date_or_timestamp', 'city', 'country', 'state', 'method', 'tune', 'school', 'midnightMode', 'timezonestring', 'latitudeAdjustmentMethod'], params);

            request(getUri(endPoint, params), ***REMOVED***
                json: true
          ***REMOVED***, (err, res, body) => ***REMOVED***
                if (err) ***REMOVED***
                    reject(err);
              ***REMOVED***
                
                resolve(***REMOVED***
                    res: res,
                    body: body
              ***REMOVED***);
          ***REMOVED***);
      ***REMOVED***);
  ***REMOVED***

    ////////

     //////
     this.getTimingByLongLat = function () ***REMOVED***
        return new Promise(function (resolve, reject) ***REMOVED***
            let endPoint = "http://api.aladhan.com/v1/timings/:date_or_timestamp";
            let params = ***REMOVED***};

            checkSetGetParams(['date_or_timestamp', 'longitude', 'latitude', 'method', 'tune', 'school', 'midnightMode', 'timezonestring', 'latitudeAdjustmentMethod'], params);

            request(getUri(endPoint, params), ***REMOVED***
                json: true
          ***REMOVED***, (err, res, body) => ***REMOVED***
                if (err) ***REMOVED***
                    reject(err);
              ***REMOVED***
                
                resolve(***REMOVED***
                    res: res,
                    body: body
              ***REMOVED***);
          ***REMOVED***);
      ***REMOVED***);
  ***REMOVED***

    ////////



    function uriFormatParams(params) ***REMOVED***
        return "?" + Object
            .keys(params)
            .map(function (key) ***REMOVED***
                return key + "=" + encodeURIComponent(params[key])
          ***REMOVED***)
            .join("&")
  ***REMOVED***

    function getUri(endPoint, params) ***REMOVED***
        return endPoint + uriFormatParams(params);
  ***REMOVED***


    function checkSetGetParams(paramsNames, paramsRef) ***REMOVED***
        if (typeof paramsNames === 'string') ***REMOVED***
            checkSetGetParams_one(paramsNames, paramsRef);
      ***REMOVED*** else ***REMOVED*** // it's an array
            for (let i = 0; i < paramsNames.length; i++) ***REMOVED***
                checkSetGetParams_one(paramsNames[i], paramsRef);
          ***REMOVED***
      ***REMOVED***
  ***REMOVED***

    function checkSetGetParams_one(paramName, paramsRef) ***REMOVED***
        if (config[paramName]) ***REMOVED***
            paramsRef[paramName] = config[paramName];
      ***REMOVED***
  ***REMOVED***


    init();
}

module.exports = PrayerTime;