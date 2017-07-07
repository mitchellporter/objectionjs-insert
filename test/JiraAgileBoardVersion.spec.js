require('dotenv').config();

const should = require('chai').should();
const knex = require('knex')(require('../knexfile')['development']);
require('objection').Model.knex(knex);
const util = require('util');

const JiraAgileBoardVersion = require('../models/jira_agile_board_version');
const validJson = {
            "self": "http://www.example.com/jira/version/10000",
            "id": 10000,
            "projectId": 10000,
            "board_id": 1, // this is created with knex seed
            "name": "Version 1",
            "description": "A first version",
            "archived": false,
            "released": true,
            "releaseDate": "2015-04-20T01:02:00.000+10:00",
        };

describe('JiraAgileBoardVersion', function() {

  describe('insert', function() {

    it.only('should save to the database BUT returns duplicate snake_case keys for some reason', function (done) {

      JiraAgileBoardVersion
        .query()
        .insert(validJson)
        .returning('*')
        .then(item => {
          console.log('item: ' + util.inspect(item));
          done();
        })
        .catch(err => {
          console.log('error: ' + err);
          done(err);
        });

    });

    it('should save to the database', function (done) {

      JiraAgileBoardVersion
        .query()
        .insert(validJson)
        .returning('*')
        .then(item => {
          console.log('item: ' + util.inspect(item));
          return JiraAgileBoardVersion.query().where('id', item.id);
        })
        .then(item => {
          console.log('final item: ' + util.inspect(item));
          done();
        })
        .catch(err => {
          console.log('error: ' + err);
          done(err);
        });

    });

  });

});


// 1. Install dependencies with npm install
// 2. Create a local db called objectionjs_insert
// 3. Run knex seed:run
// 4. Run the tests