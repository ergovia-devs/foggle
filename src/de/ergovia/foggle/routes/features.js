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
 * features.js 25.06.18
 *
 * (c) Copyright 2018 ergovia GmbH
 */
import express from 'express';

import {createFeature, getFeatures, getFeature, deleteFeature} from "../database/mongo";

module.exports = (app, dbConnection) => {


    const router = express.Router();

    /**
     * Retrieves all enabled features to the given module
     */
    router.get('/all/:module', (req, res) => {

        getFeatures(dbConnection, req.params.module).then(docs => {

            res.json({
                enabledFeatures: docs
            })

        }).catch(err => {

            res.json({
                error: err,
                enabledFeatures: []
            })
        });

    });

    /**
     * Creates a new feature. The body must contain an object of exact format { id, module, manually_activated, release_date }
     */
    router.post('/create', (req, res) => {

        const body = req.body;

        if (!body.id || !body.module || typeof body.manually_activated !== 'boolean' || !body.release_date) {
            res.status(400);
            res.end();
            return;
        }

        if (req.header('x-token-authorization') !== process.env.SECURITY_TOKEN) {
            res.status(401);
            res.end();
            return;
        }

        getFeature(dbConnection, body.id, body.module).then(doc => {

            if (doc.length === 0) {
                createFeature(dbConnection, {
                    id: body.id,
                    module: body.module,
                    manually_activated: body.manually_activated,
                    release_date: body.release_date
                }).then(() => {
                    res.status(201);
                    res.json({
                        id: body.id,
                        module: body.module,
                        manually_activated: body.manually_activated,
                        release_date: body.release_date
                    });

                }).catch(() => {
                    res.status(500);
                    res.end();

                });
            } else {
                res.status(204);
                res.end();

            }

        });

    });

    /**
     * Deletes a feature with the given id
     */
    router.delete('/delete', (req, res) => {

        const body = req.body;

        if (!body.id || !body.module) {
            res.status(400);
            res.end();
            return;
        }

        if (req.header('x-token-authorization') !== process.env.SECURITY_TOKEN) {
            res.status(401);
            res.end();
            return;
        }

        getFeature(dbConnection, body.id, body.module).then(doc => {

            if (doc.length) {
                deleteFeature(dbConnection, body.id, body.module).then(() => {
                    res.status(201);
                    res.end();

                }).catch(err => {
                    res.status(500);
                    res.end();

                });
            } else {
                res.status(404);
                res.end();

            }

        });

    });

    app.use('/features', router);

    return app;
};
