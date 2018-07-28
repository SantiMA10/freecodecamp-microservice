import { CreateShortUrlHandler } from "./createShortUrl";
import { FirebaseDb } from "../../services/firebase.db";
import { IDb } from "../../services/db.interface";

describe('create short url', () => {

    let db: IDb;

    beforeAll(() => {
        const mock = jest.fn<IDb>(() => ({
            addValue:  ({url}: {url: string}) => {
                return Promise.resolve({
                    original_url: url,
                    short_url: 1
                })
            } 
        }))

        db = new mock()
    })

    it ('should return create short url', () => {
        const handler = new CreateShortUrlHandler(db)
        handler
            .invoke({url: 'http://www.google.com'})
            .then((response) => {
                expect(response).toHaveProperty('original_url')
                expect(response).toHaveProperty('short_url')
                expect(response.original_url).toBe('http://www.google.com')
            })

    })

    it ('should return an error if the url is not well format', () => {

        const handler = new CreateShortUrlHandler(db)
        handler
            .invoke({url: 'htt://www.google.com'})
            .then((response) => {
                expect(response).toHaveProperty('error')
                expect(response.error).toBe('invalid URL')
            })        
    })
})