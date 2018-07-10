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
 * app.js 25.06.18
 *
 * (c) Copyright 2018 ergovia GmbH
 */
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';

import features from './routes/features';
import health_check from './routes/health_check';
import release from './routes/release';
import { establishConnection } from "./database/mongo";

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cors());


establishConnection().then(database => {

    features(app, database);
    release(app, database);

    health_check(app);

    app.listen(8070, () => {
        console.log('Server startup at localhost:8070');
    });

}).catch(console.error);


module.exports = app;
