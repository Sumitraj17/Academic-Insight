import { RowDataPacket } from "mysql2";

export interface Teacher extends RowDataPacket {
    Teacher_id: string;
    Teacher_Name: string;
    Password: string;
    Email: string;
    Phone_Number: string;
}