exports.up = async function(knex, Promise) {
    await knex.schema.createTable('attendance_events', table => {
        table.bigInteger('userId').notNullable().unsigned().index();
        table.enum('event', ['clock-in', 'clock-out', 'break-start', 'break-end']).notNullable();
        table.timestamp('at').notNullable().index();
        table.string('ip').notNullable();

        table.foreign('userId').references('users.id');
    })

    if (knex.client.config.client.match(/sqlite/i)) {
        await knex.raw("ALTER TABLE attendance_events add event_enum CONSTRAINT event CHECK (event = 'clock-in' OR event = 'clock-out' OR event = 'break-start' OR event = 'break-end')");
    }
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('attendance_events');
};
