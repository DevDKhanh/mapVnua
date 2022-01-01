const { connect, sql } = require('../config/db');

const query = async sqlString => {
	try {
		const pool = await connect;
		const data = await pool.request().query(sqlString);
		return data;
	} catch (err) {
		console.log('Error connect database!');
	}
};

module.exports = {
	query,
};
