import { Teacher } from "./teacher.js";

export interface Admin extends Teacher {
    Admin_id: string;
    Admin_Name: string;
    Password: string;
    Email: string;
    Phone_Number: string;
    isAdmin: string;
}