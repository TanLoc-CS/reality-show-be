import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import api from "../controller/index.js";

dotenv.config();
const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);

export default () =>
	app.listen(PORT, () => {
		console.log(`[SERVER] Server running on port ${PORT}`);
	});
