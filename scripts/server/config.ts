export interface Config {
    otpName: string;
    port: number;
}

function loadConfig(): Config {
    try {
        const c = require('../../config');
        return {otpName: c.otpName || 'attentrot', port: c.port || 3000};
    } catch (_) {
        return {otpName: 'attentrot', port: 3000};
    }
}
const config = loadConfig();
export default config;
