"use client"

import React, { useState } from 'react';
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

// Define the structure of the data
interface Data {
  id: number;
  name: string;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
}

// Sample data
const rows: Data[] = [
    { id: 1, name: 'Cupcake1', calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
    { id: 2, name: 'Cupcak2', calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
    { id: 3, name: 'Cupcak5', calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
    { id: 4, name: 'Cupcake8', calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
    { id: 5, name: 'Cupcake54', calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
    { id: 6, name: 'Cupcake53', calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
    // Add more rows here...
  ];

// Component for rendering the table
export default function EnhancedTable() {
  // State variables
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<number[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof Data>('calories');

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

  return (
    <div className="invenShopfy-common-card xs:pb-6 mb-5">
      <div className="invenShopfy-common-mat-list w-full mt-0.5">
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
                        indeterminate={selected.length > 0 && selected.length < rows.length}
                        checked={rows.length > 0 && selected.length === rows.length}
                        onChange={(e) => handleSelectAllClick(e.target.checked)}
                      />
                    </TableCell>
                    {/* Table headers */}
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
                        Calories
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === 'fat'}
                        direction={orderBy === 'fat' ? order : 'asc'}
                        onClick={() => handleRequestSort('fat')}
                      >
                        Fat (g)
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === 'carbs'}
                        direction={orderBy === 'carbs' ? order : 'asc'}
                        onClick={() => handleRequestSort('carbs')}
                      >
                        Carbs (g)
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === 'protein'}
                        direction={orderBy === 'protein' ? order : 'asc'}
                        onClick={() => handleRequestSort('protein')}
                      >
                        Protein (g)
                      </TableSortLabel>
                    </TableCell>
                  </TableRow>
                </TableHead>
                {/* Table body */}
                <TableBody>
                  {/* Rows */}
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
                        {/* Checkbox for row selection */}
                        <TableCell>
                          <Checkbox checked={isSelected(row.id)} />
                        </TableCell>
                        {/* Data cells */}
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.calories}</TableCell>
                        <TableCell>{row.fat}</TableCell>
                        <TableCell>{row.carbs}</TableCell>
                        <TableCell>
                            <div className="invenShopfy-list-action-style">
                                <PopupState variant="popover">
                                    {(popupState:any) => (
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
  );
}
