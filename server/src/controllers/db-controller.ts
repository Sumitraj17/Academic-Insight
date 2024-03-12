import xlsx from "xlsx";
import { connection } from "../db/db-connection.js";

const insertionData = {
    studentWrite: async (file: any) => {
        const worksheet = xlsx.readFile(file.path);
        const data = xlsx.utils.sheet_to_json(worksheet.Sheets["student_data"]);

        const values = data.map((item) => [
            item["usn"],
            item["student_Name"],
            item["semsec"],
            item["email"],
            item["phone_number"],
            item["parent_number"],
        ]);

        console.log(values);
        const insert =
            "Insert into student(usn, student_Name, semsec, email, phone_number,parent_number) values ?";

        await connection.promise().query(insert, [values]);
    },

    teacherWrite: async (file: any) => {
        const worksheet = xlsx.readFile(file.path);
        const data = xlsx.utils.sheet_to_json(worksheet.Sheets["teacher_data"]);

        const values = data.map((item) => [
            item["teacher_id"],
            item["teacher_name"],
            item["password"],
            item["email"],
            item["phone_no"],
            item["isAdmin"],
        ]);
        const insert =
            "insert into teacher(teacher_id,teacher_name,password,email,phone_no,isAdmin) values ?";

        await connection.promise().query(insert, [values]);
    },

    studentRecords: async (file: any) => {
        const worksheet = xlsx.readFile(file.path);
        const data = xlsx.utils.sheet_to_json(
            worksheet.Sheets["student_record_data"]
        );

        const values = data.map((item) => [
            item["usn"],
            item["course_id"],
            item["semsec"],
            item["Ia1_score"],
            item["Ia2_score"],
            item["Ia3_score"],
            item["Assignment_Marks"],
            item["Lab_Or_Quiz"],
            item["Classes_Attended"],
            item["Classes_Held"],
        ]);

        const insert =
            "Insert Into record(usn,course_id,semsec,Ia1_score,Ia2_score,Ia3_score,Assignment_Marks,Lab_Or_Quiz,Classes_Attended,Classes_Held) values ?";

        await connection.promise().query(insert, [values]);
    },

    courseData: async (file: any) => {
        const worksheet = xlsx.readFile(file.path);
        const data = xlsx.utils.sheet_to_json(worksheet.Sheets["course_data"]);

        const values = data.map((item) => [
            item["course_id"],
            item["course_name"],
            item["scheme"],
            item["sem"],
        ]);

        const insert =
            "insert into course(course_id,course_name,scheme,sem) values ?";

        await connection.promise().query(insert, [values]);
    },

    semsecData: async (file: any) => {
        const worksheet = xlsx.readFile(file.path);
        const data = xlsx.utils.sheet_to_json(worksheet.Sheets["sem_section_data"]);

        const values = data.map((item) => [
            item["semsec"],
            item["sem"],
            item["sec"],
        ]);

        const insert =
            "insert into sem_section values ?";

        await connection.promise().query(insert, [values]);
    },

    teacherCourseData: async (file: any) => {
        const worksheet = xlsx.readFile(file.path);
        const data = xlsx.utils.sheet_to_json(worksheet.Sheets["teacher_course_data"]);

        const values = data.map((item) => [
            item["teacher_id"],
            item["course_id"],
            item["semsec"],
        ]);

        const insert =
            "insert into teacher_course values ?";

        await connection.promise().query(insert, [values]);
    },
};

export default insertionData;
