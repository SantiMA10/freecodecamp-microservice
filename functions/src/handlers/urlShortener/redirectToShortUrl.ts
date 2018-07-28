export const redirectToShortUrlHandler = ({id}): IResponse => {
    return {
        original_url: 'http://www.google.com',
        short_url: id
    }
}

interface IResponse {
    original_url?: string
    short_url?: number
    error?: string
}