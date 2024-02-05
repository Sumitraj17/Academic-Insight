import { Router } from "express";
import userRouter from "./admin-routes.js";
import adminRouter from "./admin-routes.js";

const appRouter = Router();

appRouter.use('/admin', adminRouter);
appRouter.use('/teacher', userRouter);

export default appRouter;