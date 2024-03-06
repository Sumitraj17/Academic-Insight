import { Router } from "express";
import { getAllAdmins, adminLogin, adminLogout, verifyAdmin, getAllTeachers, getAllStudents, getAllRecords, fileUpload, getClassRecords } from "../controllers/admin-controller.js";
import { loginValidator, validate } from "../utils/validator.js";
import { verifyToken } from "../utils/token-manager.js";
import { upload } from "../app.js";

const adminRouter = Router();

adminRouter.post("/login", validate(loginValidator), adminLogin);
adminRouter.get("/logout", verifyToken, adminLogout);
adminRouter.get("/auth-status", verifyToken, verifyAdmin);
adminRouter.get("/get-all-admins", getAllAdmins);
adminRouter.get("/get-all-teachers", verifyToken, getAllTeachers);
adminRouter.get("/get-all-students", verifyToken, getAllStudents);
adminRouter.get("/get-all-records", verifyToken, getAllRecords);
adminRouter.get("/get-class-records", verifyToken, getClassRecords);
adminRouter.post("/file-upload", verifyToken, upload.single('file'), fileUpload);

export default adminRouter;