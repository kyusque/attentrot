import express from 'express';
import * as pug from 'pug';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';

import {requireAuthPage, requireNoAuthPage} from './auth';

import entry_points from './api/entry-points';

import api_qrcode_issue from './api/qrcode/issue';
import api_qrcode_verify from './api/qrcode/verify';
import api_users from './api/users';
import api_login from './api/login';
import api_record from './api/record';
import api_status from './api/status';
import api_user from './api/user';
import api_calendar from './api/calendar';

import config from './config';


const tiny_template = pug.compileFile('./pug/tiny.pug');

express()
.use('/node_modules', express.static('node_modules'))
.use('/static', express.static('static'))

.use(bodyParser.json())
.use(bodyParser.urlencoded({extended: true}))

.use(cookieParser())

.use(compression())

.use(entry_points.qrcode.issue, api_qrcode_issue as any)
.use(entry_points.qrcode.verify, api_qrcode_verify as any)
.use(entry_points.login, api_login as any)
.use(entry_points.record, api_record as any)
.use(entry_points.status, api_status as any)
.use(entry_points.users, api_users as any)
.use(entry_points.user, api_user as any)
.use(entry_points.calendar, api_calendar as any)

.get('/new', requireNoAuthPage, (_req, res) => {
    res.send(tiny_template({title: 'ユーザー登録', script: 'static/new.js'}));
})

.get('/login', requireNoAuthPage, (_req, res) => {
    res.send(tiny_template({ title: 'ログイン', script: 'static/login.js' }));
})

.get('/record', requireAuthPage, (_req, res) => {
    res.send(tiny_template({ title: '出席管理', script: 'static/record.js' }));
})

.get('/calendar', requireAuthPage, (_req, res) => {
    res.send(tiny_template({ title: '出席確認', script: 'static/calendar.js' }));
})

.get('/', (_req, res) => {
    res.redirect(302, '/record');
})

.get('/logout', requireAuthPage, (_req, res) => {
    res.clearCookie('login');
    res.redirect('/login');
})

.listen(parseInt(process.env.PORT) || config.port);
