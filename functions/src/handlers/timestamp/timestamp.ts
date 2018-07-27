export const timestampHandler = (dateString: string): IResponse =>  {
    let date = new Date(Date.now())

    if (dateString !== ''){
        date = new Date(dateString)
    }

    if (date.toUTCString() === 'Invalid Date') {
        return {
            error: 'Invalid Date'
        }
    }

    return { 
        unix: date.getTime(),
        utc: date.toUTCString()
    }
}

interface IResponse {
    unix?: number
    utc?: string
    error?: string
}