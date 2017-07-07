require('dotenv').config();

module.exports = {
    development: {
        client: 'pg',
        connection: process.env.DEVELOPMENT_DATABASE_URL,
        pool: {
            min: 0,
            max: 10,
            afterCreate: function(conn, cb) {
                conn.query('SET timezone="UTC";', function(err) {
                    if (err) {
                        cb(err, conn);
                    } else {
                        conn.query('select 1+1 as result;', function(err) {
                            cb(err, conn);
                        });
                    }
                });
            }
        }
    },
    production: {
        client: 'pg',
        connection: process.env.PRODUCTION_DATABASE_URL,
        pool: {
            min: 0,
            max: 10,
            afterCreate: function(conn, cb) {
                conn.query('SET timezone="UTC";', function(err) {
                    if (err) {
                        cb(err, conn);
                    } else {
                        conn.query('select 1+1 as result;', function(err) {
                            cb(err, conn);
                        });
                    }
                });
            }
        }
    }
};