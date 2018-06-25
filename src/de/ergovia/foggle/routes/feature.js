/*
 * feature.js 25.06.18
 *
 * (c) 2018 ergovia GmbH
 */
import express from 'express';

import {createFeature, getFeatures, getFeature} from "../database/mongo";

const router = express.Router();

router.get('/all/:module', (req, res) => {

    if (req.params.module === 'BILDUNGSMANAGER') {

        getFeatures(req.params.module).then(docs => {

            res.json({
                enabledFeatures: docs
            })

        }).catch(() => {
            res.end()
        });


    } else {

        res.json({
            enabledFeatures: []
        })
    }

});

router.post('/create', (req, res) => {

    const body = req.body;

    getFeature(req.body.id).then(doc => {

        if (doc.length === 0) {
            createFeature({
                id: body.id,
                module: body.module,
                manually_activated: body.manually_activated,
                release_date: body.release_date
            }).then(() => {
                res.status(201);
                res.end();

            }).catch(err => {
                res.status(500);
                res.end()

            });
        } else {
            res.status(304);
            res.end();

        }

    });

});

module.exports = router;
