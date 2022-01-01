const pbkdf2 = require('pbkdf2');
const { query } = require('../config/db');

class SiteController {
	async index(req, res) {
		let sqlString = `SELECT * from tbl_user`;
		const data = await query(sqlString);
		res.json(data);
	}

	async signup(req, res) {
		const data = req.body;
		const derivedKey = pbkdf2.pbkdf2Sync(
			data.password,
			'salt',
			1,
			32,
			'sha512',
		);

		let sqlString = `
		INSERT INTO [webSach].[dbo].[taiKhoanKH]
			([hoTen]
			,[sdt]
			,[email]
			,[diaChi]
			,[tenDangNhap]
			,[matKhau]
			,[gioiTinh]
			,[ngaySinh])
		VALUES
			(N'${data.fullName}'
			,'${data.phone}'
			,'${data.emailUser}'
			,N'${data.address}'
			,'${data.userName}'
			,'${derivedKey}'
			,'${data.gender}'
			,'${data.birthDay}')`;

		const result = await query(sqlString);
		res.json({ result });
	}
}

module.exports = new SiteController();
