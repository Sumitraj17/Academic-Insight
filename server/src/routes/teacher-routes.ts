import { Router } from "express";
import { getAllTeachers, teacherSignup, teacherLogin, verifyTeacher, teacherLogout } from "../controllers/teacher-controller.js";
import { loginValidator, signupValidator, validate } from "../utils/validator.js";

const teacherRoutes = Router();

teacherRoutes.get("/", getAllTeachers);
teacherRoutes.post("/signup", validate(signupValidator), teacherSignup);
teacherRoutes.post("/login", validate(loginValidator), teacherLogin);
teacherRoutes.get("/auth-status", verifyTeacher);
teacherRoutes.get("/logout", teacherLogout);

export default teacherRoutes;