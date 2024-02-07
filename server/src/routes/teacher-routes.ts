import { Router } from "express";
import { getAllTeachers, teacherLogin, teacherLogout, verifyTeacher } from "../controllers/teacher-controller.js";
import { loginValidator, validate } from "../utils/validator.js";
import { verifyToken } from "../utils/token-manager.js";

const teacherRouter = Router();

teacherRouter.get("/", getAllTeachers);
teacherRouter.post("/login", validate(loginValidator), teacherLogin);
teacherRouter.get("/auth-status", verifyToken, verifyTeacher);
teacherRouter.get("/logout", verifyToken, teacherLogout);

export default teacherRouter;