import { Router } from "express";
import teacherRoutes from "./teacher-routes.js";
import studentRoutes from "./student-routes.js";

const appRouter = Router();

appRouter.use('/teacher', teacherRoutes);
appRouter.use('/student', studentRoutes);

export default appRouter;