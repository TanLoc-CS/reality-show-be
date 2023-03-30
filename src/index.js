import expressLoader from "./loaders/expressLoader.js";
import mysqlLoader from "./loaders/mysqlLoader.js";
import sequelizeLoader from "./loaders/sequelizeLoader.js";
import dotenv from "dotenv";

dotenv.config();

const app = async () => {
	try {
		await mysqlLoader();
		await sequelizeLoader();
		expressLoader();
	} catch (err) {
		console.log("[ERR] ", err);
	}
};

app();
