"use client"
import React, { useRef, useState } from 'react';
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
} from '@mui/material';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';

import image1 from '../../../../public/assets/img/product/brand-2.png';
import image2 from '../../../../public/assets/img/product/brand-3.png';
import image3 from '../../../../public/assets/img/product/brand-4.png';
import image4 from '../../../../public/assets/img/product/brand-5.png';
import image5 from '../../../../public/assets/img/product/brand-6.png';
import image6 from '../../../../public/assets/img/product/brand-7.png';
import image7 from '../../../../public/assets/img/product/brand-8.png';
import image8 from '../../../../public/assets/img/product/brand-9.png';
import image9 from '../../../../public/assets/img/product/brand-10.png';
import { toast } from 'react-toastify';

// Define the structure of the data
interface Data {
  id: number;
  image: StaticImageData;
  brandName: string;
  protein: string;
}

// Sample data
const rows: Data[] = [
  {
    id: 1,
    image: image1,
    brandName: 'Dell',
    protein: '',
  },
  {
    id: 2,
    image: image2,
    brandName: 'Reative',
    protein: '',
  },
  {
    id: 3,
    image: image3,
    brandName: 'Autodesk',
    protein: '',
  },
  {
    id: 4,
    image: image4,
    brandName: 'Samsung',
    protein: '',
  },
  {
    id: 5,
    image: image5,
    brandName: 'Redmi',
    protein: '',
  },
  {
    id: 6,
    image: image6,
    brandName: 'Ayam Goreng',
    protein: '',
  },
  {
    id: 7,
    image: image7,
    brandName: 'Amazon',
    protein: '',
  },
  {
    id: 8,
    image: image8,
    brandName: 'Adidas',
    protein: '',
  },
  {
    id: 9,
    image: image9,
    brandName: 'Realme',
    protein: '',
  },
];

const AddBrandList = () => {

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
    const aValue = (a as any)[orderBy];
    const bValue = (b as any)[orderBy];

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileId = URL.createObjectURL(file);
      setFileUrls(prevUrls => [...prevUrls, fileId]);
    }
  };

  const handleRemove = (index: number) => {
    setFileUrls(prevUrls => prevUrls.filter((item, i) => i !== index));
  };

  //handle brand reset
  const handleBrandForm = (event: any) => {
    event.preventDefault()
    try {
      toast.success("Brand Created Successfully!")
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
                        <input ref={inputBrandRef} type="text" placeholder='HP' required />
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
                                  indeterminate={selected.length > 0 && selected.length < rows.length}
                                  checked={rows.length > 0 && selected.length === rows.length}
                                  onChange={(e) => handleSelectAllClick(e.target.checked)}
                                />
                              </TableCell>
                              <TableCell>
                                <TableSortLabel
                                  active={orderBy === 'image'}
                                  direction={orderBy === 'image' ? order : 'asc'}
                                  onClick={() => handleRequestSort('image')}
                                >
                                  image
                                </TableSortLabel>
                              </TableCell>
                              <TableCell>
                                <TableSortLabel
                                  active={orderBy === 'brandName'}
                                  direction={orderBy === 'brandName' ? order : 'asc'}
                                  onClick={() => handleRequestSort('brandName')}
                                >
                                  Brand Name
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
                                  <TableCell>
                                    <div className="min-h-[70px] inline-flex items-center justify-cente">
                                      <div className="inner px-2 py-2">
                                        <Image src={row.image} height={48} width={48} alt='image not found' />
                                      </div>
                                    </div>
                                  </TableCell>
                                  <TableCell>{row.brandName}</TableCell>
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
                    </Paper>
                  </div>
                  <div className="inventual-pagination-area">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}

export default AddBrandList