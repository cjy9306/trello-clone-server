const environments = {
    development: {
      mysql: {
        username: 'root',
        password: 'diclfn12',
        database: 'trello',
        host: '127.0.0.1',
        dialect: 'mysql'
      }
    },
  
    test: {
      mysql: {
        username: 'root',
        password: 'diclfn12',
        database: 'trello',
        host: '127.0.0.1',
        dialect: 'mysql'
      }
    },
  
    production: {
  
    }
  }

const nodeEnv = process.env.NODE_ENV || 'development';

exports.db_environments = environments[nodeEnv];
exports.jwt_key = 'SeCrEtKeYfOrHaShInG';
//module.exports = environments[nodeEnv];