"use client"
import React, { useRef, useState } from 'react';
import { Menu, MenuItem, } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,

} from '@mui/material';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
import { toast } from 'react-toastify';

// Define the structure of the data
interface Data {
    id: number;
    name: string;
    shortName: string;
    protein: string;
    calories: string;
}

// Sample data
const rows: Data[] = [
    {
        id: 1,
        name: 'Kilogram',
        shortName: 'kg',
        protein: '',
        calories: '',
    },
    {
        id: 2,
        name: 'Centimeter',
        shortName: 'cm',
        protein: '',
        calories: '',
    },
    {
        id: 3,
        name: 'Quantity',
        shortName: 'qty',
        protein: '',
        calories: '',
    },
    {
        id: 4,
        name: 'Gram',
        shortName: 'g',
        protein: '',
        calories: '',
    },
    {
        id: 5,
        name: 'Dozen',
        shortName: 'pc',
        protein: '',
        calories: '',
    },
    {
        id: 6,
        name: 'Dozen',
        shortName: 'mm',
        protein: '',
        calories: '',
    },
    {
        id: 7,
        name: 'Yard',
        shortName: 'y',
        protein: '',
        calories: '',
    },
    {
        id: 8,
        name: 'Milliliter',
        shortName: 'ml',
        protein: '',
        calories: '',
    },
    // Add more rows here...
];

const UnitList = () => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selected, setSelected] = useState<number[]>([]);
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<keyof Data>('id');

    const dummyData = (e: any) => {
        e.preventDefault();
    };

    // Component for rendering the table

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

    //hanle reset unit form
    const unitNameRef = useRef<HTMLInputElement>(null);
    const unitShortNameRef = useRef<HTMLInputElement>(null);
    const handleUnitList = (event:any) => {
        event.preventDefault();
        try{
            toast.success("Product unit created successfuly!")
            if(unitNameRef.current){
                unitNameRef.current.value = '';
            }
            if(unitShortNameRef.current){
                unitShortNameRef.current.value = '';
            }
        }catch{
            toast.error("Failed to create product create. Please try again later.")
        }
    }

    return (
        <>
            <div className="inventual-content-area px-4 sm:px-7">
                <div className="inventual-product-unit-area bg-white p-5 sm:p-7 custom-shadow rounded-8 mt-7">
                    <div className="grid grid-cols-12 gap-7 maxSm:gap-x-0">
                        <div className="col-span-12 lg:col-span-4">
                            <form onSubmit={handleUnitList}>
                                <div className="grid grid-cols-12 gap-7 maxSm:gap-x-0">
                                    <div className="col-span-12 md:col-span-6 lg:col-span-12">
                                        <div className="inventual-select-field">
                                            <div className="inventual-form-field">
                                                <h5>Name</h5>
                                                <div className="inventual-input-field-style">
                                                    <input ref={unitNameRef} type="text" placeholder='Kilogram' required/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6 lg:col-span-12">
                                        <div className="inventual-select-field">
                                            <div className="inventual-form-field">
                                                <h5>Short Name</h5>
                                                <div className="inventual-input-field-style">
                                                    <input ref={unitShortNameRef} type="text" placeholder='kg' required/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <button type="submit" className='inventual-btn'>Create Value</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-span-12 lg:col-span-8">
                            <div className="inventual-common-mat-list w-full mt-0.5">
                                <div className='w-full'>
                                    <Paper sx={{ width: '100%', mb: 2 }}>
                                        <TableContainer>
                                            <Table aria-label="enhanced table" size="medium">
                                                <TableHead className='bg-lightest'>
                                                    <TableRow>
                                                        <TableCell>
                                                            <Checkbox
                                                                indeterminate={selected.length > 0 && selected.length < rows.length}
                                                                checked={rows.length > 0 && selected.length === rows.length}
                                                                onChange={(e) => handleSelectAllClick(e.target.checked)}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <TableSortLabel
                                                                active={orderBy === 'name'}
                                                                direction={orderBy === 'name' ? order : 'asc'}
                                                                onClick={() => handleRequestSort('name')}
                                                            >
                                                                Name
                                                            </TableSortLabel>
                                                        </TableCell>
                                                        <TableCell>
                                                            <TableSortLabel
                                                                active={orderBy === 'shortName'}
                                                                direction={orderBy === 'shortName' ? order : 'asc'}
                                                                onClick={() => handleRequestSort('shortName')}
                                                            >
                                                                Short Name
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
                                                                <TableCell>{row.name}</TableCell>
                                                                <TableCell>{row.shortName}</TableCell>
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

export default UnitList;