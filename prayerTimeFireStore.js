let PrayerTimeFireStore = function (fireStoreDB) ***REMOVED***
    let db;

    function init () ***REMOVED***
        db = fireStoreDB;
  ***REMOVED***


    this.registerUserToDB = function (msg, country, city) ***REMOVED***
        return db.collection('users').doc(msg.author.id).set(***REMOVED***
            id: msg.author.id,
            username: msg.author.username,
            city: city,
            country: country
      ***REMOVED***);
  ***REMOVED***   
    
    init();
}

module.exports = PrayerTimeFireStore;