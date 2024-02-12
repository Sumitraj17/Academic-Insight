import { Request, Response, NextFunction } from "express";
import { connection } from "../db/db-connection.js";
import { compare } from "bcrypt";
import { COOKIE_NAME } from "../utils/constants.js";
import { createToken } from "../utils/token-manager.js";
import { Teacher } from "../interfaces/teacher.js";
import { upload } from "../app.js";

export const getAllTeachers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const [teachers] = await connection.promise().query<Teacher[]>("SELECT * FROM teacher");
        return res.status(200).json({ message: "OK", teachers: teachers });
    } catch (err) {
        console.log(err);
        return res.status(200).json({ message: "Error", error: err.message });
    }
}

export const teacherLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = req.body;
        const [existingTeacher] = await connection.promise().query<Teacher[]>("SELECT * FROM teacher WHERE Email = ?", [email]);

        // Check if user is present in DB
        if (!existingTeacher || existingTeacher.length === 0)
            return res.status(201).json({ message: "ERROR", cause: "Teacher does not exist" });

        const isPasswordCorrect = await compare(password, existingTeacher[0].Password);
        if (!isPasswordCorrect)
            return res.status(403).send("Incorrect password...");

        // Remove any existing cookies
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: process.env.DOMAIN,
            signed: true,
            path: "/"
        });

        // Create a token for the teacher and store cookie
        const token = createToken(existingTeacher[0].Teacher_id, existingTeacher[0].Email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);

        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: process.env.DOMAIN,
            expires,
            httpOnly: true,
            signed: true
        });

        return res.status(201).json({ message: "OK", name: existingTeacher[0].Teacher_Name, email: existingTeacher[0].Email });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
}

export const verifyTeacher = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const [teacher] = await connection.promise().query<Teacher[]>('SELECT * FROM teacher WHERE Teacher_id = ?', [res.locals.jwtData.id]);

        if (!teacher[0])
            return res.status(401).send("Teacher not registered or Token malfunction...");


        if (teacher[0].Teacher_id !== res.locals.jwtData.id)
            return res.status(401).send("Permissions did not match...");

        return res.status(200).json({ message: "OK", name: teacher[0].Teacher_Name, email: teacher[0].Email });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
}

export const teacherLogout = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const [teacher] = await connection.promise().query<Teacher[]>("SELECT * FROM teacher WHERE Teacher_id = ?", [res.locals.jwtData.id]);

        if (!teacher[0])
            return res.status(401).send("Teacher not registered or Token malfunction...");

        if (teacher[0].Teacher_id !== res.locals.jwtData.id)
            return res.status(401).send("Permissions did not match...");

        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: process.env.DOMAIN,
            signed: true,
            path: "/"
        });

        return res.status(200).json({ message: "OK", name: teacher[0].Teacher_Name, email: teacher[0].Email });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message })
    }
}

export const handleFileUpload = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const file = req.file;

        if (!file)
            return res.status(400).json({ message: "No file uploaded" });


        return res.status(201).json({ message: "File uploaded successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error uploading file", error: error.message });
    }
}