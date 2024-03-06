import { Router } from "express";
import { getAllStudents, teacherLogin, teacherLogout, verifyTeacher, handleFileUpload, getRecords } from "../controllers/teacher-controller.js";
import { loginValidator, validate } from "../utils/validator.js";
import { verifyToken } from "../utils/token-manager.js";
import { upload } from "../app.js";

const teacherRouter = Router();

teacherRouter.post("/login", validate(loginValidator), teacherLogin);
teacherRouter.get("/auth-status", verifyToken, verifyTeacher);
teacherRouter.get("/logout", verifyToken, teacherLogout);
teacherRouter.post("/file-upload", verifyToken, upload.single('file'), handleFileUpload);
teacherRouter.get("/get-all-students", verifyToken, getAllStudents);
teacherRouter.get("/get-class-records", verifyToken, getRecords);

export default teacherRouter;
