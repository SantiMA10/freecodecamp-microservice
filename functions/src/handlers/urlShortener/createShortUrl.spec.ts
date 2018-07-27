import { createShortUrlHandler } from "./createShortUrl";

describe('create short url', () => {
    it ('should return create short url', () => {
        const response = createShortUrlHandler({url: 'http://www.google.com'})

        expect(response).toHaveProperty('original_url')
        expect(response).toHaveProperty('short_url')
        expect(response.original_url).toBe('http://www.google.com')
        expect(response.short_url).toBe(1)
    })

    it ('should return an error if the url is not well format', () => {
        const response = createShortUrlHandler({url: 'htt://www.google.com'})

        expect(response).toHaveProperty('error')
        expect(response.error).toBe('invalid URL')
    })
})