const environments = {
	development: {
		mysql: {
			username: 'root',
			password: process.env.MYSQL_PASSWORD,
			database: 'trello',
			host: '127.0.0.1',
			dialect: 'mysql'
		}
	},

	test: {
		mysql: {
			username: 'root',
			password: process.env.MYSQL_PASSWORD,
			database: 'trello',
			host: '127.0.0.1',
			dialect: 'mysql'
		}
	},

	production: {}
};

const nodeEnv = process.env.NODE_ENV || 'development';

exports.db_environments = environments[nodeEnv];
