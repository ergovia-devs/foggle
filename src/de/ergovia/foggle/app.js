/*
 * app.js.js 25.06.18
 *
 * (c) 2018 ergovia GmbH
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
