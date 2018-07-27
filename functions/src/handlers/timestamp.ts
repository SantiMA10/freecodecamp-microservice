export const timestampHandler = (dateString: string): IResponse =>  {
    let date = new Date(Date.now())

    if(dateString !== ''){
        date = new Date(dateString)
    }

    return { 
        unix: date.getTime(),
        utc: date.toUTCString()
    }
}

interface IResponse {
    unix: number
    utc: string
}