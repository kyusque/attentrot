
exports.up = async function(knex, Promise) {
    await knex.schema.createTable('attendance', table => {
        table.bigInteger('userId').notNullable().unsigned().index();
        table.integer('date').notNullable().unsigned();
        table.integer('workTime').notNullable().unsigned();

        table.foreign('userId').references('users.id');
        table.unique(['userId', 'date']);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('attendance');
};
