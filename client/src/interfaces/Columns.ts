export interface TeacherColumn {
    id: "usn" | "student_Name" | "semsec" | "course_id" | "course_name" | "Ia1_score" | "Ia2_score" | "Ia3_score" | "Lab_Or_Quiz" | "Assignment_Marks" | "Final_Marks" | "Final_Ia" | "Classes_Held" | "Classes_Attended" | "Attendance_percentage";
    label: string;
    minWidth?: number;
    align?: "center";
    format?: (value: number) => string;
}

export interface AdminColumn {
    id: "USN" | "Sub_Code" | "Subject" | "Class" | "IA1" | "IA2" | "IA3" | "Final_Marks" | "Attendance";
    label: string;
    minWidth?: number;
    align?: "center";
    format?: (value: number) => string;
}