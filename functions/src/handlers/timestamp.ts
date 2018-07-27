export const timestampHandler = (date: string): IResponse =>  {
    const now = Date.now()
    return { 
        unix: now,
        utc: (new Date(now)).toUTCString()
    }
}

interface IResponse {
    unix: number
    utc: string
}