"use client"
import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
import { useAddExepenseCategoryMutation, useGetAllExpenseCategoriesQuery, useDeleteExpenseCategoryMutation } from '@/services/Expense/ExpenseCategory';

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
  Menu,
  MenuItem,
  FormControl,
  TextField,
  Typography,
  Modal,
  Box,
  Stack,
  Button,
} from '@mui/material';
import { toast } from 'react-toastify';
import { TMainCategoryInterface } from '@/interFace/interFace';

interface Data {
  id: number;
  category: string;
  subCategory: string[];
}


const ExpenseCategory = () => {
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const [open, setOpen] = React.useState(false);
  const [expenseCategory, setExepenseCategory] = useState<number>(0);
  const [expenseCategoryMainCategory, setExpenseCategoryMainCategory] = useState<string>("");
  const [expenseCategorySubCategory, setExpenseCategorySubCategory] = useState<string>("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState<number[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof TMainCategoryInterface>('id');
  const [deleteExpenseCategory] = useDeleteExpenseCategoryMutation();
  const [addExpenseCategory] = useAddExepenseCategoryMutation();
  const { data: expenseCategoryData, isLoading: expenseCategoryLoading, refetch } = useGetAllExpenseCategoriesQuery({ pageNumber: currentPageNumber, pageSize: currentPageSize });


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
  const handleOpenDelete = (expenseCategoryId: number) => {
    setExepenseCategory(expenseCategoryId);
    setOpen(true);
  };
  // handle closing delete modal
  const handleCloseDelete = () => {
    setOpen(false);
  }

  // handle delete submission


  // handle delete submission
  const handleDelete = async () => {
    if (expenseCategory > 0) {
      try {
        const result = await deleteExpenseCategory(expenseCategory).unwrap();
        setOpen(false);
        refetch();
        toast.success("Expense category deleted successfully.");
      } catch (error: any) {
        if (error?.data?.message) {
          toast.error(error.data.message);
        } else {
          toast.error("Failed to delete expense category. Please try again later.");
        }
      }
    }
  };


  // Handlers for sorting
  const handleRequestSort = (property: keyof TMainCategoryInterface) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Handler for selecting/deselecting all items
  const handleSelectAllClick = (checked: boolean) => {
    if (checked) {
      setSelected(expenseCategoryData?.data.map((brand: any) => brand.id));
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
  const sortedRows = expenseCategoryData?.data.slice().sort((a: any, b: any) => {
    if (!orderBy) return 0;
    const isAsc = order === 'asc';
    const aValue = a[orderBy as keyof Data];
    const bValue = b[orderBy as keyof Data];
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
  const handleExpenseCategory = async (event: any) => {
    event.preventDefault();
    const subCategoryArray = expenseCategorySubCategory.split(',').map((item) => item.trim());
    const expenseCategoryDataToSubmit = { category: expenseCategoryMainCategory, subCategory: subCategoryArray }
    try {
      await addExpenseCategory(expenseCategoryDataToSubmit).unwrap();
      toast.success("Category Created successfully!");
      setExpenseCategoryMainCategory('');
      setExpenseCategorySubCategory('');
      refetch();
    }
    catch (error: any) {
      if (error?.data?.message) {
        toast.error(error?.data?.message);
        setExpenseCategoryMainCategory('');
        setExpenseCategorySubCategory('');
      } else {
        // Fallback error message
        toast.error("Failed to create Category. Please try again later.");
      }
    }
  }


  return (
    <>
      <div className="invenShopfy-content-area px-4 sm:px-7">
        <div className="invenShopfy-product-unit-area bg-white p-5 sm:p-7 custom-shadow rounded-8 mt-7">
          <div className="grid grid-cols-12 gap-7 maxSm:gap-x-0">
            <div className="col-span-12 lg:col-span-4">
              <form onSubmit={handleExpenseCategory}>
                <div className="grid grid-cols-12 gap-7 maxSm:gap-x-0">
                  <div className="col-span-12 md:col-span-6 lg:col-span-12">
                    <div className="invenShopfy-select-field">
                      <div className="invenShopfy-form-field">
                        <h5>Expense Category</h5>
                        <div className="invenShopfy-input-field-style">
                          <FormControl fullWidth>
                            <TextField
                              fullWidth
                              placeholder="Office supply"
                              variant="outlined"
                              type="text"
                              value={expenseCategoryMainCategory}
                              required
                              inputProps={{ maxLength: 180 }}
                              onChange={(e) => setExpenseCategoryMainCategory(e.target.value)}
                            />
                          </FormControl>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-6 lg:col-span-12">
                    <div className="invenShopfy-select-field">
                      <div className="invenShopfy-form-field">
                        <h5>Expense Sub-Category</h5>
                        <FormControl fullWidth>
                          <TextField
                            fullWidth
                            placeholder="Furniture*"
                            variant="outlined"
                            type="text"
                            value={expenseCategorySubCategory}
                            required
                            inputProps={{ maxLength: 180 }}
                            onChange={(e) => setExpenseCategorySubCategory(e.target.value)}
                          />
                        </FormControl>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12">
                    <button type='submit' className='invenShopfy-btn'>Create Category </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-span-12 lg:col-span-8">
              <div className="invenShopfy-common-mat-list w-full mt-0.5">
                <div className='w-full'>
                  <Paper sx={{ width: '100%', mb: 2 }}>

                    <TableContainer>
                      <Table aria-label="enhanced table" size="medium">
                        <TableHead className='bg-lightest'>
                          <TableRow>
                            <TableCell>
                              <Checkbox
                                indeterminate={selected.length > 0 && selected.length < expenseCategoryData?.data.length}
                                checked={expenseCategoryData?.data.length > 0 && selected.length === expenseCategoryData?.data.length}
                                onChange={(e) => handleSelectAllClick(e.target.checked)}
                              />
                            </TableCell>

                            <TableCell>
                              <TableSortLabel
                                active={orderBy === 'mainCategory'}
                                direction={orderBy === 'mainCategory' ? order : 'asc'}
                                onClick={() => handleRequestSort('mainCategory')}
                              >
                                Category
                              </TableSortLabel>
                            </TableCell>
                            <TableCell>
                              <TableSortLabel
                                active={orderBy === 'subCategory'}
                                direction={orderBy === 'subCategory' ? order : 'asc'}
                                onClick={() => handleRequestSort('subCategory')}
                              >
                                Sub-Cateogry
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
                          {expenseCategoryLoading ? (
                            <tr>
                              <td colSpan={14}>
                                <div className="invenShopfy-loading-container">
                                  <span className="invenShopfy-loading"></span>
                                </div>
                              </td>
                            </tr>
                          ) : expenseCategoryData?.message === "User is not authorized to do this task" ? (
                            <tr>
                              <td colSpan={14}>
                                <div className="invenShopfy-loading-container">
                                  <h1>User is not authorized to do this task</h1>
                                </div>
                              </td>
                            </tr>
                          ) : (
                            sortedRows?.map((expenseCategory: any) => (
                              <TableRow
                                key={expenseCategory.id}
                                hover
                                onClick={() => handleClick(expenseCategory.id)}
                                role="checkbox"
                                aria-checked={isSelected(expenseCategory.id)}
                                selected={isSelected(expenseCategory.id)}>
                                <TableCell>
                                  <Checkbox checked={isSelected(expenseCategory.id)} />
                                </TableCell>
                                <TableCell>{expenseCategory.mainCategory}</TableCell>
                                <TableCell>{Array.isArray(expenseCategory?.subCategory) ? expenseCategory.subCategory.join(', ') : expenseCategory?.subCategory}</TableCell>
                                <TableCell>
                                  <div className="invenShopfy-list-action-style">
                                    <PopupState variant="popover">
                                      {(popupState: any) => (
                                        <React.Fragment>
                                          <button className='' type='button' {...bindTrigger(popupState)}>
                                            Action <i className="fa-sharp fa-solid fa-sort-down"></i>
                                          </button>
                                          <Menu {...bindMenu(popupState)}>
                                            <MenuItem onClick={popupState.close}><i className="fa-regular fa-pen-to-square"></i> Edit</MenuItem>
                                            <MenuItem onClick={() => handleOpenDelete(expenseCategory.id)}><i className="fa-light fa-trash-can"></i> Delete</MenuItem>
                                          </Menu>
                                        </React.Fragment>
                                      )}
                                    </PopupState>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>

                  {/* Pagination */}
                  <TablePagination
                    component="div"
                    count={expenseCategoryData?.totalCount || 0}
                    rowsPerPage={currentPageSize}
                    page={currentPageNumber - 1}
                    onPageChange={(_, newPage) => handlePageChange(null, newPage + 1)}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
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
                <Typography id="modal-modal-description" sx={{ mt: 2 }}> Are you sure you want to delete this Expense Car?</Typography>
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

export default ExpenseCategory;