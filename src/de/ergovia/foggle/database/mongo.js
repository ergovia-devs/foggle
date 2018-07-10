/**
 * This file is part of foggle.
 *
 * foggle. is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * foggle is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with foggle.  If not, see <http://www.gnu.org/licenses/>.
 *
 * mongo.js 25.06.18
 *
 * (c) Copyright 2018 ergovia GmbH
 */
import mongodb from 'mongodb'
import format from 'date-fns/format'
import startOfToday from 'date-fns/start_of_today'

const MongoClient = mongodb.MongoClient,
    dbName = 'foggle',
    collectionName = 'features';

/**
 * Establishes a connection to the local mongodb with a connectionpoolsize of 10.
 *
 * @return {Promise}
 */
export function establishConnection() {

    return new Promise((resolve, reject) => {

        MongoClient.connect(process.env.MONGO_CONNECTION, {
            poolSize: 10
        }).then(client => {
            resolve(client.db(dbName));

        }).catch(reject);

    })

}

/**
 * Returns a specific feature from the database with the given id.
 *
 * @param dbConnection the connection to the database
 * @param id the unique feature id
 *
 * @return {Promise}
 */
export function getFeature(dbConnection, id) {

    return new Promise((resolve, reject) => {

        dbConnection.collection(collectionName).find({ id }).toArray().then(resolve).catch(reject);

    });

}

/**
 * Returns all features to the given module. Because you can register multiple Application to Foggle, you have to specify a Module-Name for each Application that uses Foggle.
 *
 * @param dbConnection the connection to the database
 * @param module the name of the application to get all features from
 *
 * @return {Promise}
 */
export function getFeatures(dbConnection, module) {

    return new Promise((resolve, reject) => {

        dbConnection.collection(collectionName).find({
            module,
            $or : [{release_date: {$lte: format(startOfToday())}}, {manually_activated: true}]
        }).toArray().then(resolve).catch(reject);


    });

}

/**
 * Inserts a feature document into the current collection
 *
 * @param dbConnection the connection to the database
 * @param doc the document to insert
 * @return {Promise}
 */
export function createFeature(dbConnection, doc) {

    return new Promise((resolve, reject) => {

        dbConnection.collection(collectionName).insertOne(doc).then(resolve).catch(reject);

    });

}

/**
 * Deletes a feature by its feature id
 *
 * @param dbConnection the connection to the database
 * @param id the feature id to delete
 * @return {Promise}
 */
export function deleteFeature(dbConnection, id) {

    return new Promise((resolve, reject) => {

        dbConnection.collection(collectionName).deleteMany({ id }).then(resolve).catch(reject);

    });

}

/**
 * Releases a specific feature by setting the manuall_acticated-flag to true.
 *
 * @param dbConnection the connection to the database
 * @param id the id of the feature to release
 * @return {Promise}
 */
export function releaseFeature(dbConnection, id) {

    return new Promise((resolve, reject) => {

        dbConnection.collection(collectionName).updateOne({ id }, { $set: { manually_activated: true }}).then(resolve).catch(reject);

    })

}




