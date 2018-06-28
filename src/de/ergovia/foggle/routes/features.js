import express from 'express';

import {createFeature, getFeatures, getFeature, deleteFeature} from "../database/mongo";

const router = express.Router();

/**
 * Retrieves all features to the given module
 */
router.get('/all/:module', (req, res) => {

    getFeatures(req.params.module).then(docs => {

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

    if (!body.id || !body.module || !body.id || typeof body.manually_activated === 'undefined' || !body.release_date) {
        res.status(400);
        res.end();
        return;
    }

    if (req.header('x-token-authorization') !== process.env.SECURITY_TOKEN) {
        res.status(401);
        res.end();
        return;
    }

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

            }).catch(() => {
                res.status(500);
                res.end();

            });
        } else {
            res.status(304);
            res.end();

        }

    });

});

/**
 * Deletes a feature with the given id
 */
router.delete('/delete/:id', (req, res) => {

    const id = req.params.id;

    if (req.header('x-token-authorization') !== process.env.SECURITY_TOKEN) {
        res.status(401);
        res.end();
        return;
    }

    getFeature(id).then(doc => {

        if (doc.length) {
            deleteFeature(id).then(() => {
                res.status(201);
                res.end();

            }).catch(() => {
                res.status(500);
                res.end();

            });
        } else {
            res.status(304);
            res.end();

        }

    });

});

module.exports = router;
