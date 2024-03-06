import { Request, Response, NextFunction } from "express";
import { connection } from "../db/db-connection.js";
import { compare } from "bcrypt";
import { COOKIE_NAME } from "../utils/constants.js";
import { createToken } from "../utils/token-manager.js";
import { Teacher } from "../interfaces/teacher.js";
import xlsx from "xlsx";
import { Student } from "../interfaces/student.js";

export const getAllStudents = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const [teachers] = await connection.promise().query<Student[]>("SELECT * FROM student");
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

        // const isPasswordCorrect = await compare(password, existingTeacher[0].Password);
        const isPasswordCorrect = password == existingTeacher[0].password;
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
        const token = createToken(existingTeacher[0].teacher_id, existingTeacher[0].email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);

        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: process.env.DOMAIN,
            expires,
            httpOnly: true,
            signed: true
        });

        return res.status(201).json({ message: "OK", name: existingTeacher[0].teacher_name, email: existingTeacher[0].email });
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


        if (teacher[0].teacher_id !== res.locals.jwtData.id)
            return res.status(401).send("Permissions did not match...");

        return res.status(200).json({ message: "OK", name: teacher[0].teacher_name, email: teacher[0].email });
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

        if (teacher[0].teacher_id !== res.locals.jwtData.id)
            return res.status(401).send("Permissions did not match...");

        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: process.env.DOMAIN,
            signed: true,
            path: "/"
        });

        return res.status(200).json({ message: "OK", name: teacher[0].teacher_Name, email: teacher[0].email });
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

export const getClassRecords = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { teacher_id, sem_sec, course_id } = req.query;
        console.log(teacher_id, sem_sec, course_id);

        const [records] = await connection.promise().query(`CALL DisplayStudentRecordsForTeacher(?, ?, ?)`, [teacher_id, sem_sec, course_id]);
        return res.status(200).json({ message: "OK", records: records[0] });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error fetching marks", error: error.message });
    }
}

export const getIndividualRecord = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { usn } = req.params;
        const [record] = await connection.promise().query("SELECT * FROM record WHERE usn = ?", [usn]);
        return res.status(200).json({ message: "OK", records: record[0] });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Errr=or fetching individual record", error: error.message });
    }
}