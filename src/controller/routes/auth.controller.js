import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import userModel from "../../model/user.model.js";

const authRouter = Router();

export default (app) => {
	app.use("/auth", authRouter);

	authRouter.post("/signin", async (req, res) => {
		const { username, password } = req.body;
		try {
			if (username !== userModel.username || password !== userModel.password) {
				throw Error("Invalid username or password");
			}
			return res.status(StatusCodes.OK).json({ accept: { message: "OK" } });
		} catch (error) {
			return res.status(StatusCodes.UNAUTHORIZED).json({
				error: {
					message: error,
				},
			});
		}
	});
};
