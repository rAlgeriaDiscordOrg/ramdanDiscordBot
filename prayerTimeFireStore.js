let PrayerTimeFireStore = function (fireStoreDB) {
    let self = this;

    let db;

    function init() {
        db = fireStoreDB;
    }


    this.registerUserToDB = function (msg, country, city) {
        return new Promise(function (resolve, reject) {
            let userDocRef = db.collection('users').doc(msg.author.id);
            let setUserPromise = userDocRef.set({
                id: msg.author.id,
                username: msg.author.username,
                city: city,
                country: country
            });

            let cityPromise = self.createCityAndAddUser(
                country,
                city, 
                {
                    id: msg.author.id,
                    username: msg.author.username
                }
            );

            Promise.all([setUserPromise, cityPromise]).then(function (v) {
                resolve({
                    user: v[0],
                    city: v[1]
                });
            }).catch(function (err) {
                reject(err);
            });
        });
    }

    /**
     * 
     * @param {*} country 
     * @param {*} city 
     * @param {it should be an object (that what will be saved to the database)} userInfo 
     */
    this.createCityAndAddUser = function (country, city, userInfo) {
        return new Promise(function (resolve, reject) {
            let cityDocRef = db.collection('cities').doc(`${country}_${city}`);
            let prms1 = cityDocRef.set({
                country,
                city
            }); //.set({}).then(function (docRef) {
            let cityUserDocRef = cityDocRef.collection('users').doc(userInfo.id);

            let prms2 = cityUserDocRef.set(userInfo);

            Promise.all([prms1, prms2]).then(function (v) {
                resolve({
                    cityUserDocRef,
                    cityDocRef
                });
            }).catch(function (err) {
                reject(err);
            });
        });
    }

    this.getAllCities = function () {
        return db.collection('cities').get();
    }

    this.getACityUsers = function (country, city) {
        return db.collection('cities').doc(`${country}_${city}`).collection('users').get();
    }

    this.hasCityUsers = function () {

    }
    
    init();
}

module.exports = PrayerTimeFireStore;