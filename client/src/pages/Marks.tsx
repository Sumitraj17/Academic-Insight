import { useQuery } from '@tanstack/react-query';
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, Skeleton, Typography } from "@mui/material";
import { useState } from "react";
import { fetchData } from '../helpers/api-communicator';
import { useAuth } from '../context/auth-context';

const SkeletonLoader = ({ rowsPerPage }: { rowsPerPage: number }) => {
    const auth = useAuth();
    return (
        <>
            <Paper sx={{
                width: '100%',
                overflow: 'hidden'
            }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky-table">
                        <TableHead>
                            <TableRow>
                                {auth?.type === 'teacher' ? teacherColumns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        <Skeleton variant="text" width={column.minWidth} animation="wave" />
                                    </TableCell>
                                )) : adminColumns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        <Skeleton variant="text" width={column.minWidth} animation="wave" />
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* Render skeletons for the entire table */}
                            {Array.from({ length: rowsPerPage }).map((_, rowIndex) => (
                                <TableRow key={rowIndex}>
                                    {auth?.type === 'teacher' ? teacherColumns.map(column => (
                                        <TableCell key={column.id}>
                                            <Skeleton variant="rectangular" height={40} animation="wave" />
                                        </TableCell>
                                    )) : adminColumns.map(column => (
                                        <TableCell key={column.id}>
                                            <Skeleton variant="rectangular" height={40} animation="wave" />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    )
}

interface TeacherColumn {
    id: "usn" | "student_Name" | "semsec" | "course_id" | "course_name" | "Ia1_score" | "Ia2_score" | "Ia3_score" | "Lab_Or_Quiz" | "Assignment_Marks" | "Final_Marks" | "Final_Ia" | "Classes_Held" | "Classes_Attended" | "Attendance_percentage";
    label: string;
    minWidth?: number;
    align?: "center";
    format?: (value: number) => string;
}

interface AdminColumn {
    id: "USN" | "Sub_Code" | "Subject" | "Class" | "IA1" | "IA2" | "IA3" | "Final_Ia" | "Attendance";
    label: string;
    minWidth?: number;
    align?: "center";
    format?: (value: number) => string;
}

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

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handlePageChange = (_: unknown, newPage: number) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    return (
        <div>
            <Typography variant="h4" gutterBottom component="div">
                User: {auth?.type === 'teacher' ? auth?.user?.name : 'Admin'} <br />
                Student Details
            </Typography>
            {isPending && (
                <SkeletonLoader rowsPerPage={rowsPerPage} />
            )}
            {error && <div>{error.message}</div>}
            {data && (
                <Paper sx={{
                    width: '100%',
                    overflow: 'hidden'
                }}>
                    <TableContainer sx={{ maxHeight: 380 }}>
                        <Table stickyHeader aria-label="sticky-table">
                            <TableHead>
                                <TableRow>
                                    {auth?.type === 'teacher' ? teacherColumns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    )) : adminColumns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* Render actual data when available */}
                                {auth?.type === 'teacher' ?
                                    data
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row: any) => (
                                            <TableRow hover role='checkbox' tabIndex={-1} key={row.usn}>
                                                {teacherColumns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format && typeof value === 'number'
                                                                ? column.format(value)
                                                                : value
                                                            }
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        )) :
                                    data
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row: any) => (
                                            <TableRow hover role='checkbox' tabIndex={-1} key={row.usn}>
                                                {adminColumns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format && typeof value === 'number'
                                                                ? column.format(value)
                                                                : value
                                                            }
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            )}
        </div>
    );
}

export default Marks;
