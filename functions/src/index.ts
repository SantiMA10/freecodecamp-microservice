import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors'
import { timestampHandler } from './handlers/timestamp';

const app = express()
app.use(cors({optionsSuccessStatus: 200}))

app.get('timestamp/:date_string', (req, res) => {
    return res.send(timestampHandler(req.params.date_string))
})

export const api = functions.https.onRequest(app)