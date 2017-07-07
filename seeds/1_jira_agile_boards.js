
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('jira_agile_boards').del()
    .then(function () {
      // Inserts seed entries
      return knex('jira_agile_boards').insert([
        {id: 1, jira_id: '1234', name: 'test', type: 'test', raw_json: {}},
      ]);
    });
};