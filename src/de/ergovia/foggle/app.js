/*
 * app.js.js 25.06.18
 *
 * (c) 2018 ergovia GmbH
 */
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';

import features from './routes/features'
import release from './routes/release'
import health_check from './routes/health_check'

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cors());

app.use('/features', features);
app.use('/release', release);
app.use('/health', health_check);


app.listen(8070, () => {
    console.log('Server startup at localhost:8070');
});


module.exports = app;
