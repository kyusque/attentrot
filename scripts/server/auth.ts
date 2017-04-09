import {Request, Response, NextFunction} from 'express';
import {User} from '../state/parts/users';
import * as jwt from 'jsonwebtoken';
import * as randomstring from 'randomstring';

function loadSecret() {
    return randomstring.generate({length: 64});
}

const secret = loadSecret();

const DAY_MS = 24 * 60 * 60 * 1000;

export function todayRange(): [number, number] {
    const date = createExpiry();

    return [date - DAY_MS, date];
}

function createExpiry(): number {
    const now = Date.now();
    const next = new Date(now);
    next.setHours(6);
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

function failRedirect(to: string): FailedFunction {
    return (_r, res, _n) => res.redirect(302, to)
}

export function requireAuth(failed: FailedFunction = failRedirect('/login'), source: 'cookie'|'header' = 'cookie') {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            res.locals.login = jwt.verify(getLogin(req, source) || '', secret);
        } catch (e) {
            failed(req, res, next);
            return;
        }
        next();
    }
}

export function requireNoAuth (failed: FailedFunction = failRedirect('/')) {
    return (req: Request, res: any, next: NextFunction) => {
        try {
            jwt.verify(req.cookies.login, secret);
            failed(req, res, next);
        } catch (e) {
            next();
        }
    }
}

export function signUser (obj: User) {
    const expiry = Math.floor(createExpiry() / 1000)
    return jwt.sign({ ...obj, exp: expiry }, secret);
}
