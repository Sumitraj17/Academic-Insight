import { Request, Response, NextFunction } from "express";
import { connection } from "../db/db-connection.js";
import { compare } from "bcrypt";
import { COOKIE_NAME } from "../utils/constants.js";
import { createToken } from "../utils/token-manager.js";
import { Admin } from "../interfaces/admin.js";
import { Teacher } from "../interfaces/teacher.js";
import { Student } from "../interfaces/student.js";
import insertionData from "./db-controller.js";

export const getAllAdmins = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const [admins] = await connection
      .promise()
      .query<Admin[]>("SELECT * FROM teacher WHERE isAdmin = true");
    return res.status(200).json({ message: "OK", admins });
  } catch (err) {
    console.log(err);
    return res.status(200).json({ message: "Error", error: err.message });
  }
};

export const getAllTeachers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const [teachers] = await connection
      .promise()
      .query<Teacher[]>("SELECT * FROM teacher WHERE isAdmin = false");
    return res.status(200).json({ message: "OK", teachers });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "Error", error: error.message });
  }
};

export const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const [students] = await connection
      .promise()
      .query<Student[]>("SELECT * FROM student");
    return res.status(200).json({ message: "OK", students });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "Error", error: error.message });
  }
};

export const getAllRecords = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const [records] = await connection
      .promise()
      .query("SELECT * FROM Admin_display");

    return res.status(200).json({ message: "OK", records });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "Error", error: error.message });
  }
};

export const fileUpload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const file = req.file;
    const type = req.body.filetype;
    
    //insert into the selected type.
    if (type == "teacher") insertionData.teacherWrite(file);
    else if (type == "student") insertionData.studentWrite(file);
    else if (type == "marks") insertionData.studentRecords(file);
    else if (type == "course") insertionData.courseData(file);

    if (!file) return res.status(400).json({ message: "No file uploaded" });
    return res.status(201).json({ message: "File uploaded successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error uploading file", error: error.message });
  }
};

export const getClassRecords = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const [records] = await connection
      .promise()
      .query("CALL DisplayStudentRecordsForTeacher(2, '5A', 'CS101')");
    console.log(records[0]);

    return res.status(200).json({ message: "OK", records: records[0] });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "Error", error: error.message });
  }
};

export const adminLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const [existingAdmin] = await connection
      .promise()
      .query<Admin[]>("SELECT * FROM teacher WHERE Email = ?", [email]);

    // Check if user is present in DB
    if (!existingAdmin || existingAdmin.length === 0)
      return res
        .status(200)
        .json({ message: "ERROR", cause: "Admin does not exist" });

    // const isPasswordCorrect = await compare(password, existingAdmin[0].Password);
    const isPasswordCorrect = password === existingAdmin[0].password;
    if (!isPasswordCorrect)
      return res.status(403).send("Incorrect password...");

    if (!existingAdmin[0].isAdmin)
      return res.status(403).send("Not an Admin...");
    // Remove any existing cookies
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: process.env.DOMAIN,
      signed: true,
      path: "/",
    });

    // Create a token for the admin and store cookie
    // console.log(existingAdmin[0]);
    const token = createToken(
      existingAdmin[0].teacher_id,
      existingAdmin[0].email,
      "7d"
    );
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: process.env.DOMAIN,
      expires,
      httpOnly: true,
      signed: true,
    });

    return res.status(201).json({
      message: "OK",
      name: existingAdmin[0].teacher_Name,
      email: existingAdmin[0].email,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const verifyAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const [admin] = await connection
      .promise()
      .query<Admin[]>("SELECT * FROM teacher WHERE Teacher_id = ?", [
        res.locals.jwtData.id,
      ]);

    if (!admin[0])
      return res
        .status(401)
        .send("Admin not registered or Token malfunction...");

    if (admin[0].teacher_id !== res.locals.jwtData.id)
      return res.status(401).send("Permissions did not match...");

    console.log("Verified Admin");
    return res.status(200).json({
      message: "OK",
      name: admin[0].teacher_Name,
      email: admin[0].email,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const adminLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const [admin] = await connection
      .promise()
      .query<Admin[]>("SELECT * FROM teacher WHERE Teacher_id = ?", [
        res.locals.jwtData.id,
      ]);

    if (!admin[0])
      return res
        .status(401)
        .send("Admin not registered or Token malfunction...");

    if (admin[0].teacher_id !== res.locals.jwtData.id)
      return res.status(401).send("Permissions did not match...");

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: process.env.DOMAIN,
      signed: true,
      path: "/",
    });

    return res.status(200).json({
      message: "OK",
      name: admin[0].teacher_Name,
      email: admin[0].email,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};
