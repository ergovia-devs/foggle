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
 * health_check.js 25.06.18
 *
 * (c) Copyright 2018 ergovia GmbH
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


