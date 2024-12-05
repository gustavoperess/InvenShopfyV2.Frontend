"use client"
import React, { useRef, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import {
  TextField,
  FormControl,
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
} from '@mui/material';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
import { toast } from 'react-toastify';
import { useGetAllProductsCategoryQuery, useAddCategoryMutation, useDeleteCategoryMutation } from '@/services/Product/Category';
import { TMainCategoryInterface } from '@/interFace/interFace';


const ProductCategory = () => {
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = useState<number>(0);
  const [mainCategory, setMainCategory] = useState<string>("");
  const [subCategory, setSubCategory] = useState<string>("");
  const [selected, setSelected] = useState<number[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof TMainCategoryInterface>('id');
  const [deleteCategory] = useDeleteCategoryMutation();
  const [addCategory] = useAddCategoryMutation();
  const { data: categorytData, error: categoryError, isLoading: categoryLoading, refetch } = useGetAllProductsCategoryQuery({ pageNumber: currentPageNumber, pageSize: currentPageSize });


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
  const handleOpenDelete = (categoryId: number) => {
    setCategory(categoryId);
    setOpen(true);
  };

  // handle closing delete modal
  const handleCloseDelete = () => {
    setOpen(false);
  }

  const handleDelete = async () => {
    if (category > 0) {
      try {
        const result = await deleteCategory(category).unwrap();
        setOpen(false);
        refetch();
        toast.success("Category deleted successfully.");
      } catch (error: any) {
        if (error?.data?.message) {
          toast.error(error.data.message);
        } else {
          toast.error("Failed to delete Category. Please try again later.");
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
      setSelected(categorytData?.data.map((category: any) => category.id));
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
  const sortedRows = categorytData?.data.slice().sort((a: any, b: any) => {
    if (!orderBy) return 0;
    const isAsc = order === 'asc';
    const aValue = a[orderBy as keyof TMainCategoryInterface];
    const bValue = b[orderBy as keyof TMainCategoryInterface];
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


  const handleCategory = async (event: React.FormEvent<HTMLFormElement>) => {
    const subCategoryArray = subCategory.split(',').map((item) => item.trim());
    const categoryData = { mainCategory, subCategory: subCategoryArray };
    event.preventDefault();

    try {
      await addCategory(categoryData).unwrap();
      toast.success("Product Category created successfully!");
      setMainCategory('');
      setSubCategory('');
      refetch();
    } catch (error: any) {
      if (error?.data?.message) {
        toast.error(error.data.message);
        setMainCategory('');
        setSubCategory('');
      } else {
        toast.error("Failed to Create Product Category. Please try again later.");
      }
    }
  }

  return (
    <>
      <div className="invenShopfy-content-area px-4 sm:px-7">
        <div className="invenShopfy-productc-category-area bg-white p-5 sm:p-7 custom-shadow rounded-8 mb-5 mt-7">
          <div className="grid grid-cols-12 gap-y-7 sm:gap-7">
            <div className="col-span-12 lg:col-span-3">
              <form onSubmit={handleCategory}>
                <div className="grid grid-cols-12 gap-y-7 minMaxMd:gap-7">
                  <div className="col-span-12 md:col-span-6 lg:col-span-12">
                    <div className="invenShopfy-select-field">
                      <div className="invenShopfy-form-field">
                        <h5>Main-Category</h5>
                        <div className="invenShopfy-input-field-style">
                          <FormControl fullWidth>
                            <TextField
                              fullWidth
                              placeholder="Eletronics*"
                              variant="outlined"
                              type="text"
                              value={mainCategory}
                              required
                              inputProps={{ maxLength: 50 }}
                              onChange={(e) => setMainCategory(e.target.value)}
                            />
                          </FormControl>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-6 lg:col-span-12">
                    <div className="invenShopfy-select-field">
                      <div className="invenShopfy-form-field">
                        <h5>Sub-Category</h5>
                        <div className="invenShopfy-input-field-style">
                          <FormControl fullWidth>
                            <TextField
                              fullWidth
                              placeholder="Computer*"
                              type="text"
                              variant="outlined"
                              value={subCategory}
                              required
                              inputProps={{ maxLength: 50 }}
                              onChange={(e) => setSubCategory(e.target.value)}
                            />
                          </FormControl>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12">
                    <button type='submit' className='invenShopfy-btn'>Create Category</button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-span-12 lg:col-span-9">
              <div className="invenShopfy-common-mat-list w-full mt-0.5 whitespace-nowrap">
                <div className='w-full'>
                  <Paper sx={{ width: '100%', mb: 2 }}>
                    <TableContainer>
                      <Table aria-label="enhanced table" size="medium">
                        <TableHead className='bg-lightest'>
                          <TableRow>
                            <TableCell>
                              <Checkbox
                                indeterminate={selected.length > 0 && selected.length < categorytData?.data.length}
                                checked={categorytData?.data.length > 0 && selected.length === categorytData?.data.length}
                                onChange={(e) => handleSelectAllClick(e.target.checked)}
                              />
                            </TableCell>
                            <TableCell>
                              <TableSortLabel
                                active={orderBy === 'mainCategory'}
                                direction={orderBy === 'mainCategory' ? order : 'asc'}
                                onClick={() => handleRequestSort('mainCategory')}
                              >
                                Name
                              </TableSortLabel>
                            </TableCell>
                            <TableCell>
                              <TableSortLabel
                                active={orderBy === 'subCategory'}
                                direction={orderBy === 'subCategory' ? order : 'asc'}
                                onClick={() => handleRequestSort('subCategory')}
                              >
                                Sub-Category
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
                          {categoryLoading ? (
                            <tr>
                              <td colSpan={5}>
                                <div className="invenShopfy-loading-container">
                                  <span className="invenShopfy-loading"></span>
                                </div>
                              </td>
                            </tr>
                          ) : categorytData?.message === "User is not authorized to do this task" ? (
                            <tr>
                              <td colSpan={5}>
                                <div className="invenShopfy-loading-container">
                                  <h1>User is not authorized to do this task</h1>
                                </div>
                              </td>
                            </tr>
                          ) : (
                            sortedRows?.map((category: any) => (
                              <TableRow
                                key={category.id}
                                hover
                                onClick={() => handleClick(category.id)}
                                role="checkbox"
                                aria-checked={isSelected(category.id)}
                                selected={isSelected(category.id)}
                              >
                                <TableCell>
                                  <Checkbox checked={isSelected(category.id)} />
                                </TableCell>
                                {/* Data cells */}
                                <TableCell>{category.mainCategory}</TableCell>
                                <TableCell>{Array.isArray(category?.subCategory) ? category.subCategory.join(', ') : category?.subCategory}</TableCell>
                                <TableCell>
                                  <div className="invenShopfy-list-action-style">
                                    <PopupState variant="popover">
                                      {(popupState: any) => (
                                        <React.Fragment>
                                          <button className='' type='button' {...bindTrigger(popupState)}>
                                            Action <i className="fa-sharp fa-solid fa-sort-down"></i>
                                          </button>
                                          <Menu {...bindMenu(popupState)}>
                                            <MenuItem onClick={popupState.close}><i className="fa-regular fa-pen-to-square"></i>Edit</MenuItem>
                                            <MenuItem onClick={() => handleOpenDelete(category.id)}><i className="fa-light fa-trash-can"></i> Delete</MenuItem>
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
                    {/* Pagination */}
                    <TablePagination
                      component="div"
                      count={categorytData?.totalCount || 0}
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
                <Typography id="modal-modal-description" sx={{ mt: 2 }}> Are you sure you want to delete this Category?</Typography>
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

export default ProductCategory;