import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		host: process.env.DB_HOST,
		dialect: "mysql",
	}
);

export default () => {
	sequelize
		.authenticate()
		.then(() => {
			console.log("[Sequelize] Connection has been established successfully.");
		})
		.catch((error) => {
			console.error("[Sequilize]", error);
		});
};