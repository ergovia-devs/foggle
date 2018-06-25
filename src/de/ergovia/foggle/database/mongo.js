/*
 * mongo.js 25.06.18
 *
 * (c) 2018 ergovia GmbH
 */
import mongodb from 'mongodb'

const MongoClient = mongodb.MongoClient,
    dbName = 'foggle',
    collection = 'features';


function establishConnection() {

    return new Promise((resolve, reject) => {

        MongoClient.connect('mongodb://localhost:27017').then(client => {

            resolve(client.db(dbName).collection(collection));

        }).catch(reject);

    })

}

export function getFeature(id) {

    return new Promise((resolve, reject) => {

        establishConnection().then(collection => {

            collection.find({ id }).toArray().then(resolve).catch(reject)

        }).catch(reject);

    });

}

export function getFeatures(module) {

    return new Promise((resolve, reject) => {

        establishConnection().then(collection => {

            collection.find({ module }).toArray().then(resolve).catch(reject)

        }).catch(reject);

    });

}

export function createFeature(doc) {

    return new Promise((resolve, reject) => {

        establishConnection().then(collection => {

            collection.insertOne(doc).then(resolve).catch(reject)

        }).catch(reject);

    });

}

export function releaseFeature(id, manually_activated, release_date) {

    return new Promise((resolve, reject) => {

        establishConnection().then(collection => {

            collection.updateOne({ id }, { $set: { manually_activated, release_date }}).then(resolve).catch(reject)

        }).catch(reject);

    })

}




