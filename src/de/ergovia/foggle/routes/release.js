/*
 * release.js 25.06.18
 *
 * (c) 2018 ergovia GmbH
 */
import express from 'express';
import {getFeature, releaseFeature} from "../database/mongo";

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

            releaseFeature(id).then(() => {
                res.status(201);
                res.end();
            }).catch(() => {
                res.status(500);
                res.end();
            })

        } else {
            res.status(304);
            res.end();
        }

    });

});

module.exports = router;
