module.exports = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: './dev.sqlite3'
        },
        migrations: {
            tableName: 'knex_migrations'
        },
        useNullAsDefault: true,
        debug: true,
    },

    production: {
        client: 'sqlite',
        connection: {
            filename: './production.sqlite'
        },
        migrations: {
            tableName: 'knex_migrations'
        },
        useNullAsDefault: true,
    },
};
