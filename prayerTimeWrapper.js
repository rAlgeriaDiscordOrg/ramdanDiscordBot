let request = require('request');

let PrayerTime = function (config) {
    let defaultConfiguration;

    function init() {
        defaultConfig = {
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
        }

        config = Object.assign({}, defaultConfig, config);
    }

    this.setOptions = function (configObj) {
        //configObj = Object.assign({}, config, configObj);  
        //config = configObj;

        config = Object.assign({}, config, configObj);
    }

    //////
    this.getTimingByCity = function () {
        return new Promise(function (resolve, reject) {
            let endPoint = "http://api.aladhan.com/v1/timingsByCity/:date_or_timestamp";
            let params = {};

            checkSetGetParams(['date_or_timestamp', 'city', 'country', 'state', 'method', 'tune', 'school', 'midnightMode', 'timezonestring', 'latitudeAdjustmentMethod'], params);

            request(getUri(endPoint, params), {
                json: true
            }, (err, res, body) => {
                if (err) {
                    reject(err);
                }
                
                resolve({
                    res: res,
                    body: body
                });
            });
        });
    }

    ////////

     //////
     this.getTimingByLongLat = function () {
        return new Promise(function (resolve, reject) {
            let endPoint = "http://api.aladhan.com/v1/timings/:date_or_timestamp";
            let params = {};

            checkSetGetParams(['date_or_timestamp', 'longitude', 'latitude', 'method', 'tune', 'school', 'midnightMode', 'timezonestring', 'latitudeAdjustmentMethod'], params);

            request(getUri(endPoint, params), {
                json: true
            }, (err, res, body) => {
                if (err) {
                    reject(err);
                }
                
                resolve({
                    res: res,
                    body: body
                });
            });
        });
    }

    ////////


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


    function checkSetGetParams(paramsNames, paramsRef) {
        if (typeof paramsNames === 'string') {
            checkSetGetParams_one(paramsNames, paramsRef);
        } else { // it's an array
            for (let i = 0; i < paramsNames.length; i++) {
                checkSetGetParams_one(paramsNames[i], paramsRef);
            }
        }
    }

    function checkSetGetParams_one(paramName, paramsRef) {
        if (config[paramName]) {
            paramsRef[paramName] = config[paramName];
        }
    }


    init();
}

module.exports = PrayerTime;