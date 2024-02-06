import { Router } from "express";
import teacherRouter from "./teacher-routes.js";
import adminRouter from "./admin-routes.js";

const appRouter = Router();

appRouter.use('/admin', adminRouter);
appRouter.use('/teacher', teacherRouter);

export default appRouter;