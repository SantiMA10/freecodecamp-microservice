export const whoamiHandler = ({ip, headers}: IRequest) => {
    return {
        ipaddress: ip,
        language: headers ? headers['accept-language'] : '',
        software: headers ? headers['user-agent'] : ''
    }
}

interface IRequest {
    ip?: string
    headers?: {}
}