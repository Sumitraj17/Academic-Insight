import { Router } from "express";
import { getAllTeachers, teacherLogin, teacherLogout, verifyTeacher, handleFileUpload } from "../controllers/teacher-controller.js";
import { loginValidator, validate } from "../utils/validator.js";
import { verifyToken } from "../utils/token-manager.js";
import { upload } from "../app.js";

const teacherRouter = Router();

teacherRouter.get("/", getAllTeachers);
teacherRouter.post("/login", validate(loginValidator), teacherLogin);
teacherRouter.get("/auth-status", verifyToken, verifyTeacher);
teacherRouter.post("/upload-file", verifyToken, upload.single('file'), handleFileUpload);
teacherRouter.get("/logout", verifyToken, teacherLogout);

export default teacherRouter;