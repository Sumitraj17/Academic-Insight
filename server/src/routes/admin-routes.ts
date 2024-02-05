import { Router } from "express";
import { getAllAdmins, adminLogin, adminLogout, verifyAdmin } from "../controllers/admin-controller.js";
import { loginValidator, validate } from "../utils/validator.js";
import { verifyToken } from "../utils/token-manager.js";

const adminRouter = Router();

adminRouter.get("/", getAllAdmins);
adminRouter.post("/login", validate(loginValidator), adminLogin);
adminRouter.get("/auth-status", verifyToken, verifyAdmin);
adminRouter.get("/logout", verifyToken, adminLogout);

export default adminRouter;