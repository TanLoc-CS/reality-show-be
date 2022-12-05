import { Router } from "express";

import traineeRouter from "./routes/trainee.controller.js";
import authRouter from "./routes/auth.controller.js";

const api = Router();

authRouter(api);
traineeRouter(api);

export default api;
