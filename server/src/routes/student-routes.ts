import { Router } from "express";
import { getAllStudents, studentLogin, studentLogout, verifyStudent } from "../controllers/student-controller.js";
import { loginValidator, validate } from "../utils/validator.js";
import { verifyToken } from "../utils/token-manager.js";

const studentRouter = Router();

studentRouter.get("/", getAllStudents);
studentRouter.post("/login", validate(loginValidator), studentLogin);
studentRouter.get("/auth-status", verifyToken, verifyStudent);
studentRouter.get("/logout", verifyToken, studentLogout);

export default studentRouter;