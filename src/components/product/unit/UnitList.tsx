"use client"
import React, { useRef, useState } from 'react';
import { Menu, MenuItem, FormControl, TextField } from '@mui/material';
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
    Typography,
    Modal,
    Box,
    Stack,
    Button,
} from '@mui/material';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
import { useGetAllProductsUnitQuery, useDeleteUnitMutation, useAddUnitMutation } from '@/services/Product/Unit';
import { toast } from 'react-toastify';
import { TUnitInterface } from '@/interFace/interFace';

const UnitList = () => {
    const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
    const [currentPageSize, setCurrentPageSize] = useState(10);
    const [open, setOpen] = React.useState(false);
    const [unit, setUnit] = useState<number>(0);
    const [title, setTitle] = useState("");
    const [shortName, setShortName] = useState("");
    const [selected, setSelected] = useState<number[]>([]);
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<keyof TUnitInterface>('id');
    const [deleteUnit] = useDeleteUnitMutation();
    const [addUnit] = useAddUnitMutation();
    const { data: unitData, error: unitError, isLoading: unitLoading, refetch } = useGetAllProductsUnitQuery({ pageNumber: currentPageNumber, pageSize: currentPageSize });



    // handle pagination 
    const handlePageChange = (event: unknown, newPage: number) => {
        setCurrentPageNumber(newPage);
        refetch();
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentPageSize(parseInt(event.target.value, 10));
        setCurrentPageNumber(1);
        refetch();
    };
    // handle opening delete modal
    const handleOpenDelete = (productId: number) => {
        setUnit(productId);
        setOpen(true);
    };

    // handle closing delete modal
    const handleCloseDelete = () => {
        setOpen(false);
    }
    // handle delete submission
    const handleDelete = async () => {
        if (unit > 0) {
            try {
                await deleteUnit(unit);
                setOpen(false);
                refetch()
            } catch (err) {
                console.error('Error deleting the unit:', err);
            }
        }
    };

    // Handlers for sorting
    const handleRequestSort = (property: keyof TUnitInterface) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };


    // Handler for selecting/deselecting all items
    const handleSelectAllClick = (checked: boolean) => {
        if (checked) {
            setSelected(unitData?.data.map((unit: any) => unit.id));
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
    const sortedRows = unitData?.data.slice().sort((a: any, b: any) => {
        if (!orderBy) return 0;
        const isAsc = order === 'asc';
        const aValue = a[orderBy as keyof TUnitInterface];
        const bValue = b[orderBy as keyof TUnitInterface];
        if (aValue === undefined || bValue === undefined) {
            return 0;
        }
        if (aValue < bValue) {
            return isAsc ? -1 : 1;
        }
        if (aValue > bValue) {
            return isAsc ? 1 : -1;
        }
        return 0;
    });

    //hanle unit form
    const handleUnitList = async (event: any) => {
        event.preventDefault();
        const unitData = { title, shortName }
        try {
            await addUnit(unitData).unwrap();
            toast.success("Unit/Value created successfuly!")
            setTitle("");
            setShortName("");
            refetch();
        }
        catch (error: any) {
            if (error?.data?.message) {
                toast.error(error?.data?.message);
            } else {
                // Fallback error message
                toast.error("Failed to create product create. Please try again later.")
            }
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
                                                <h5>Unit/Value Name</h5>
                                                <div className="inventual-input-field-style">
                                                    <FormControl fullWidth>
                                                        <TextField
                                                            fullWidth
                                                            placeholder="Kilogram*"
                                                            variant="outlined"
                                                            type="text"
                                                            value={title}
                                                            required
                                                            inputProps={{ maxLength: 80 }}
                                                            onChange={(e) => setTitle(e.target.value)}
                                                        />
                                                    </FormControl>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6 lg:col-span-12">
                                        <div className="inventual-select-field">
                                            <div className="inventual-form-field">
                                                <h5>Short Name</h5>
                                                <div className="inventual-input-field-style">
                                                    <FormControl fullWidth>
                                                        <TextField
                                                            fullWidth
                                                            placeholder="Kg*"
                                                            variant="outlined"
                                                            type="text"
                                                            value={shortName}
                                                            required
                                                            inputProps={{ maxLength: 2 }}
                                                            onChange={(e) => setShortName(e.target.value)}
                                                        />
                                                    </FormControl>
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
                                                                indeterminate={selected.length > 0 && selected.length < unitData?.data.length}
                                                                checked={unitData?.data.length > 0 && selected.length === unitData?.data.length}
                                                                onChange={(e) => handleSelectAllClick(e.target.checked)}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <TableSortLabel
                                                                active={orderBy === 'title'}
                                                                direction={orderBy === 'title' ? order : 'asc'}
                                                                onClick={() => handleRequestSort('title')}
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
                                                            <TableSortLabel>
                                                                Action
                                                            </TableSortLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {unitLoading ? (
                                                        <tr>
                                                            <td colSpan={3}>
                                                                <div className="inventual-loading-container">
                                                                    <span className="inventual-loading"></span>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ) : sortedRows?.map((unit: any) => (
                                                        <TableRow
                                                            key={unit.id}
                                                            hover
                                                            onClick={() => handleClick(unit.id)}
                                                            role="checkbox"
                                                            aria-checked={isSelected(unit.id)}
                                                            selected={isSelected(unit.id)}
                                                        >
                                                            <TableCell>
                                                                <Checkbox checked={isSelected(unit.id)} />
                                                            </TableCell>
                                                            <TableCell>{unit.title}</TableCell>
                                                            <TableCell>{unit.shortName}</TableCell>
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
                                                                                    <MenuItem onClick={() => handleOpenDelete(unit.id)}><i className="fa-light fa-trash-can"></i> Delete</MenuItem>
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
                                            component="div"
                                            count={unitData?.totalCount || 0}
                                            rowsPerPage={currentPageSize}
                                            page={currentPageNumber - 1}
                                            onPageChange={(_, newPage) => handlePageChange(null, newPage + 1)}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                        />
                                    </Paper>
                                </div>
                            </div>
                        </div>
                        <Modal open={open} onClose={handleCloseDelete} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    bgcolor: 'background.paper',
                                    border: '2px solid #000',
                                    boxShadow: 24,
                                    zIndex: 9999,
                                    p: 4,
                                }}
                            >
                                <Typography id="modal-modal-title" variant="h6" component="h2">Delete Confirmation</Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}> Are you sure you want to delete this Unit?</Typography>
                                <Stack spacing={2} direction="row">
                                    <Button variant="contained" color="success" onClick={handleCloseDelete}>Cancel</Button>
                                    <Button variant="outlined" color="error" onClick={handleDelete}>Delete</Button>
                                </Stack>
                            </Box>
                        </Modal>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UnitList;