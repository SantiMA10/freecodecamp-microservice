import { v4 as uuid } from "uuid"

import { isWebUri } from "valid-url"
import { IDb } from '../../services/db.interface';

export class CreateShortUrlHandler {
    constructor(
        private db: IDb
    ) { }

    public invoke ({url}): Promise<IResponse> {
        if (!isWebUri(url)) {
            return Promise.resolve({
                error: 'invalid URL'
            })
        }

        const short = {
            original_url: url,
            short_url: uuid()
        };

        return this.db.setValue(short.short_url, short)
            .then(() => {
                return short
            })

    }
}

interface IResponse {
    original_url?: string
    short_url?: number
    error?: string
}