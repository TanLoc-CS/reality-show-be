import { createConnection } from "mysql";

export const mysqlConnection = createConnection({
	host: "localhost",
	user: "root",
	password: "210205",
	database: "REALITYSHOW",
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
// process.env.DB_HOST ||
// process.env.DB_USER ||
// process.env.DB_PASSWORD ||
// process.env.DB_NAME ||
