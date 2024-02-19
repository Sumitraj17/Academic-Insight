import { Request, Response, NextFunction } from "express";
import { connection } from "../db/db-connection.js";
import { compare } from "bcrypt";
import { COOKIE_NAME } from "../utils/constants.js";
import { createToken } from "../utils/token-manager.js";
import { Admin } from "../interfaces/admin.js";
import { config } from 'dotenv';

config();

export const getAllAdmins = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const [admins] = await connection.promise().query<Admin[]>("SELECT * FROM teacher");
        return res.status(200).json({ message: "OK", admins });
    } catch (err) {
        console.log(err);
        return res.status(200).json({ message: "Error", error: err.message });
    }
}

export const adminLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = req.body;
        const [existingAdmin] = await connection.promise().query<Admin[]>("SELECT * FROM teacher WHERE Email = ?", [email]);

        // Check if user is present in DB
        if (!existingAdmin || existingAdmin.length === 0)
            return res.status(200).json({ message: "ERROR", cause: "Admin does not exist" });

        // const isPasswordCorrect = await compare(password, existingAdmin[0].Password);
        const isPasswordCorrect = password == existingAdmin[0].Password;
        if (!isPasswordCorrect)
            return res.status(403).send("Incorrect password...");

        if (!existingAdmin[0].isAdmin)
            return res.status(403).send("Not an Admin...")
        // Remove any existing cookies
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: process.env.DOMAIN,
            signed: true,
            path: "/"
        });

        // Create a token for the admin and store cookie
        const token = createToken(existingAdmin[0].Admin_id, existingAdmin[0].Email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);

        console.log(token);

        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: process.env.DOMAIN,
            expires,
            httpOnly: true,
            signed: true
        });

        return res.status(201).json({ message: "OK", name: existingAdmin[0].Admin_Name, email: existingAdmin[0].Email });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
}

export const verifyAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const [admin] = await connection.promise().query<Admin[]>('SELECT * FROM teacher WHERE Teacher_id = ?', [res.locals.jwtData.id]);

        if (!admin[0])
            return res.status(401).send("Admin not registered or Token malfunction...");


        if (admin[0].Admin_id !== res.locals.jwtData.id)
            return res.status(401).send("Permissions did not match...");
        console.log("Verified Admin");
        return res.status(200).json({ message: "OK", name: admin[0].Admin_Name, email: admin[0].Email });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
}

export const adminLogout = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const [admin] = await connection.promise().query<Admin[]>("SELECT * FROM teacher WHERE Teacher_id = ?", [res.locals.jwtData.id]);

        if (!admin[0])
            return res.status(401).send("Admin not registered or Token malfunction...");

        if (admin[0].admin_id !== res.locals.jwtData.id)
            return res.status(401).send("Permissions did not match...");

        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: process.env.DOMAIN,
            signed: true,
            path: "/"
        });

        return res.status(200).json({ message: "OK", name: admin[0].admin_Name, email: admin[0].Email });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message })
    }
}