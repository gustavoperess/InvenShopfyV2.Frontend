"use client"
import React, { useState } from 'react';
import { MenuItem } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';

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
} from '@mui/material';
import { toast } from 'react-toastify';

interface Data {
  id: number;
  voucherNo: string;
  details: string;
  protein: string;
}

// Sample data
const rows: Data[] = [
  {
    id: 1,
    voucherNo: 'Hospital/Medical',
    details: 'Furniture',
    protein: '',
  },
  {
    id: 2,
    voucherNo: 'Office Decoration',
    details: 'Internal Expense',
    protein: '',
  },
  {
    id: 3,
    voucherNo: 'Electrics',
    details: 'Medicines',
    protein: '',
  },
  {
    id: 4,
    voucherNo: 'Electronics',
    details: 'Current',
    protein: '',
  },
  {
    id: 5,
    voucherNo: 'Office Appliance',
    details: 'Speaker',
    protein: '',
  },
  {
    id: 6,
    voucherNo: 'Security',
    details: 'Salary',
    protein: '',
  },
  {
    id: 7,
    voucherNo: 'Accessories',
    details: 'Watch man',
    protein: '',
  },
  {
    id: 8,
    voucherNo: 'Transportation',
    details: 'Computer',
    protein: '',
  },
  {
    id: 9,
    voucherNo: 'Miscellaneous',
    details: 'Sale/Purchase',
    protein: '',
  },
];

const ExpenseCategory = () => {

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

  //form submit
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');

  const handleExpenseCategory = (e: any) => {
    e.preventDefault();
    try {
      toast.success("Category Created successfully!");
      setCategory('');
      setSubCategory('');

    } catch {
      toast.error("Failed to create Category. Please try again later.");
    }
  }

  return (
    <>
      <div className="inventual-content-area px-4 sm:px-7">
        <div className="inventual-expense-category-area bg-white p-5 sm:p-7 custom-shadow rounded-8 mt-7">
          <div className="grid grid-cols-12 gap-y-7 sm:gap-7">
            <div className="col-span-12 lg:col-span-6">
              <form onSubmit={handleExpenseCategory}>
                <div className="grid grid-cols-12 gap-y-7 sm:gap-7">
                  <div className="col-span-12 md:col-span-6 lg:col-span-12">
                    <div className="inventual-form-field">
                      <h5>Category</h5>
                      <div className="inventual-input-field-style">
                        <input
                          required
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          type="text"
                          placeholder='Office Decoration'
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-6 lg:col-span-12">
                    <div className="inventual-form-field">
                      <h5>Sub-Category</h5>
                      <div className="inventual-input-field-style">
                        <input
                          required
                          value={subCategory}
                          onChange={(e) => setSubCategory(e.target.value)}
                          type="text"
                          placeholder='Furniture'
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12">
                    <button type='submit' className='inventual-btn'>Create Category </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-span-12 lg:col-span-6">
              <div className="inventual-manageproduct-table-area">
                <div className="inventual-common-mat-list w-full mt-0.5">
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
                                active={orderBy === 'voucherNo'}
                                direction={orderBy === 'voucherNo' ? order : 'asc'}
                                onClick={() => handleRequestSort('voucherNo')}
                              >
                                Vucher No
                              </TableSortLabel>
                            </TableCell>
                            <TableCell>
                              <TableSortLabel
                                active={orderBy === 'details'}
                                direction={orderBy === 'details' ? order : 'asc'}
                                onClick={() => handleRequestSort('details')}
                              >
                                details
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
                                <TableCell>{row.voucherNo}</TableCell>
                                <TableCell>{row.details}</TableCell>
                                <TableCell>
                                  <div className="inventual-list-action-style">
                                    <PopupState variant="popover">
                                      {(popupState: any) => (
                                        <React.Fragment>
                                          <button className='' type='button' {...bindTrigger(popupState)}>
                                            Action <i className="fa-sharp fa-solid fa-sort-down"></i>
                                          </button>
                                          <Menu {...bindMenu(popupState)}>
                                            <MenuItem onClick={popupState.close}><i className="fa-regular fa-pen-to-square"></i> Edit</MenuItem>
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
};

export default ExpenseCategory;