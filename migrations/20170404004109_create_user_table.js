
exports.up = async function(knex, Promise) {
    await knex.schema.createTable('users', (table) => {
        table.increments('id').index().primary();
        table.string('name').notNullable().unique();
        table.string('ruby');
        table.enum('authType', ['totp', 'none']).notNullable().default('totp');
        table.string('secret').default(null);
        table.bool('verified').notNullable().default(false);
        table.bool('admin').notNullable().default(false);
        table.bool('active').notNullable().default(true);
    });

    if (knex.client.config.client.match(/sqlite/i)) {
        await knex.raw("ALTER TABLE users add authType_enum CONSTRAINT authType CHECK (authType = 'totp' OR authType = 'none')");
    }
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};
