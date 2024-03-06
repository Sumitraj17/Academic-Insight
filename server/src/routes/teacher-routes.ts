import { Router } from "express";
import { getAllStudents, teacherLogin, teacherLogout, verifyTeacher, handleFileUpload, getClassRecords, getIndividualRecord } from "../controllers/teacher-controller.js";
import { loginValidator, validate } from "../utils/validator.js";
import { verifyToken } from "../utils/token-manager.js";
import { upload } from "../app.js";

const teacherRouter = Router();

teacherRouter.post("/login", validate(loginValidator), teacherLogin);
teacherRouter.get("/auth-status", verifyToken, verifyTeacher);
teacherRouter.get("/logout", verifyToken, teacherLogout);
teacherRouter.post("/file-upload", verifyToken, upload.single('file'), handleFileUpload);
teacherRouter.get("/get-all-students", verifyToken, getAllStudents);
teacherRouter.get("/get-class-records", verifyToken, getClassRecords);
teacherRouter.get("/get-individual-record/:usn", getIndividualRecord);

export default teacherRouter;
