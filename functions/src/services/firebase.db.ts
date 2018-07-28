import * as admin from 'firebase-admin';

import { IDb } from "./db.interface";

export class FirebaseDb implements IDb {


    constructor (
        private rootName: string
    ) {
        if (!process.env.FIREBASE_CONFIG) {
            const credential = admin.credential.cert(
                require(__dirname + '/../../service-account.json')
            )
            admin.initializeApp({
                credential,
                databaseURL: "https://freecodecamp-microservice.firebaseio.com"
            })
        }
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
            .push(value)
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