import axios from "axios";
import { Student } from "../interfaces/Student";

// type User = {
//     name: string;
//     email: string;
//     type: "ADMIN" | "TEACHER" | "STUDENT";
// }

export const checkAuthStatus = async (type: string) => { //add user after changing db
    const res = await axios.get(`${type}/auth-status`);

    if (res.status !== 200)
        throw new Error("[AUTHENTICATION_ERROR] Unable to authenticate user...");

    const data = await res.data;
    return data;
}

export const userLogin = async (type: string, email: string, password: string) => { //add user after changing db
    const res = await axios.post(`${type}/login`, { email, password });

    if (res.status !== 201)
        throw new Error("Unable to login...");

    const data = await res.data;
    return data;
}

export const userLogout = async () => {
    const res = await axios.get('teacher/logout');

    if (res.status !== 200)
        throw new Error("Unable to logout");

    const data = await res.data;
    return data;
}

export const fileUploadTeacher = async (formData: FormData) => {
    const res = await axios.post('/teacher/upload-file', formData);

    if (res.status !== 201)
        throw new Error("Unable to send file");

    const data = await res.data;
    return data;
}

export const fetchData = async () => {
    const res = await axios.get<{ students: Student[] }>("/teacher/get-marks");
    const data = res.data.students;
    return data;
}