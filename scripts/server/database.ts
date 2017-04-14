import KNEX from 'knex';

declare function require(path: string): any;

const NODE_ENV = process.env.NODE_ENV || 'development';

const knexconfig = require('../../knexfile.js')[NODE_ENV];
const knex = KNEX(knexconfig);

knex.raw('PRAGMA foreign_keys = true;')

export default knex;

export const table = {
    users: 'users',
    attendance_events: 'attendance_events',
    attendance: 'attendance',
}
