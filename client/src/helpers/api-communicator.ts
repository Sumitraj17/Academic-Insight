import axios from "axios"

// type User = {
//     name: string;
//     email: string;
//     type: "ADMIN" | "TEACHER" | "STUDENT";
// }

export const checkAuthStatus = async () => { //add user after changing db
    const res = await axios.get(`teacher/auth-status`);

    if (res.status !== 200)
        throw new Error("[AUTHENTICATION_ERROR] Unable to authenticate user...");

    const data = await res.data;
    return data;
}

export const userLogin = async (email: string, password: string) => { //add user after changing db
    const res = await axios.post(`teacher/login`, { email, password });

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