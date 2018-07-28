import { IDb } from '../../services/db.interface';
import { IResponse } from './response.interface';

export class RedirectToShortUrlHandler {
    constructor(
        private db: IDb
    ) { }

    public invoke ({id}): Promise<IResponse> {
        return this.db.readValue(id)
    }
}