import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors'
import { timestampHandler } from './handlers/timestamp/timestamp';
import { whoamiHandler } from './handlers/whoami/whoami';
import { createShortUrlHandler } from './handlers/urlShortener/createShortUrl';

const app = express()
app.use(cors({optionsSuccessStatus: 200}))

app.get('/timestamp/:date_string', (req, res) => {
    return res.send(timestampHandler(req.params.date_string))
})

app.get('/whoami', (req, res) => {
    return res.send(whoamiHandler(req))
})

app.post('/shorturl/new', (req, res) => {
    return res.send(createShortUrlHandler({url: req.body.url}))
})

export const api = functions.https.onRequest(app)