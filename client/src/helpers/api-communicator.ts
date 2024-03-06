import axios from "axios";
// import { Student } from "../interfaces/Student";
import { AdminRecords, StudentRecords } from "../interfaces/Records";

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

export const userLogout = async (type: string) => {
    const res = await axios.get(`${type}/logout`);

    if (res.status !== 200)
        throw new Error("Unable to logout");

    const data = await res.data;
    return data;
}

export const fileUpload = async (formData: FormData, type: string | undefined) => {
    const res = await axios.post(`${type}/file-upload`, formData);

    if (res.status !== 201)
        throw new Error("Unable to send file");

    const data = await res.data;
    return data;
}

export const fetchData = async (type: string | undefined) => {
    let res = null;
    if (type === 'admin')
        res = await axios.get<{ records: AdminRecords[] }>(`admin/get-all-records`);

    if (type === 'teacher')
        res = await axios.get<{ records: StudentRecords[] }>(`teacher/get-class-records`);

    const data = res?.data.records;
    return data;
}