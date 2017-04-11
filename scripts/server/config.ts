export interface Config {
    otpName: string;
    port: number;
    renewDay: number;
    yearStart: number;
    threshold: number;
}

const defConf: Config = {
    otpName: 'attentrot',
    port: 3000,
    renewDay: 0,
    yearStart: 4,
    threshold: 8 * 60 * 60 * 1000,
}

function loadConfig(): Config {
    try {
        const c = require('../../config');
        return {
            otpName: c.otpName || defConf.otpName,
            port: c.port || defConf.port,
            renewDay: c.renewDay || defConf.renewDay,
            yearStart: c.yearStart || defConf.yearStart,
            threshold: c.threashold || defConf.threshold,
        };
    } catch (_) {
        return defConf;
    }
}
const config = loadConfig();
export default config;
