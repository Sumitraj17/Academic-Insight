import { Router } from "express";
import teacherRouter from "./teacher-routes.js";
import adminRouter from "./admin-routes.js";
import studentRouter from "./student-routes.js";

const appRouter = Router();

appRouter.use('/admin', adminRouter);
appRouter.use('/teacher', teacherRouter);
appRouter.use('/student', studentRouter);

export default appRouter;