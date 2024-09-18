import crypto from 'crypto'

class HmacGenerator {
    static generateHmac(key, message) {
        return crypto.createHmac('sha256', key).update(message).digest('hex');
    }
}

export default HmacGenerator;