
exports.up = function(knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.string('email').notNullable();
    table.string('contato').notNullable();
    table.string('senha').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('user');
};
