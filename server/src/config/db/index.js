const sql = require('mysql');
const util = require('util');

const config = {
	type: 'mysql',
	server: 'localhost',
	user: 'root',
	password: '',
	database: 'testconnect',
};

const connection = sql.createConnection(config);
const query = util.promisify(connection.query).bind(connection);

connection.connect(function (err) {
	if (err) {
		console.log('Connect failed');
	} else {
		console.log('Connect successfully!');
	}
});

module.exports = { connection, query };
