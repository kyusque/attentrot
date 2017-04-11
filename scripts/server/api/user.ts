import express from 'express';

import {requireAuthAPI} from '../auth';

import {GetUserSuccess} from '../../action/api/user';

const user: Express.Application = express()

.get('', requireAuthAPI, (_req, res) => {
    res.send(GetUserSuccess(res.locals.login));
});

export default user;

