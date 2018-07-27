import { isWebUri } from "valid-url"

export const createShortUrlHandler = ({url}): IResponse => {

    if (!isWebUri(url)) {
        return {
            error: 'invalid URL'
        }
    }

    return {
        original_url: url,
        short_url: 1
    }
}

interface IResponse {
    original_url?: string
    short_url?: number
    error?: string
}