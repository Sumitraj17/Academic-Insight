import { Router } from "express";
import { getAllTeachers, teacherSignup, teacherLogin, verifyTeacher, teacherLogout } from "../controllers/teacher-controller.js";

const teacherRoutes = Router();

teacherRoutes.get("/", getAllTeachers);
teacherRoutes.post("/signup", teacherSignup);
teacherRoutes.post("/login", teacherLogin);
teacherRoutes.get("/auth-status", verifyTeacher);
teacherRoutes.get("/logout", teacherLogout);

export default teacherRoutes;