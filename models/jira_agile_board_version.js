'use strict';
const _ = require('lodash');
const { camelizeKeys, decamelizeKeys } = require('humps');
const Model = require('objection').Model;
const util = require('util');

class JiraAgileBoardVersion extends Model {

  static get tableName() {
    return 'jira_agile_board_versions';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['jira_id', 'board_id'],
      properties: {
        self: { type: 'string' },
        jira_id: { type: 'integer' },
        board_id: { type: 'integer' },
        jira_project_id: { type: 'integer' },
        name: { type: 'string' },
        description: { type: 'string' },
        archived: { type: 'boolean' },
        released: { type: 'boolean' },
        release_date: { type: 'string' },
        raw_json: { type: 'object' }
      }
    };
  }

  // This is called when an object is serialized to database format.
  $formatDatabaseJson(json) {
    json = super.$formatDatabaseJson(json);
    console.log('$formatDatabaseJson before: ' + util.inspect(json));
    var new_json =  decamelizeKeys(json);
    console.log('$formatDatabaseJson after: ' + util.inspect(new_json));
    return new_json;
  }

  // This is called when a Model is created from a JSON object.
  // I use this to rename a key
  $parseJson(json) {
    console.log('$parseJson before: ' + util.inspect(json));
    if (json.project_id) {
      json.jira_project_id = json.project_id;
      delete json.project_id;
    }
    console.log('$parseJson after: ' + util.inspect(json));
    return json;
  }

  // This is called when an object is read from database.
  $parseDatabaseJson(json) {
    console.log('$parseDatabaseJson before: ' + util.inspect(json));
    var new_json = camelizeKeys(json);
    console.log('$parseDatabaseJson after: ' + util.inspect(super.$parseDatabaseJson(new_json)));
    return super.$parseDatabaseJson(new_json);
  }

  // If I run the below deletes, it fixes my problem but feels hacky
  $afterInsert() {
    console.log('$afterInsert: ' + util.inspect(this));
    // delete this.jira_id;
    // delete this.board_id;
    // delete this.jira_project_id;
  }
}

module.exports = JiraAgileBoardVersion;