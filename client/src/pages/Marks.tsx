import { useQuery } from '@tanstack/react-query';
import { Typography } from "@mui/material";
import { fetchData } from '../helpers/api-communicator';
import { useAuth } from '../context/auth-context';
import { AdminColumn, TeacherColumn } from '../interfaces/Columns';
import SkeletonLoader from '../components/SkeletonLoader';
import CustomTable from '../components/shared/CustomTable';
import SideBar from '../components/SideBar';

const adminColumns: readonly AdminColumn[] = [
    { id: "USN", label: "USN", minWidth: 100, align: "center" },
    { id: "Sub_Code", label: "Subject Code", minWidth: 100, align: "center" },
    { id: "Subject", label: "Subject", minWidth: 100, align: "center" },
    { id: "Class", label: "Class", minWidth: 100, align: "center" },
    { id: "IA1", label: "IA-1", minWidth: 100, align: "center" },
    { id: "IA2", label: "IA-2", minWidth: 100, align: "center" },
    { id: "IA3", label: "IA-3", minWidth: 100, align: "center" },
    { id: "Final_Ia", label: "Average IA", minWidth: 100, align: "center" },
    { id: "Attendance", label: "Attendance", minWidth: 100, align: "center" },
];

const teacherColumns: readonly TeacherColumn[] = [
    { id: "usn", label: "USN", minWidth: 100, align: "center" },
    { id: "student_Name", label: "Name", minWidth: 100, align: "center" },
    { id: "semsec", label: "Class", minWidth: 100, align: "center" },
    { id: "course_id", label: "Course ID", minWidth: 100, align: "center" },
    { id: "course_name", label: "Course Name", minWidth: 100, align: "center" },
    { id: "Ia1_score", label: "IA-1", minWidth: 100, align: "center" },
    { id: "Ia2_score", label: "IA-2", minWidth: 100, align: "center" },
    { id: "Ia3_score", label: "IA-3", minWidth: 100, align: "center" },
    { id: "Final_Ia", label: "Average IA", minWidth: 100, align: "center" },
    { id: "Lab_Or_Quiz", label: "Lab/Quiz", minWidth: 100, align: "center" },
    { id: "Assignment_Marks", label: "Assignment", minWidth: 100, align: "center" },
    { id: "Final_Marks", label: "Final IA", minWidth: 100, align: "center" },
    { id: "Classes_Attended", label: "Attended", minWidth: 100, align: "center" },
    { id: "Classes_Held", label: "Held", minWidth: 100, align: "center" },
    { id: "Attendance_percentage", label: "Attendance%", minWidth: 100, align: "center" },
];

const Marks = () => {
    const auth = useAuth();
    const { isPending, error, data } = useQuery({
        queryKey: ['records'],
        queryFn: () => fetchData(auth?.type),
    });

    return (
        <>
            <SideBar />
            <Typography variant="h4" gutterBottom component="div">
                User: {auth?.type === 'teacher' ? auth?.user?.name : 'Admin'} <br />
                Student Details
            </Typography>
            {isPending && (auth?.type === 'admin' ? (
                <SkeletonLoader columns={adminColumns} />
            ) :
                <SkeletonLoader columns={teacherColumns} />
            )}
            {error && <div>{error.message}</div>}
            {data && (auth?.type === 'admin' ? (
                <CustomTable data={data} columns={adminColumns} />
            ) :
                <CustomTable data={data} columns={teacherColumns} />
            )}
        </>
    );
}

export default Marks;
