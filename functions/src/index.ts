import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors'

import { timestampHandler } from './handlers/timestamp/timestamp';
import { whoamiHandler } from './handlers/whoami/whoami';
import { CreateShortUrlHandler } from './handlers/urlShortener/createShortUrl';
import { RedirectToShortUrlHandler } from './handlers/urlShortener/redirectToShortUrl';
import { FirebaseDb } from './services/firebase.db';

const app = express()
app.use(cors({optionsSuccessStatus: 200}))

app.get('/timestamp/:date_string', (req, res) => {
    return res.send(timestampHandler(req.params.date_string))
})

app.get('/whoami', (req, res) => {
    return res.send(whoamiHandler(req))
})

const db = new FirebaseDb('shortUrl');

app.post('/shorturl/new', (req, res) => {
    const handler = new CreateShortUrlHandler(db)
    handler.invoke({url: req.body.url})
        .then((response) => {
            res.send(response)
        })
})

app.get('/shorturl/:id', (req, res) => {
    const handler = new RedirectToShortUrlHandler(db)
    handler.invoke({id: req.params.id})
        .then((response) => {
            res.redirect(response.original_url)
        })
})

export const api = functions.https.onRequest(app)