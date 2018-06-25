/*
 * release.js 25.06.18
 *
 * (c) 2018 ergovia GmbH
 */
import express from 'express';

const router = express.Router();

router.put('/', (req, res) => {

    const body = req.body();

    bildungsmanagerFeatures.push({
        id: body.id,
        module: body.module,
        manually_activated: body.manually_activated,
        release_date: body.release_date
    });

    res.status(204)

});
