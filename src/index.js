import expressLoader from "./loaders/expressLoader.js";
import mysqlLoader from "./loaders/mysqlLoader.js";

const app = async () => {
	try {
		await mysqlLoader();
		expressLoader();
	} catch (err) {
		console.log("[ERR] ", err);
	}
};

app();
