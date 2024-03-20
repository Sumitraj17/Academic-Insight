import {
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
    Select,
    SelectChangeEvent,
    MenuItem,
    IconButton,
    TextField,
    Box,
} from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import { useState } from "react";
import { AdminColumn, TeacherColumn } from "../../interfaces/Columns";
import { AdminRecords, StudentRecords } from "../../interfaces/Records";
import { useAuth } from "../../context/auth-context";

interface CustomTableProps {
    data: StudentRecords[] | AdminRecords[],
    columns: readonly AdminColumn[] | readonly TeacherColumn[]
}

const CustomTable = ({ data, columns }: CustomTableProps) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filterOption, setFilterOption] = useState("");
    const [searchQuery, setSearchQuery] = useState("");


    const auth = useAuth();

    const handlePageChange = (_: unknown, newPage: number) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    const handleFilterChange = (event: SelectChangeEvent<string>) => {
        setFilterOption(event.target.value as string);
        setPage(0);
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setPage(0);
    };

    const applyFilter = (row: any) => {
        if (!filterOption) return true;

        const filterConditions: Record<string, (row: any) => boolean> = {
            'final_marks_lt_20': (row) => row.Final_Marks < 20,
            'attendance_lt_85': (row) => auth?.type === 'admin' ? row.Attendance < 85 : row.Attendance_percentage < 85,
            'final_marks_gt_40': (row) => row.Final_Marks > 40,
            'attendance_gt_85': (row) => auth?.type === 'admin' ? row.Attendance > 85 : row.Attendance_percentage > 85,
        };

        const filterCondition = filterConditions[filterOption];
        return filterCondition ? filterCondition(row) : true;
    };

    const applySearch = (row: any) => {
        if (!searchQuery) return true;

        return Object.values(row).some(
            (value) => value && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const filteredData = data.filter((row) => applyFilter(row) && applySearch(row));

    return (
        <>
            <Paper sx={{
                width: '100%',
                overflow: 'hidden'
            }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "end", mr: '3rem' }}>
                    <IconButton sx={{ mr: '1.5rem', mt: '6px' }}>
                        <FilterListIcon />
                        <Select
                            value={filterOption}
                            onChange={handleFilterChange}
                            variant="outlined"
                            style={{
                                opacity: 0,
                                position: "absolute",
                            }}
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="final_marks_lt_20">Final Marks &lt; 20</MenuItem>
                            <MenuItem value="final_marks_gt_40">Final Marks &gt; 40</MenuItem>
                            <MenuItem value="attendance_lt_85">Attendance &lt; 85</MenuItem>
                            <MenuItem value="attendance_gt_85">Attendance &gt; 85</MenuItem>
                        </Select>
                    </IconButton>
                    <TextField
                        label="Search"
                        variant="standard"
                        size="small"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        sx={{}}
                    />
                </Box>
                <TableContainer sx={{ maxHeight: 380 }}>
                    <Table
                        stickyHeader
                        aria-label="sticky-table"
                    >
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
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
                            {filteredData
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row: any) => (
                                    <TableRow hover role='checkbox' tabIndex={-1} key={row.usn}>
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
                    rowsPerPageOptions={[5, 10, 20]}
                    component="div"
                    count={filteredData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper >
        </>
    )
}

export default CustomTable;