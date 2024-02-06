import { Request, Response, NextFunction } from "express";
import { connection } from "../db/db-connection.js";
import { compare } from "bcrypt";
import { COOKIE_NAME } from "../utils/constants.js";
import { createToken } from "../utils/token-manager.js";
import { Student } from "../interfaces/student.js";

export const getAllStudents = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const [students] = await connection.promise().query<Student[]>("SELECT * FROM student");
        return res.status(200).json({ message: "OK", students });
    } catch (err) {
        console.log(err);
        return res.status(200).json({ message: "Error", error: err.message });
    }
}

export const studentLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = req.body;
        const [existingStudent] = await connection.promise().query<Student[]>("SELECT * FROM student WHERE Email = ?", [email]);

        // Check if student is present in DB
        if (!existingStudent || existingStudent.length === 0)
            return res.status(200).json({ message: "ERROR", cause: "Student does not exist" });

        const isPasswordCorrect = await compare(password, existingStudent[0].Password);
        if (!isPasswordCorrect)
            return res.status(403).send("Incorrect password...");

        // Remove any existing cookies
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: process.env.DOMAIN,
            signed: true,
            path: "/"
        });

        // Create a token for the Student and store cookie
        const token = createToken(existingStudent[0].Student_id, existingStudent[0].Email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);

        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: process.env.DOMAIN,
            expires,
            httpOnly: true,
            signed: true
        });

        return res.status(201).json({ message: "OK", name: existingStudent[0].Student_Name, email: existingStudent[0].Email });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
}

export const verifyStudent = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const [Student] = await connection.promise().query<Student[]>('SELECT * FROM student WHERE Student_id = ?', [res.locals.jwtData.id]);

        if (!Student[0])
            return res.status(401).send("Student not registered or Token malfunction...");


        if (Student[0].Student_id !== res.locals.jwtData.id)
            return res.status(401).send("Permissions did not match...");

        return res.status(200).json({ message: "OK", name: Student[0].Student_Name, email: Student[0].Email });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
}

export const studentLogout = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const [Student] = await connection.promise().query<Student[]>("SELECT * FROM student WHERE Student_id = ?", [res.locals.jwtData.id]);

        if (!Student[0])
            return res.status(401).send("Student not registered or Token malfunction...");

        if (Student[0].Student_id !== res.locals.jwtData.id)
            return res.status(401).send("Permissions did not match...");

        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: process.env.DOMAIN,
            signed: true,
            path: "/"
        });

        return res.status(200).json({ message: "OK", name: Student[0].Student_Name, email: Student[0].Email });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message })
    }
}