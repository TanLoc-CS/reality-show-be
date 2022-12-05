import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { mysqlConnection } from "../../loaders/mysqlLoader.js";
const traineeRouter = Router();

export default (app) => {
	app.use("/", traineeRouter);

	traineeRouter.get("/trainees", (req, res) => {
		try {
			mysqlConnection.query(
				"SELECT * FROM Person RIGHT JOIN Trainee ON Person.ssn = Trainee.ssn;",
				(err, rows, fields) => {
					if (err) throw err;

					return res.status(StatusCodes.OK).json(rows);
				}
			);
		} catch (error) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				error: {
					message: error,
				},
			});
		}
	});

	traineeRouter.get("/trainee/:ssn", (req, res) => {
		const ssn = req.params.ssn;

		try {
			mysqlConnection.query(
				`
			SELECT P.ssn, P.fname, P.lname, T.dob, P.address, P.phone, T.photo, T.company_id, N.no_of_seasons, M.best_achievement FROM Person AS P, Trainee AS T, (SELECT COUNT(*) AS no_of_seasons FROM SeasonTrainee WHERE ssn_trainee = ${ssn}) AS N, (SELECT MAX(ep_no) AS best_achievement FROM StageIncludeTrainee WHERE ssn_trainee = ${ssn}) AS M WHERE P.ssn = T.ssn AND P.ssn = ${ssn};`,
				(err, rows, fields) => {
					if (err) throw err;

					return res.status(StatusCodes.OK).json(rows);
				}
			);
		} catch (error) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				error: {
					message: error,
				},
			});
		}
	});

	traineeRouter.post("/retrieve", (req, res) => {
		const { ssn, year } = req.body;

		try {
			mysqlConnection.query(
				`CALL trainee_result("${ssn}", ${year})`,
				(err, rows, fields) => {
					if (err) throw err;

					return res.status(StatusCodes.OK).json(rows);
				}
			);
		} catch (error) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				error: {
					message: error,
				},
			});
		}
	});

	traineeRouter.post("/trainee", (req, res) => {
		const { fname, lname, ssn, addr, phone, dob, company_id, photo } = req.body;

		try {
			mysqlConnection.query(
				`INSERT INTO Person VALUES ("${ssn}","${fname}","${lname}","${addr}", "${phone}")`,
				(err, rows, fields) => {
					if (err) throw err;

					return res
						.status(StatusCodes.OK)
						.json({ message: "Trainee has been added." });
				}
			);
			mysqlConnection.query(
				`INSERT INTO Trainee VALUES ("${ssn}","${dob}", "${photo}", "${company_id}")`,
				(err, rows, fields) => {
					if (err) throw err;

					return res
						.status(StatusCodes.OK)
						.json({ message: "Trainee has been added." });
				}
			);
		} catch (error) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				error: {
					message: error,
				},
			});
		}
	});
};
