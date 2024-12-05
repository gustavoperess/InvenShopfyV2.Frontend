"use client"
import React, { useState, useRef, useCallback } from 'react';
import {
    Checkbox,
    Menu,
    MenuItem,
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
    FormControl,
    TextField

} from '@mui/material';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
import { toast } from 'react-toastify';
import { useGetAllRolesQuery, useCreateRoleMutation, useDeleteRoleMutation } from '@/services/Role/Role';
import { TUserInterface } from '@/interFace/interFace';

const CreateRoleList = () => {
    const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
    const [currentPageSize, setCurrentPageSize] = useState(10);
    const [open, setOpen] = React.useState(false);
    const [roleTitle, setRoleTitle] = useState<string>("");
    const [roleDescription, setRoleDescription] = useState<string>("");
    const [role, setRole] = useState<number>(0);
    const formRef = useRef<HTMLFormElement>(null);

    // State variables
    const [selected, setSelected] = useState<number[]>([]);
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<keyof TUserInterface>('id');
    const [deleteRole] = useDeleteRoleMutation();
    const [createRole] = useCreateRoleMutation();
    const { data: roleData, error: roleError, isLoading: roleLoading, refetch } = useGetAllRolesQuery();

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
    const handleOpenDelete = (roleId: number) => {
        setRole(roleId);
        setOpen(true);
    };
    // handle closing delete modal
    const handleCloseDelete = () => {
        setOpen(false);
    }

    // handle delete submission
    const handleDelete = async () => {
        if (role > 0) {
            try {
                await deleteRole(role);
                setOpen(false);
                refetch()
            } catch (err) {
                console.error('Error deleting the Role:', err);
            }
        }
    };
    // Handlers for sorting
    const handleRequestSort = (property: keyof TUserInterface) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    // Handler for selecting/deselecting all items
    const handleSelectAllClick = (checked: boolean) => {
        if (checked) {
            setSelected(roleData?.map((role: any) => role.id));
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
    const sortedRows = roleData?.slice().sort((a: any, b: any) => {
        if (!orderBy) return 0;
        const isAsc = order === 'asc';
        const aValue = a[orderBy as keyof TUserInterface];
        const bValue = b[orderBy as keyof TUserInterface];
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


    //handle role data
    const handleRoleData =  async (e: any) => {
        e.preventDefault();
        const roleDataToSubmit = { roleName: roleTitle, description: roleDescription };
        try {
            await createRole(roleDataToSubmit).unwrap();
            setRoleTitle('');
            setRoleDescription('');
            formRef.current?.reset();
            refetch();
            toast.success("Role Created successfully!");
        } catch (error: any) {
            if (error?.data?.message) {
                toast.error(error?.data?.message);
            } else {
                // Fallback error message
                toast.error("Failed to create role. Please try again later.")
            }
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
                                                <FormControl fullWidth>
                                                    <TextField
                                                        fullWidth
                                                        placeholder="Admin*"
                                                        variant="outlined"
                                                        type="text"
                                                        value={roleTitle}
                                                        required
                                                        inputProps={{ maxLength: 80 }}
                                                        onChange={(e) => setRoleTitle(e.target.value)}
                                                    />
                                                </FormControl>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <div className="inventual-select-field">
                                            <div className="inventual-form-field">
                                                <h5>Description</h5>
                                                <div className="inventual-input-field-style">
                                                    <FormControl fullWidth>
                                                        <TextField
                                                            fullWidth
                                                            placeholder='The admin can control all the access'
                                                            variant="outlined"
                                                            type="text"
                                                            value={roleDescription}
                                                            required
                                                            inputProps={{ maxLength: 80 }}
                                                            onChange={(e) => setRoleDescription(e.target.value)}
                                                        />
                                                    </FormControl>
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
                                                                indeterminate={selected.length > 0 && selected.length < roleData?.length}
                                                                checked={roleData?.length > 0 && selected.length === roleData?.length}
                                                                onChange={(e) => handleSelectAllClick(e.target.checked)}
                                                            />
                                                        </TableCell>
                                                        {/* Table headers */}
                                                        <TableCell>
                                                            <TableSortLabel
                                                                active={orderBy === 'roleTitle'}
                                                                direction={orderBy === 'roleTitle' ? order : 'asc'}
                                                                onClick={() => handleRequestSort('roleTitle')}
                                                            >
                                                                role
                                                            </TableSortLabel>
                                                        </TableCell>
                                                        <TableCell>
                                                            <TableSortLabel
                                                                active={orderBy === 'roleDescription'}
                                                                direction={orderBy === 'roleDescription' ? order : 'asc'}
                                                                onClick={() => handleRequestSort('roleDescription')}
                                                            >
                                                                Description
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
                                                    {sortedRows?.map((role: any) => (
                                                        <TableRow
                                                            key={role.id}
                                                            hover
                                                            onClick={() => handleClick(role.id)}
                                                            role="checkbox"
                                                            aria-checked={isSelected(role.id)}
                                                            selected={isSelected(role.id)}
                                                        >
                                                            <TableCell>
                                                                <Checkbox checked={isSelected(role.id)} />
                                                            </TableCell>
                                                            <TableCell>{role.roleName}</TableCell>
                                                            <TableCell>{role.description}</TableCell>
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
                                                                                    <MenuItem onClick={() => handleOpenDelete(role.id)}><i className="fa-light fa-trash-can"></i> Delete</MenuItem>
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
                                            count={roleData?.totalCount || 0}
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
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}> Are you sure you want to delete this Role?</Typography>
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

export default CreateRoleList;