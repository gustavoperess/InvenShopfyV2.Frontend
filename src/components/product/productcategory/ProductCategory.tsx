"use client"
import React, { useRef, useState } from 'react';
import { MenuItem, TextField } from '@mui/material';
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
import Image from 'next/image';
import { toast } from 'react-toastify';


// Define the structure of the data
interface Data {
  id: number;
  name: string;
  calories: string;
  fat: string;
}

// Sample data
const rows: Data[] = [
  {
    id: 1,
    name: 'Fish & Meat',
    calories: 'Deshi Fish',
    fat: 'Katal, Rooi fish, Beef, Deshi chicken, Loitta fish,  Rice, Pasta, Noodles'
  },
  {
    id: 2,
    name: 'Electronics',
    calories: 'Computer',
    fat: 'TV & Video, Audio & Home Theater, Computers. Camera & Photo.Wearable Technology, & GPS'
  },
  {
    id: 3,
    name: 'Fashion',
    calories: 'Full T-shirt',
    fat: 'Streetwear Style, Ethnic fashion style,.Business Casual,  Sports Wear'
  },
  {
    id: 4,
    name: 'Accessories',
    calories: 'Earphone',
    fat: 'Sunglasses. Apron, Necklace, Watch, Socks, Tie, Bow, Pocket watch, Safety pin'
  },
  {
    id: 5,
    name: 'Cosmetics',
    calories: 'White Creame',
    fat: 'Budget Cosmetics, Cleaner, Sleek, Little Angel, Blooming Beauty, Glow Away, Maniacs.'
  },
  {
    id: 6,
    name: 'Gadgets',
    calories: 'Apple',
    fat: 'Katal, Rooi fish, Beef, Deshi chicken,Rice, Pasta, Noodles'
  },
  {
    id: 7,
    name: 'Flyer & brochure',
    calories: 'Deshi Fish',
    fat: 'Orbital Keys, Xpress Bottle, Uno Wear, Mono, Handy Mop Set,  Villafy, Sticken Snap.'
  },
  {
    id: 8,
    name: 'Electrical',
    calories: 'Samsung',
    fat: 'Business Card, Flyer, brochure, Banner, Rollup Banner, Ads, Kits, Image, Vector.'
  },
];

const ProductCategory = () => {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState<number[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof Data>('id');

  const dummyData = (e: any) => {
    e.preventDefault();
  };

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

  // uploaded images
  const [fileUrl, setFileUrl] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileId = URL.createObjectURL(file);
      setFileUrl(fileId);
    }
  };

  const handleRemove = () => {
    setFileUrl('');
  };

  //handle category data
  const categoryInputRef = useRef<HTMLInputElement>(null);
  const [mainCategory, setMainCategory] = useState<string>('');

  const handleCategory = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      toast.success("Category created successfully!");
      if (categoryInputRef.current) {
        categoryInputRef.current.value = '';
        setFileUrl('');
        setMainCategory('');
      }
    } catch {
      toast.error("Failed to create category. Please try again later.");
    }
  }

  return (
    <>
      <div className="inventual-content-area px-4 sm:px-7">
        <div className="inventual-productc-category-area bg-white p-5 sm:p-7 custom-shadow rounded-8 mb-5 mt-7">
          <div className="grid grid-cols-12 gap-y-7 sm:gap-7">
            <div className="col-span-12 lg:col-span-3">
            <form onSubmit={handleCategory}>
                <div className="grid grid-cols-12 gap-y-7 minMaxMd:gap-7">
                  <div className="col-span-12 md:col-span-12 lg:col-span-12">
                    <div className="inventual-input-field-style flex flex-wrap  gap-5 relative">
                      <div className="inventual-input-field-file-image image-1">
                        <label htmlFor="fileUpload">
                          {fileUrl ? "Image Uploaded" : "Upload Category Image"}
                        </label>
                        <input
                          type="file"
                          id="fileUpload"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </div>
                      {fileUrl && (
                        <div className="inventual-drag-product-img">
                          <Image src={fileUrl} width={60} height={60} alt="Uploaded Image" className="object-cover" />
                          <button className='inventual-inventual-drag-close' onClick={handleRemove}>X</button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-6 lg:col-span-12">
                    <div className="inventual-select-field">
                      <div className="inventual-form-field">
                        <h5>Sub-Category</h5>
                        <div className="inventual-input-field-style">
                          <input ref={categoryInputRef} type="text" placeholder='HP Elitebook' required />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-6 lg:col-span-12">
                    <div className="inventual-form-field">
                      <h5>Main Category</h5>
                      <div className="inventual-select-field-style">
                        <TextField
                          select
                          required
                          label="Select"
                          defaultValue=""
                          value={mainCategory}
                          onChange={(e) => setMainCategory(e.target.value)}
                          SelectProps={{
                            displayEmpty: true,
                            renderValue: (value: any) => {
                              if (value === '') {
                                return <em>Select Type</em>;
                              }
                              return value;
                            },
                          }}
                        >

                          <MenuItem value="">
                            <em>Select Type</em>
                          </MenuItem>
                          <MenuItem value="Fish & Meat">Fish & Meat</MenuItem>
                          <MenuItem value="Electronics">Electronics</MenuItem>
                          <MenuItem value="Fashion">Fashion</MenuItem>
                          <MenuItem value="Cosmetics">Cosmetics</MenuItem>
                          <MenuItem value="Jewelry">Jewelry</MenuItem>
                          <MenuItem value="Accessories">Accessories</MenuItem>
                          <MenuItem value="Gadgets">Gadgets</MenuItem>
                          <MenuItem value="Physical Goods">Physical Goods</MenuItem>
                          <MenuItem value="Device">Device</MenuItem>
                          <MenuItem value="Decoration">Decoration</MenuItem>
                        </TextField>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12">
                    <button type='submit' className='inventual-btn'>Create Category</button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-span-12 lg:col-span-9">
              <div className="inventual-common-mat-list w-full mt-0.5 whitespace-nowrap">
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
                                active={orderBy === 'calories'}
                                direction={orderBy === 'calories' ? order : 'asc'}
                                onClick={() => handleRequestSort('calories')}
                              >
                                Sub-Category
                              </TableSortLabel>
                            </TableCell>
                            <TableCell>
                              <TableSortLabel
                                active={orderBy === 'fat'}
                                direction={orderBy === 'fat' ? order : 'asc'}
                                onClick={() => handleRequestSort('fat')}
                              >
                                Items
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
                                {/* Data cells */}
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.calories}</TableCell>
                                <TableCell>{row.fat}</TableCell>
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

export default ProductCategory;