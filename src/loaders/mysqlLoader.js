import { createConnection } from "mysql";
import dotenv from "dotenv";

dotenv.config();

export const mysqlConnection = createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	multipleStatements: true,
});

export default () =>
	mysqlConnection.connect((err) => {
		if (!err) {
			console.log("[INFO] DBS: Databse connected...");
		} else {
			console.error("[ERR] DBS:", err);
		}
	});
