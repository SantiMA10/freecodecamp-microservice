import { redirectToShortUrlHandler } from "./redirectToShortUrl";
import { FirebaseDb } from "../../services/firebase.db";
import { IDb } from "../../services/db.interface";
import { CreateShortUrlHandler } from "./createShortUrl";

describe('redirect to short url', () => {

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

    it ('should return the original url', () => {
        const handler = new CreateShortUrlHandler(db)
        handler
            .invoke({url: 'http://www.google.com'})
            .then(({short_url, original_url}) => {
                const response = redirectToShortUrlHandler({id: short_url})
        
                expect(response).toHaveProperty('original_url')
                expect(response).toHaveProperty('short_url')
                expect(response.original_url).toBe(original_url)
                expect(response.short_url).toBe(short_url)
            })
    })
})