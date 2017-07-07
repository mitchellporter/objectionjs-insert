
exports.up = function(knex, Promise) {
  return knex.schema.createTable('jira_agile_boards', table => {
    table.increments('id').primary();
    table.timestamps(true, true);
    table.string('jira_id');
    table.string('name');
    table.string('type');
    table.json('raw_json');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('jira_agile_boards');
};
