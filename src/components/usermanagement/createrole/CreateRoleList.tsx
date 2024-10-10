"use client"
import React, { useState } from 'react';
import { Checkbox, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, TextField } from '@mui/material';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
import { toast } from 'react-toastify';

// Define the structure of the data
interface Data {
    id: number;
    role: string;
    description: string;
    protein: number;
}

// Sample data
const rows: Data[] = [
    { id: 1, role: 'Owener', description: 'The owner can control all the access', protein: 4.3 },
    { id: 2, role: 'Super Admin', description: 'The Supper admin can control all the access', protein: 4.3 },
    { id: 3, role: 'Admin', description: 'The admin can control all the access', protein: 4.3 },
    { id: 4, role: 'Manager', description: 'Manager has specific access', protein: 4.3 },
    { id: 5, role: 'Supervisor', description: 'Supervisor has little access', protein: 4.3 },
    { id: 6, role: 'Biller', description: 'Biller has limited access', protein: 4.3 },
    { id: 7, role: 'Biller', description: 'Biller has limited access', protein: 4.3 },
    { id: 8, role: 'Staff', description: 'Staff has specific access', protein: 4.3 },
    { id: 9, role: 'Biller', description: 'Biller has limited access', protein: 4.3 },
];

const CreateRoleList = () => {

    // State variables
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selected, setSelected] = useState<number[]>([]);
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<keyof Data>('id');

    // Handlers for pagination
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Handlers for sorting
    const handleRequestSort = (property: keyof Data) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    // Handler for selecting/deselecting all items
    const handleSelectAllClick = (checked: boolean) => {
        if (checked) {
            setSelected(rows.map((row) => row.id));
        } else {
            setSelected([]);
        }
    };

    // Handler for selecting/deselecting a single item
    const handleClick = (id: number) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: number[] = [];

        if (selectedIndex === -1) {
            newSelected = [...selected, id];
        } else if (selectedIndex === 0) {
            newSelected = selected.slice(1);
        } else if (selectedIndex === selected.length - 1) {
            newSelected = selected.slice(0, -1);
        } else if (selectedIndex > 0) {
            newSelected = [
                ...selected.slice(0, selectedIndex),
                ...selected.slice(selectedIndex + 1),
            ];
        }

        setSelected(newSelected);
    };

    // Check if a particular item is selected
    const isSelected = (id: number) => selected.indexOf(id) !== -1;

    // Function to sort data
    const sortedRows = rows.slice().sort((a, b) => {
        const isAsc = order === 'asc';
        if (a[orderBy] < b[orderBy]) {
            return isAsc ? -1 : 1;
        }
        if (a[orderBy] > b[orderBy]) {
            return isAsc ? 1 : -1;
        }
        return 0;
    });

    const [role, setRole] = useState('');
    const [description, setDescription] = useState('');
    //handle role data
    const handleRoleData = (e: any) => {
        e.preventDefault();
        try {
            toast.success("Role Created successfully!");
            setRole('');
            setDescription('');
        } catch {
            toast.error("Failed to create Role. Please try again later.");
        }

    }


    return (
        <>
            <div className="inventual-content-area px-4 sm:px-7">
                <div className="inventual-createrole-area bg-white p-5 sm:p-7 custom-shadow rounded-8 mt-7">
                    <div className="grid grid-cols-12 gap-y-7 sm:gap-7">
                        <div className="col-span-12 lg:col-span-6">
                            <form onSubmit={handleRoleData}>
                                <div className="grid grid-cols-12 gap-y-7 sm:gap-7">
                                    <div className="col-span-12">
                                        <div className="inventual-form-field">
                                            <h5>Role</h5>
                                            <div className="inventual-input-field-style">
                                                <input
                                                    required
                                                    value={role}
                                                    onChange={(e) => setRole(e.target.value)}
                                                    type="name"
                                                    placeholder='Admin'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <div className="inventual-select-field">
                                            <div className="inventual-form-field">
                                                <h5>Description</h5>
                                                <div className="inventual-input-field-style">
                                                    <input
                                                        required
                                                        value={description}
                                                        onChange={(e) => setDescription(e.target.value)}
                                                        type="text"
                                                        placeholder='The admin can control all the access'
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <button type="submit" className="inventual-btn
                                            ">Create Now</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-span-12 lg:col-span-6">
                            <div className="inventual-common-mat-list w-full mt-0.5">
                                <div className='w-full'>
                                    <Paper sx={{ width: '100%', mb: 2 }}>
                                        {/* Table container */}
                                        <TableContainer>
                                            <Table aria-label="enhanced table" size="medium">
                                                {/* Table head */}
                                                <TableHead className='bg-lightest'>
                                                    <TableRow>
                                                        {/* Checkbox for select all */}
                                                        <TableCell>
                                                            <Checkbox
                                                                indeterminate={selected.length > 0 && selected.length < rows.length}
                                                                checked={rows.length > 0 && selected.length === rows.length}
                                                                onChange={(e) => handleSelectAllClick(e.target.checked)}
                                                            />
                                                        </TableCell>
                                                        {/* Table headers */}
                                                        <TableCell>
                                                            <TableSortLabel
                                                                active={orderBy === 'role'}
                                                                direction={orderBy === 'role' ? order : 'asc'}
                                                                onClick={() => handleRequestSort('role')}
                                                            >
                                                                role
                                                            </TableSortLabel>
                                                        </TableCell>
                                                        <TableCell>
                                                            <TableSortLabel
                                                                active={orderBy === 'description'}
                                                                direction={orderBy === 'description' ? order : 'asc'}
                                                                onClick={() => handleRequestSort('description')}
                                                            >
                                                                Description
                                                            </TableSortLabel>
                                                        </TableCell>
                                                        <TableCell>
                                                            <TableSortLabel
                                                                active={orderBy === 'protein'}
                                                                direction={orderBy === 'protein' ? order : 'asc'}
                                                                onClick={() => handleRequestSort('protein')}
                                                            >
                                                                Action
                                                            </TableSortLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {sortedRows
                                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                        .map((row) => (
                                                            <TableRow
                                                                key={row.id}
                                                                hover
                                                                onClick={() => handleClick(row.id)}
                                                                role="checkbox"
                                                                aria-checked={isSelected(row.id)}
                                                                selected={isSelected(row.id)}
                                                            >
                                                                <TableCell>
                                                                    <Checkbox checked={isSelected(row.id)} />
                                                                </TableCell>
                                                                <TableCell>{row.role}</TableCell>
                                                                <TableCell>{row.description}</TableCell>
                                                                <TableCell>
                                                                    <div className="inventual-list-action-style">
                                                                        <PopupState variant="popover">
                                                                            {(popupState: any) => (
                                                                                <React.Fragment>
                                                                                    <button className='' type='button' {...bindTrigger(popupState)}>
                                                                                        Action <i className="fa-sharp fa-solid fa-sort-down"></i>
                                                                                    </button>
                                                                                    <Menu {...bindMenu(popupState)}>
                                                                                        <MenuItem onClick={popupState.close}><i className="fa-regular fa-pen-to-square"></i>Edit</MenuItem>
                                                                                        <MenuItem onClick={popupState.close}><i className="fa-light fa-trash-can"></i> Delete</MenuItem>
                                                                                    </Menu>
                                                                                </React.Fragment>
                                                                            )}
                                                                        </PopupState>
                                                                    </div>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        {/* Pagination */}
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25]}
                                            component="div"
                                            count={rows.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                        />
                                    </Paper>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateRoleList;