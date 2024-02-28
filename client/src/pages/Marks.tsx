import { useQuery } from '@tanstack/react-query';
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, Skeleton, Typography } from "@mui/material";
import { useState } from "react";
import { fetchData } from '../helpers/api-communicator';

const SkeletonLoader = ({ rowsPerPage }: { rowsPerPage: number }) => {
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
                                {columns.map(column => (
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
                                    {columns.map(column => (
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

interface StudentColumn {
    id: "USN" | "Name" | "Semester" | "Email" | "Phone" | "Parent_Phone";
    label: string;
    minWidth?: number;
    align?: "center";
    format?: (value: number) => string;
}

const columns: readonly StudentColumn[] = [
    { id: "USN", label: "USN", minWidth: 100, align: "center" },
    { id: "Name", label: "Name", minWidth: 100, align: "center" },
    { id: "Semester", label: "Semester", minWidth: 100, align: "center" },
    { id: "Email", label: "Email", minWidth: 100, align: "center" },
    { id: "Phone", label: "Phone", minWidth: 100, align: "center" },
    { id: "Parent_Phone", label: "Parent Phone", minWidth: 100, align: "center" }
];

const Marks = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ['students'],
        queryFn: fetchData,
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
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky-table">
                            <TableHead>
                                <TableRow>
                                    {columns.map(column => (
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
                                {data
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map(row => (
                                        <TableRow hover role='checkbox' tabIndex={-1} key={row.Email}>
                                            {columns.map((column) => {
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
                                    ))
                                }
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
