import { CreateShortUrlHandler } from "./createShortUrl";
import { FirebaseDb } from "../../services/firebase.db";
import { IDb } from "../../services/db.interface";

describe('create short url', () => {

    let db: IDb;

    beforeAll(() => {
        const mock = jest.fn<IDb>(() => ({
            setValue:  (key: string, value: object) => {
                return Promise.resolve(value)
            }
        }))

        db = new mock()
    })

    it ('should return create short url', (done) => {
        const handler = new CreateShortUrlHandler(db)
        handler
            .invoke({url: 'http://www.google.com'})
            .then((response) => {
                expect(response).toHaveProperty('original_url')
                expect(response).toHaveProperty('short_url')
                expect(response.original_url).toBe('http://www.google.com')
                done()
            })

    })

    it ('should return an error if the url is not well format', (done) => {

        const handler = new CreateShortUrlHandler(db)
        handler
            .invoke({url: 'htt://www.google.com'})
            .then((response) => {
                expect(response).toHaveProperty('error')
                expect(response.error).toBe('invalid URL')
                done()
            })        
    })
})