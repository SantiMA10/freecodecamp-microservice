import { createShortUrlHandler } from "./createShortUrl";
import { redirectToShortUrlHandler } from "./redirectToShortUrl";

describe('redirect to short url', () => {
    it ('should return the original url', () => {
        const {short_url, original_url} = createShortUrlHandler({url: 'http://www.google.com'})
        const response = redirectToShortUrlHandler({id: short_url})

        expect(response).toHaveProperty('original_url')
        expect(response).toHaveProperty('short_url')
        expect(response.original_url).toBe(original_url)
        expect(response.short_url).toBe(short_url)
    })
})