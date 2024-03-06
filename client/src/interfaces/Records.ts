export interface StudentRecords {
    usn: string;
    student_Name: string;
    semsec: string;
    course_id: string;
    Ia1_score: number;
    Ia2_score: number;
    Ia3_score: number;
    Lab_Or_Quiz: number;
    Assignment_Marks: number;
    Final_Marks: number;
    Final_Ia: number;
    Classes_Held: number;
    Classes_Attended: number;
    Attendance_percentage: number;
}

export interface AdminRecords {
    USN: string;
    Sub_Code: string;
    Subject: string;
    Class: string;
    IA1: number;
    IA2: number;
    IA3: number;
    Final_Ia: number;
    Attendance: number;
}