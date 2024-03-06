import {
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Skeleton,
} from "@mui/material";
import { AdminColumn, TeacherColumn } from "../interfaces/Columns";
import { useState } from "react";

const SkeletonLoader = ({ columns }: { columns: readonly AdminColumn[] | readonly TeacherColumn[] }) => {
    const [rowsPerPage] = useState(10);
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
                                {columns.map((column) => (
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

export default SkeletonLoader;