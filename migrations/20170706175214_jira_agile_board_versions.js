
exports.up = function(knex, Promise) {

  return knex.schema.createTable('jira_agile_board_versions', table => {

    table.increments('id').primary();
    table.timestamps(true, true);
    table.string('self');
    table.integer('jira_id').notNullable();
    table.integer('board_id').unsigned().references('id').inTable('jira_agile_boards').notNullable();
    table.integer('jira_project_id');
    table.string('name');
    table.text('description');
    table.boolean('archived');
    table.boolean('released');
    table.string('release_date');
    table.json('raw_json');

  });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('jira_agile_board_versions');
};
