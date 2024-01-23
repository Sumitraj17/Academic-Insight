import { Request, Response, NextFunction } from "express";
import { connection } from "../db/db-connection.js";
import { compare, hash } from "bcrypt";
import { COOKIE_NAME } from "../utils/constants.js";
import { createToken } from "../utils/token-manager.js";
import { Teacher } from "../interfaces/teacher.js";

export const getAllUsers = async (
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

export const userSignup = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id, name, email, password, phoneNumber } = req.body;
        const [existingTeacher] = await connection.promise().query<Teacher[]>("SELECT * FROM teacher WHERE Teacher_id = ?", [id]);

        if (existingTeacher.length > 0)
            return res.status(401).json({ message: "ERROR", cause: "Teacher already exists" });

        // Hash the password before storing in DB
        const hashedPassword = await hash(password, 3);
        await connection.promise().query("INSERT INTO teacher (Teacher_id, Teacher_Name, Email, Password, Phone_number) VALUES (?, ?, ?, ?, ?)", [id, name, email, hashedPassword, phoneNumber]);

        const newTeacher = {
            Teacher_id: id,
            Teacher_Name: name,
            Email: email,
            Password: hashedPassword,
            Phone_Number: phoneNumber
        }

        // Remove any existing cookies
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: process.env.DOMAIN,
            signed: true,
            path: "/"
        });

        // Create a token for the teacher and store cookie
        const token = createToken(newTeacher.Teacher_id, newTeacher.Email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);

        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: process.env.DOMAIN,
            expires,
            httpOnly: true,
            signed: true
        });

        return res.status(201).json({ message: "OK", name: newTeacher.Teacher_Name, email: newTeacher.Email });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
}

export const userLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = req.body;
        const [existingTeacher] = await connection.promise().query<Teacher[]>("SELECT * FROM teacher WHERE Email = ?", [email]);

        // Check if user is present in DB
        if (!existingTeacher || existingTeacher.length === 0)
            return res.status(200).json({ message: "ERROR", cause: "Teacher does not exist" });
    
        const isPasswordCorrect = await compare(password, existingTeacher[0].password);
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

export const verifyUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const [user] = await connection.promise().query<Teacher[]>('SELECT * FROM teacher WHERE Teacher_id = ?', [res.locals.jwtData.id]);

        if (!user[0])
            return res.status(401).send("User not registered or Token malfunction...");


        if (user[0].Teacher_id !== res.locals.jwtData.id)
            return res.status(401).send("Permissions did not match...");

        return res.status(200).json({ message: "OK", name: user[0].Teacher_Name, email: user[0].Email });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
}

export const userLogout = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const [user] = await connection.promise().query<Teacher[]>("SELECT * FROM teacher WHERE Teacher_id = ?", [res.locals.jwtData.id]);

        if (!user[0])
            return res.status(401).send("User not registered or Token malfunction...");

        if (user[0].Teacher_id !== res.locals.jwtData.id)
            return res.status(401).send("Permissions did not match...");

        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: process.env.DOMAIN,
            signed: true,
            path: "/"
        });

        return res.status(200).json({ message: "OK", name: user[0].Teacher_Name, email: user[0].Email });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message })
    }
}