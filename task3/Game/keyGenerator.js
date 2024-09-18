import crypto from 'crypto';

class KeyGenerator {
    static generateKey() {
        return crypto.randomBytes(32).toString('hex');
    }
}

export default KeyGenerator;