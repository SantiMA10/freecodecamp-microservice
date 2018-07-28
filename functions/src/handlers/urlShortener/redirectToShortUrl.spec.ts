import { RedirectToShortUrlHandler } from "./redirectToShortUrl";
import { IDb } from "../../services/db.interface";
import { CreateShortUrlHandler } from "./createShortUrl";
import { IResponse } from "./response.interface";

describe('redirect to short url', () => {

    let db: IDb;
    let mockResponse: IResponse;

    beforeAll(() => {
        const mock = jest.fn<IDb>(() => ({
            setValue:  (key: string, value: object) => {
                mockResponse = value
                return Promise.resolve(mockResponse)
            },
            readValue: () => {
                return Promise.resolve(mockResponse)
            }
        }))

        db = new mock()
    })

    it ('should return the original url', (done) => {
        const handler = new CreateShortUrlHandler(db)
        handler
            .invoke({url: 'http://www.google.com'})
            .then(({short_url, original_url}) => {

                const redirectHandler = new RedirectToShortUrlHandler(db);
                redirectHandler.invoke({id: short_url})
                    .then((response) => {
                        expect(response).toHaveProperty('original_url')
                        expect(response).toHaveProperty('short_url')
                        expect(response.original_url).toBe(original_url)
                        expect(response.short_url).toBe(short_url)
                        done()
                    })
            })
    })
})