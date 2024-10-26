"use client"
import React, { useRef, useState, useCallback } from 'react';
import Image, { StaticImageData } from 'next/image';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Checkbox,
  TableSortLabel,
  Menu,
  MenuItem,
  Typography,
  Modal,
  Box,
  Stack,
  Button,
} from '@mui/material';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
import { useGetAllProductsBrandQuery, useDeleteBrandMutation, useAddBrandMutation } from '@/services/Product/Brand';



import { toast } from 'react-toastify';

// Define the structure of the data
interface Data {
  id: number;
  title: string;
  brandImage: string;
}



const AddBrandList = () => {
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const [open, setOpen] = React.useState(false);

  const [brandImage, setBrandImage] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);
  const [brand, setBrand] = useState<number>(0);
  const [selected, setSelected] = useState<number[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof Data>('id');
  const [deleteBrand] = useDeleteBrandMutation();
  const [addBrand] = useAddBrandMutation();
  const { data: brandData, error: brandError, isLoading: brandLoading, refetch } = useGetAllProductsBrandQuery({ pageNumber: currentPageNumber, pageSize: currentPageSize });

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
      setBrand(productId);
      setOpen(true);
    };
     // handle closing delete modal
     const handleCloseDelete = () => {
      setOpen(false);
    }

     // handle delete submission
     const handleDelete = async () => {
      if (brand > 0) {
        try {
          await deleteBrand(brand);
          setOpen(false);
          refetch()
        } catch (err) {
          console.error('Error deleting the brand:', err);
        }
      }
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
      setSelected(brandData?.data.map((brand: any) => brand.id));
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
  const sortedRows = brandData?.data.slice().sort((a: any, b: any) => {
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

  // uploaded images
  const [fileUrls, setFileUrls] = useState<string[]>([]);
  const inputBrandRef = useRef<HTMLInputElement>(null)

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();
    if (file) {
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const base64Data = base64String.split(',')[1];
        setBrandImage(base64Data);
      }
      reader.readAsDataURL(file); 
    }
  }, []);

  const handleRemove = (index: number) => {
    setFileUrls(prevUrls => prevUrls.filter((item, i) => i !== index));
  };
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  //handle brand submit form
  const handleBrandForm = async (event: any) => {
    event.preventDefault()
    const brandData = { title, brandImage };
    console.log(brandData)
    try {
      await addBrand(brandData).unwrap();
      setTitle('');
      setBrandImage(null);
      formRef.current?.reset();
      toast.success("Brand Created Successfully!")
      refetch();
      if(inputBrandRef.current) {
        inputBrandRef.current.value = '';
        setFileUrls([]);
      }
    } catch {
      toast.error("Failed to create brand. Please try again later.")
    }
  }

  return (
    <>
      <div className="inventual-content-area px-4 sm:px-7">
        <div className="inventual-add-brand-area bg-white p-5 sm:p-7 custom-shadow rounded-8 mt-7">
          <div className="grid grid-cols-12 gap-7 maxSm:gap-x-0">
            <div className="col-span-12 md:col-span-4">
              <form onSubmit={handleBrandForm}>
                <div className="inventual-addbrand-upload-area">
                  <div className="inventual-input-field-style flex flex-wrap gap-5 relative mb-5">
                    <div className="inventual-input-field-file-image image-1">
                      <label htmlFor="fileUpload">
                        {
                          fileUrls.length > 0 ? (
                            "Brand Logo Uploaded"
                          ) : ("Upload Brand Logo")
                        }
                      </label>
                      <input
                        required
                        type="file"
                        id="fileUpload"
                        accept='image/*'
                        onChange={handleFileChange}
                      />
                    </div>
                    {/* Display uploaded images */}
                    {fileUrls.map((url, index) => (
                      <div key={index} className="inventual-drag-product-img">
                        <Image width={60} height={60} src={url} alt={`Uploaded Image ${index}`} />
                        <button className='inventual-inventual-drag-close' onClick={() => handleRemove(index)}>X</button>
                      </div>
                    ))}
                  </div>
                  <div className="inventual-select-field w-full mb-5">
                    <div className="inventual-form-field">
                      <h5>Brand Name</h5>
                      <div className="inventual-input-field-style">
                        <input ref={inputBrandRef} value={title} onChange={handleTitleChange} type="text" placeholder='Microsoft' required />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12">
                    <button type='submit' className='inventual-btn'>Create Brand</button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-span-12 md:col-span-8">
              <div className="inventual-manageproduct-table-area">
                <div className="inventual-common-mat-list w-full mt-0.5">
                  <div className="inner max2Xl:overflow-x-scroll">
                    <Paper sx={{ width: '100%', mb: 2 }}>
                      <TableContainer>
                        <Table aria-label="enhanced table" size="medium">
                          <TableHead className='bg-lightest'>
                            <TableRow>
                              <TableCell>
                                <Checkbox
                                  indeterminate={selected.length > 0 && selected.length < brandData?.data.length}
                                  checked={brandData?.data.length> 0 && selected.length === brandData?.data.length}
                                  onChange={(e) => handleSelectAllClick(e.target.checked)}
                                />
                              </TableCell>
                              <TableCell>
                                <TableSortLabel
                                  active={orderBy === 'brandImage'}
                                  direction={orderBy === 'brandImage' ? order : 'asc'}
                                  onClick={() => handleRequestSort('brandImage')}
                                >
                                  image
                                </TableSortLabel>
                              </TableCell>
                              <TableCell>
                                <TableSortLabel
                                  active={orderBy === 'title'}
                                  direction={orderBy === 'title' ? order : 'asc'}
                                  onClick={() => handleRequestSort('title')}
                                >
                                  Brand Name
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
                            {sortedRows?.map((brand: any) => (
                                <TableRow
                                  key={brand.id}
                                  hover
                                  onClick={() => handleClick(brand.id)}
                                  role="checkbox"
                                  aria-checked={isSelected(brand.id)}
                                  selected={isSelected(brand.id)}
                                >
                                  <TableCell>
                                    <Checkbox checked={isSelected(brand.id)} />
                                  </TableCell>
                                  <TableCell>
                                    <div className="max-h-[72px] inline-flex items-center justify-cente">
                                      <div className="inner px-2 py-2">
                                        <Image src={brand.brandImage}  height={48} width={48} alt='brand-img' />
                                      </div>
                                    </div>
                                  </TableCell>
                                  <TableCell>{brand.title}</TableCell>
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
                                              <MenuItem onClick={() => handleOpenDelete(brand.id)}><i className="fa-light fa-trash-can"></i> Delete</MenuItem>
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
                    </Paper>
                  </div>
                  <div className="inventual-pagination-area">
                    {/* Pagination */}
                    <TablePagination
                      component="div"
                      count={brandData?.totalCount || 0}
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
                <Typography id="modal-modal-description" sx={{ mt: 2 }}> Are you sure you want to delete this Brand?</Typography>
                <Stack spacing={2} direction="row">
                  <Button variant="contained" color="success" onClick={handleCloseDelete}>Cancel</Button>
                  <Button variant="outlined" color="error" onClick={handleDelete}>Delete</Button>
                </Stack>
              </Box>
            </Modal>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}

export default AddBrandList