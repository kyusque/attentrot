import {Request, Response, NextFunction} from 'express';
import {AuthenticationFailed} from '../action/api/_errors';
import {User} from '../state/parts/users';
import * as jwt from 'jsonwebtoken';
import * as randomstring from 'randomstring';
import * as fsp from 'fs-promise';
import config from './config';

let secretFile = 'secret.txt';
let secret: string|null = null;

export async function loadSecret(file: string): Promise<string> {
    if (secret) {
        return secret;
    }

    try {
        const buf = await fsp.readFile(file);
        return buf.toString();
    } catch(e) {
        const state = randomstring.generate({ length: 64 });
        await fsp.writeFile(file, state);
        return state;
    }
}

const DAY_MS = 24 * 60 * 60 * 1000;

export function todayRange(): [number, number] {
    const date = createExpiry();

    return [date - DAY_MS, date];
}

function createExpiry(): number {
    const now = Date.now();
    const next = new Date(now);
    next.setHours(config.renewDay);
    next.setMinutes(0);
    next.setSeconds(0);
    next.setMilliseconds(0);

    let nextEpoch = next.getTime();

    if (nextEpoch > now) {
        return nextEpoch;
    } else {
        return nextEpoch + DAY_MS;
    }
}

function getLogin(req: Request, source: 'cookie'|'header' = 'cookie'): string | undefined {
    switch (source) {
        case 'cookie':
            return req.cookies.login;
        case 'header':
            const auth = req.headers.authorization;
            if (!auth) {
                return;
            }
            const [type, tok] = auth.trim().split(/ +/);
            if (type !== 'Bearer') {
                return;
            }
            return tok;
    }
}

export interface FailedFunction {
    (req: Request, res: Response, next: NextFunction): void
}

export function makeRequireAuth(failed: FailedFunction, source: 'cookie'|'header') {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const secret = await loadSecret(secretFile);
            res.locals.login = jwt.verify(getLogin(req, source) || '', secret);
        } catch (e) {
            failed(req, res, next);
            return;
        }
        next();
    }
}

export const requireAuthPage = makeRequireAuth((_q, res, _n) => res.redirect(302, '/login'), 'cookie');
export const requireAuthAPI = makeRequireAuth((_q, res, _n) => res.status(401).send(AuthenticationFailed), 'header');

export async function requireNoAuthPage (req: Request, res: any, next: NextFunction) {
    try {
        const secret = await loadSecret(secretFile);
        jwt.verify(req.cookies.login, secret);
        res.redirect(302, '/');
    } catch (e) {
        next();
    }
}

export async function signUser (obj: User) {
    const secret = await loadSecret(secretFile);
    const expiry = Math.floor(createExpiry() / 1000)
    return jwt.sign({ ...obj, exp: expiry }, secret);
}
