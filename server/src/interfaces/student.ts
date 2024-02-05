import { RowDataPacket } from "mysql2";

export interface Student extends RowDataPacket {
    Student_id: string;
    Student_Name: string;
    Password: string;
    Email: string;
    Phone_Number: string;
}