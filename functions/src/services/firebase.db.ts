import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { IDb } from "./db.interface";

export class FirebaseDb implements IDb {

    constructor (
        private rootName: string
    ) {
        let firebaseConfig = functions.config().firebase
        if (!process.env.FIREBASE_CONFIG) {
            const credential = admin.credential.cert(
                require(__dirname + '/../../service-account.json')
            )

            firebaseConfig = {
                credential,
                databaseURL: "https://freecodecamp-microservice.firebaseio.com"
            }
        }
        admin.initializeApp(firebaseConfig)
    }

    addValue(value: object) {
        return admin
            .database()
            .ref(`${this.rootName}`)
            .push(value)
    }  

    setValue(key: string, value: object) {
        return admin
            .database()
            .ref(`${this.rootName}/${key}`)
            .set(value)
    }   
    
    readValue(key: string) {
        throw admin
            .database()
            .ref(`${this.rootName}/${key}`)
            .once('value')
            .then((snapshot) => {
                return snapshot.val()
            })
    }
}