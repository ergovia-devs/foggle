/*
 * health_check.js 25.06.18
 *
 * (c) 2018 ergovia GmbH
 */
import express from 'express';

/**
 * Route /health für den Healthcheck.
 */
module.exports = app => {

    const router = express.Router();

    router.get('/', (req, res) => {
        res.send(`Mir geht's gut, denn ich habe Version ${process.env.npm_package_version}.`);
    });

    app.use('/health', router);

    return app;

};


