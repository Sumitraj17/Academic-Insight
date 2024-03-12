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
    const insert =
      "Insert into student(usn,student_Name,semsec,email,phone_number,parent_number) values ? ";
    connection.query(insert, [values], (err, results) => {
      if (err) return err;
    });
  },
  teacherWrite: (file: any) => {
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

    connection.query(insert, [values], (err, result) => {
      if (err) console.log(err);
      else console.log("inserted value");
    });
  },
  studentRecords: (file: any) => {
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
      item["Final_Ia"],
      item["Assignment_Marks"],
      item["Lab_Or_Quiz"],
      item["Final_Marks"],
      item["Classes_Attended"],
      item["Classes_Held"],
      item["Attendance_percentage"],
    ]);
    const insert =
      "Insert Into record(usn,course_id,semsec,Ia1_score,Ia2_score,Ia3_score,Final_Ia,Assignment_Marks,Lab_Or_Quiz,Final_Marks,Classes_Attended,Classes_Held,Attendance_percentage) values ?";
    connection.query(insert, [values], (err, results) => {
      if (err) return err;
    });
  },
  courseData: (file: any) => {
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
    connection.query(insert, [values], (err, result) => {
      if (err) {
        console.log(err);
        return err;
      } else console.log("successful insertion");
    });
  },
};
export default insertionData;
