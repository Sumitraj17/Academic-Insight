import { Router } from "express";
import userRouter from "./user-routes.js";

const appRouter = Router();

appRouter.use('/teacher', userRouter);

export default appRouter;