
exports.up = function(knex) {
  return knex.schema.createTable('tarefas', function (table) {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.string('img');

    table.string('user_id').notNullable();

    table.foreign('user_id').references('userId').inTable('user');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('tarefas');
};
