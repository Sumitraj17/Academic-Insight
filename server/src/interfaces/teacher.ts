import { RowDataPacket } from "mysql2";

export interface Teacher extends RowDataPacket {
    teacher_id: string;
    teacher_name: string;
    password: string;
    email: string;
    phone_Number: string;
    isAdmin: boolean;
}