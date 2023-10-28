import * as SQLite from 'expo-sqlite';
import { Place } from '../models/place';

// id places.db doesn't exist , SQLite will create it 
const database = SQLite.openDatabase('places.db');

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            // CREATE TABLE IF NOT EXIST places => this a query that create table if it not exist
            // INTEGER PRIMARY KEY NOT NULL => create incremental id
            tx.executeSql(`CREATE TABLE IF NOT EXISTS places (
                id INTEGER PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
                imageUri TEXT NOT NULL,
                address TEXT NOT NULL,
                lat REAL NOT NULL,
                lng REAL NOT NULL
            )`,
                [], // initial value

                () => { // callback when succeed
                    resolve()
                },

                (_, error) => { // callback when failed also replace transaction param with _ as we don't need to use it
                    reject(error)
                },
            );
        });
    });

    return promise;
}

export const insertPlace = (place) => {

    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(`INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?,?,?,?,?)`,
                [place.title, place.imageUri, place.address, place.location.lat, place.location.lng],

                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }

            )
        })
    });

    return promise;
}

export const fetchPlaces = () => {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql('SELECT * FROM places', [],
                (_, result) => {
                    console.log('places from db ',result.rows._array)
                    const places = [];
                    for (const db of result.rows._array) {
                        places.push(new Place(
                            db.title,
                            db.imageUri,
                            {
                                address: db.address,
                                lat: db.lat,
                                lng: db.lng
                            },
                            db.id
                        ));
                    }
                    resolve(places)
                },
                (_, err) => {
                    console.log('err = ',err)
                    reject(err)
                },
            );
        })
    })
}

export const fetchPlacesDetails = (id) => {

    const promise = new Promise((resolve, reject) => {

        database.transaction((tx) => {
            tx.executeSql('SELECT * FROM places WHERE id = ?', [id],
            (_,result) => {
                console.log('data from db ', result)
                resolve(result.rows._array[0]); // always return array of one object that contains the id
            },
            (_,err) => {
                reject(err)
            }
            )
        })
    })

    return promise
}