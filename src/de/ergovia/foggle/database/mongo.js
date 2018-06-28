import mongodb from 'mongodb'

const MongoClient = mongodb.MongoClient,
    dbName = 'foggle',
    collectionName = 'features';



function establishConnection() {

    return new Promise((resolve, reject) => {

        MongoClient.connect('mongodb://localhost:27017').then(client => {
            const collection = client.db(dbName).collection(collectionName);
            resolve({ collection, client });

        }).catch(reject);

    })

}

export function getFeature(id) {

    return new Promise((resolve, reject) => {

        establishConnection().then(({collection, client}) => {

            collection.find({ id }).toArray().then(docs => client.close() && resolve(docs)).catch(err => client.close() && reject(err));

        }).catch(reject);

    });

}

export function getFeatures(module) {

    return new Promise((resolve, reject) => {

        establishConnection().then(({collection, client}) => {
            collection.find({ module }).toArray().then(docs => client.close() && resolve(docs)).catch(err => client.close() && reject(err));

        }).catch(reject);

    });

}

export function createFeature(doc) {

    return new Promise((resolve, reject) => {

        establishConnection().then(({collection, client}) => {

            collection.insertOne(doc).then(docs => client.close() && resolve(docs)).catch(err => client.close() && reject(err));

        }).catch(reject);

    });

}

export function deleteFeature(id) {

    return new Promise((resolve, reject) => {

        establishConnection().then(({collection, client}) => {
            collection.deleteMany({ id }).then(docs => client.close() && resolve(docs)).catch(err => client.close() && reject(err));

        }).catch(reject);

    });

}

export function releaseFeature(id) {

    return new Promise((resolve, reject) => {

        establishConnection().then(({collection, client}) => {

            collection.updateOne({ id }, { $set: { manually_activated: true }}).then(docs => client.close() && resolve(docs)).catch(err => client.close() && reject(err));

        }).catch(reject);

    })

}




