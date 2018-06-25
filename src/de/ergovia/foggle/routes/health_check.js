/*
 * health_check.js 25.06.18
 *
 * (c) 2018 ergovia GmbH
 */
import express from 'express';

/**
 * Route /health für den Healthcheck.
 */

const router = express.Router();

router.get('/', (req, res) => {
    res.send(`Mir geht's gut.`);
});

module.exports = router;
