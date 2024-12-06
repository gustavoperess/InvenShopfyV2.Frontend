import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useGetAllRolesQuery } from '@/services/Role/Role';
import { toast } from 'react-toastify';
import { MenuItem, TextField, FormControl } from '@mui/material';
import { TUserInterface } from '@/interFace/interFace';
import { useUpdateUserRoleMutation } from '@/services/User/User';

interface EditUserRoleProps {
    open: boolean;
    userId: string;
    currentRole: string;
    handleEditEmployeeDialogClose: () => void;
}
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const EditEmployeeListPopup = ({ open, userId, currentRole, handleEditEmployeeDialogClose }: EditUserRoleProps) => {
    const { data: rolesData } = useGetAllRolesQuery();
    const [role, setRole] = useState<number | string>("");
    const [updateUserRole, { isLoading, error: errorUpdating }] = useUpdateUserRoleMutation();



    const handleRoleAssignment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const updatedUserData = {  userRoleId: role }
        try {
            await updateUserRole({ body: updatedUserData, userId }).unwrap();
            toast.success("User Assigned new role sucessfully, Please log in again to load new permissions!");
            handleEditEmployeeDialogClose();
        } catch (error: any) {
            if (error?.data?.message) {
                toast.error(error?.data?.message);
            } else {
                // Fallback error message
                toast.error("Failed to assign new role to user. Please try again later.");
            }
        }
    }

    return (
        <>
            <div className='invenShopfy-common-modal'>
                <BootstrapDialog
                    onClose={handleEditEmployeeDialogClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <div className='invenShopfy-modal-title'>
                        <h4>Edit User</h4>
                        <button autoFocus onClick={handleEditEmployeeDialogClose} type='button'><i className="fa-regular fa-xmark"></i></button>
                    </div>
                    <DialogContent dividers>
                        <div className='invenShopfy-common-modal-width width-full'>
                            <form onSubmit={handleRoleAssignment}>
                                <div className="grid grid-cols-12 sm:gap-x-[30px] gap-y-[18px]">
                                    <div className="col-span-12 md:col-span-6">
                                        <div className="invenShopfy-formTree-field">
                                            <h5>Current Role</h5>
                                            <div className="invenShopfy-select-field-style">
                                                <TextField
                                                    required
                                                    value={currentRole}
                                                    disabled={currentRole !== ''}
                                                    style={{
                                                        backgroundColor: currentRole !== '' ? '#e0e0e0' : 'inherit',
                                                        color: currentRole !== '' ? '#757575' : 'inherit',
                                                        width: '100%',
                                                    }}
                                                >
                                                </TextField>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6">
                                        <div className="invenShopfy-form-field">
                                            <h5>New Role</h5>
                                            <div className="invenShopfy-select-field-style">
                                                <FormControl fullWidth>
                                                    <TextField
                                                        label="Select"
                                                        select
                                                        required
                                                        helperText="Please select a Role"
                                                        value={role}
                                                        onChange={(e) => setRole(e.target.value)}
                                                        fullWidth
                                                        InputLabelProps={{ shrink: true }}
                                                        SelectProps={{
                                                            displayEmpty: true,
                                                            renderValue: (value) => {
                                                                const roleItem = rolesData?.data.find(
                                                                    (category: TUserInterface) => category.id === Number(value)
                                                                );
                                                                return roleItem ? roleItem.roleName : <em>Select Role</em>;
                                                            },
                                                        }}
                                                        >
                                                        {rolesData && rolesData.data.length > 0 ? (
                                                            rolesData.data.map((role: TUserInterface) => (
                                                                <MenuItem key={role.id} value={role.id}>
                                                                    {role.roleName}
                                                                </MenuItem>
                                                            ))
                                                        ) : (
                                                            <MenuItem value="">
                                                                <em>No roles Available</em>
                                                            </MenuItem>
                                                        )}
                                                    </TextField>
                                                </FormControl>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <DialogActions>
                                    <button className='invenShopfy-btn' type='submit'>
                                        Switch Roles
                                    </button>
                                </DialogActions>
                            </form>
                        </div>
                    </DialogContent>

                </BootstrapDialog>
            </div>
        </>
    );
};

export default EditEmployeeListPopup;