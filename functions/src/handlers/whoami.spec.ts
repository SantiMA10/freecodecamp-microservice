import { whoamiHandler } from "./whoami";

describe('whoami', () => {
    it('should return the ip address', () => {
        const response = whoamiHandler({'ip': '192.168.1.1'})

        expect(response).toHaveProperty('ipaddress')
        expect(response.ipaddress).toBe('192.168.1.1')
    })
    it('should return the preferred languages', () => {
        const response = whoamiHandler({'headers': {'accept-language': 'es'}})

        expect(response).toHaveProperty('language')
        expect(response.language).toBe('es')
    })
    it('should return the system info', () => {
        const response = whoamiHandler({'headers': {'user-agent': 'user-agent'}})

        expect(response).toHaveProperty('software')
        expect(response.software).toBe('user-agent')
    })
})