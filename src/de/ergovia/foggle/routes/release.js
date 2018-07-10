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
 * release.js 25.06.18
 *
 * (c) Copyright 2018 ergovia GmbH
 */
import express from 'express';
import {getFeature, releaseFeature} from "../database/mongo";

module.exports = (app, dbConnection) => {

    const router = express.Router();

    router.put('/:id', (req, res) => {

        const id = req.params.id;

        if (req.header('x-token-authorization') !== process.env.SECURITY_TOKEN) {
            res.status(401);
            res.end();
            return;
        }

        getFeature(id).then(docs => {

            if (docs.length) {

                releaseFeature(dbConnection, id).then(() => {
                    res.status(201);
                    res.end();
                }).catch(() => {
                    res.status(500);
                    res.end();
                })

            } else {
                res.status(404);
                res.end();
            }

        });

    });

    app.use('/release', router);

    return app;
};

