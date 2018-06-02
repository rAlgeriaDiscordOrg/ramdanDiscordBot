const PrayerTime = require('./prayerTimeWrapper');
const date = require('date-and-time');

let pt = new PrayerTime(***REMOVED***
    date_or_timestamp: date.format(new Date(), 'DD-MM-YYYY'),
    city: 'Algiers',
    country: 'Algeria',
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
});



pt.getTimingByCity().then(function(response) ***REMOVED***
    console.log('body = ' + JSON.stringify(response.body));
}).catch(function (err) ***REMOVED***
    console.log('err = ' + err);
});

