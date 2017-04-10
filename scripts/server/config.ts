export interface Config {
    otpName: string;
    port: number;
    renewDay: number;
}

const defConf: Config = {
    otpName: 'attentrot',
    port: 3000,
    renewDay: 0,
}

function loadConfig(): Config {
    try {
        const c = require('../../config');
        return {
            otpName: c.otpName || defConf.otpName,
            port: c.port || defConf.port,
            renewDay: c.renewDay || defConf.renewDay,
        };
    } catch (_) {
        return defConf;
    }
}
const config = loadConfig();
export default config;
