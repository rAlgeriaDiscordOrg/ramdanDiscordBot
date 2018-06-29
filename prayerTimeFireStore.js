let PrayerTimeFireStore = function (fireStoreDB) {
    let self = this;

    let db;

    function init() {
        db = fireStoreDB;
    }


    this.registerUserToDB = function (msg, country, city) {
        return new Promise(function (resolve, reject) {
            let setUserPromise;
            let userDocRef = db.collection('users').doc(msg.author.id);
            userDocRef.get().then((doc) => {
                if (doc.exists) { // we verify first if the user is already registred, and if so, we remove him from the old city, unless he doesn't change the city
                    let d = doc.data();
                    console.log('d= ==============');
                    console.dir(d);
                    if (country !== d.country ||  city !== d.city) {
                        let cityDocRef = db.collection('cities').doc(`${d.country}_${d.city}`);
                        console.log('city doc ref !!! not same place !!!');
                        let cityUsersColRef = cityDocRef.collection('users');
                        cityUsersColRef.get().then((snapshot) => {
                            console.log(" here you r snapsho we are going to delete the user if there");
                            console.dir(snapshot);
                            console.log("snapshot size = " + snapshot.size);
                            snapshot.docs.every((doc) => {
                                console.log("within every");
                                console.dir(doc);
                                if (doc.id === msg.author.id) {
                                    console.log('deleting');
                                    doc.ref.delete();
                                    console.log("old snapshot size = " + snapshot.size);
                                    cityDocRef.collection('users').get().then((querySnapshot) => {
                                        if(!querySnapshot.exists) {
                                            cityDocRef.delete();
                                            console.log("city have no users , it's deleted!");
                                        }
                                    }).catch((err) => {
                                        reject(err);
                                    });
                                    return false;
                                }
                            });
                        });
                    }
                }
                setUserPromise = userDocRef.set({
                    id: msg.author.id,
                    username: msg.author.username,
                    city: city,
                    country: country
                });

                let cityPromise = self.createCityAndAddUser(
                    country,
                    city, {
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
            }).catch((err) => {
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
            let prms1;
            let cityExists = false;
            cityDocRef.get()
                .then(function (snapshot) {
                    if (snapshot.exists) {
                        // doc already exists
                        cityExists = true;
                    } else {
                        // doc doesn't exists
                        // we create it 
                        prms1 = cityDocRef.set({
                            country,
                            city
                        }); //.set({}).then(function (docRef) {
                    }
                });


            let cityUserDocRef = cityDocRef.collection('users').doc(userInfo.id);

            let prms2 = cityUserDocRef.set(userInfo);

            Promise.all([prms1, prms2]).then(function (v) {
                resolve({
                    cityUserDocRef,
                    cityDocRef,
                    cityExists
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

    this.doesCityExist = function (country, city) {
        return new Promise(function (resolve, reject) {
            db.collection('cities').doc(`${country}_${city}`).get()
            .then((snapshot) => {
                if(snapshot.exists) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    init();
}

module.exports = PrayerTimeFireStore;