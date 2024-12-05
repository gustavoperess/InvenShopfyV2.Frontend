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
import { useGetAllSalesQuery } from '@/services/Sales/Sales';
import Link from 'next/link';
import TradingSalesListAddPayemnt from './salelistPopup/TradingSalesListAddPayemnt';
import TradingSalesListViewPayment from './salelistPopup/TradingSalesListViewPayment';
import TradingSalesListInvoice from './salelistPopup/TradingSalesListInvoice';
import ViewSalePopup from './salelistPopup/ViewSalePopup';
import { TSaleInterface, MoneyFormat } from '@/interFace/interFace';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { saveAs } from 'file-saver';


const SaleList = () => {
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const [selected, setSelected] = useState<number[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof TSaleInterface>('id');
  const [selectedSaleId, setSelectedSaleId] = useState<number | undefined>();
  const [searchQuery, setSearchQuery] = useState('');
  const { data: salesData, error: salesError, isLoading: salesLoading, refetch } = useGetAllSalesQuery({ pageNumber: currentPageNumber, pageSize: currentPageSize });



  // handle pagination 
  const handlePageChange = (event: unknown, newPage: number) => {
    setCurrentPageNumber(newPage);
    refetch();
  };

  // handle pagination 
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPageSize(parseInt(event.target.value, 10));
    setCurrentPageNumber(1);
    refetch();
  };



  // AddPayment Popup Start
  const [openeAddPaymentDialog, setOpenAddPaymentDialog] = useState<boolean>(false);

  const handleAddPaymentDialogOpen = (saleId: number) => {
    setSelectedSaleId(saleId)
    setOpenAddPaymentDialog(true);
  };
  const handleAddPaymentDialogClose = () => {
    setOpenAddPaymentDialog(false);
    refetch();
  };

  // ViewPayment Popup Start
  const [openeViewPaymentDialog, setOpenViewPaymentDialog] = useState<boolean>(false);

  const handleViewPaymentDialogOpen = (saleId: number) => {
    setSelectedSaleId(saleId)
    setOpenViewPaymentDialog(true);
  };
  const handleViewPaymentDialogClose = () => {
    setOpenViewPaymentDialog(false);
  };

  // GenerateInvoice Popup Start
  const [openeGenerateInvoiceDialog, setOpenGenerateInvoiceDialog] = useState<boolean>(false);

  const handleGenerateInvoiceDialogOpen = (saleId: number) => {
    setSelectedSaleId(saleId)
    setOpenGenerateInvoiceDialog(true);
  };
  const handleGenerateInvoiceDialogClose = () => {
    setOpenGenerateInvoiceDialog(false);
  };

  // View Sale Popup Start
  const [openViewSaleDialog, setOpenViewSaleDialog] = useState<boolean>(false);

  const handleViewSale = (saleId: number) => {
    setSelectedSaleId(saleId)
    setOpenViewSaleDialog(true);
  };
  const handleViewSaleDialogClose = () => {
    setOpenViewSaleDialog(false);
    setSelectedSaleId(undefined);
  };


  // Handlers for sorting
  const handleRequestSort = (property: keyof TSaleInterface) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Handler for selecting/deselecting all items
  const handleSelectAllClick = (checked: boolean) => {
    if (checked) {
      setSelected(salesData?.data.map((sales: any) => sales.id));
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

  const handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = salesData?.data.filter((item: any) =>
    item.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  // Function to sort data
  const sortedRows = filteredData.slice().sort((a: any, b: any) => {
    if (!orderBy) return 0;
    const isAsc = order === 'asc';
    const aValue = a[orderBy as keyof TSaleInterface];
    const bValue = b[orderBy as keyof TSaleInterface];
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

  const handleDocument = (type: string) => {
    if (!salesData?.data?.length) return;

    const headers = [
      "ID",
      "Sale Date",
      "Reference Number",
      "Customer",
      "Warehouse",
      "Biller",
      "Status",
      "Total Amount",
      "Quantity Sold",
    ];

    // Map data for CSV as strings and for PDF as arrays
    const rows = salesData.data.map((item: any) => [
      item.id,
      item.saleDate,
      item.referenceNumber,
      item.customerName,
      item.warehouseName,
      item.billerName,
      item.saleStatus,
      item.totalAmount,
      item.totalQuantitySold
    ]);

    if (type === "csv") {
      // Convert rows to CSV format (string)
      const csvRows = rows.map((row: (string | number)[]) => row.join(","));
      const csvContent = [headers.join(","), ...csvRows].join("\n");

      // Create a Blob and trigger download
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      saveAs(blob, "sale_list.csv");
    } else if (type === "pdf") {
      // Generate PDF
      const doc = new jsPDF();

      autoTable(doc, {
        head: [headers],
        body: rows,
        startY: 20,
        theme: "grid",
        headStyles: { fillColor: [22, 160, 133] },
      });

      // Save the PDF
      doc.save("sale_list.pdf");
    }
  };


  return (

    <>
      <div className="invenShopfy-content-area px-4 sm:px-7">
        <div className="invenShopfy-salelist-area bg-white p-5 sm:p-7 custom-shadow rounded-8 mt-7">
          <div className="invenShopfy-product-top-btn flex flex-wrap gap-5 mb-7">
            <Link className='invenShopfy-btn secondary-btn' href="/trading/sales/newsale"><span><i className="fa-regular fa-circle-plus"></i></span>Add Sale</Link>
            <div className="file-import-btn-wrapper">
              <Link className='invenShopfy-btn primary-btn' href="/report/salereport"><span><i className="fa-regular fa-file-chart-column"></i></span>Sales Reports</Link>
            </div>
          </div>
          <div className="invenShopfy-table-header-search-area">
            <div className="grid grid-cols-12 gap-x-5 gap-y-4 mb-7 pb-0.5">
              <div className="col-span-12 md:col-span-7 lg:col-span-7 xl:col-span-5">
                <div className="invenShopfy-table-header-search relative">
                  <input
                    type="text"
                    placeholder="Search List"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <span><i className="fa-sharp fa-regular fa-magnifying-glass"></i></span>
                </div>
              </div>
              <div className="col-span-12 md:col-span-5 lg:col-span-5 xl:col-span-7">
                <div className="invenShopfy-action-btn-wrapper md:justify-end">
                  <div className="invenShopfy-list-action-style is-filter teal-btn">
                    <PopupState variant="popover">
                      {(popupState: any) => (
                        <React.Fragment>
                          <button className='' type='button' {...bindTrigger(popupState)}>
                            <svg id="filter" xmlns="http://www.w3.org/2000/svg" width="15.766" height="13.34" viewBox="0 0 15.766 13.34"><path id="Path_196" data-name="Path 196" d="M18.159,6.213H9.67A1.214,1.214,0,0,0,8.457,5H7.245A1.214,1.214,0,0,0,6.032,6.213H3.606a.606.606,0,1,0,0,1.213H6.032A1.214,1.214,0,0,0,7.245,8.638H8.457A1.214,1.214,0,0,0,9.67,7.426h8.489a.606.606,0,1,0,0-1.213ZM7.245,7.426V6.213H8.457v.6s0,0,0,0,0,0,0,0v.6Z" transform="translate(-3 -5)" fill="#611bcb"></path><path id="Path_197" data-name="Path 197" d="M18.159,14.213H14.521A1.214,1.214,0,0,0,13.308,13H12.1a1.214,1.214,0,0,0-1.213,1.213H3.606a.606.606,0,1,0,0,1.213h7.277A1.214,1.214,0,0,0,12.1,16.638h1.213a1.214,1.214,0,0,0,1.213-1.213h3.638a.606.606,0,1,0,0-1.213ZM12.1,15.426V14.213h1.213v.6s0,0,0,0,0,0,0,0v.6Z" transform="translate(-3 -8.149)" fill="#611bcb"></path><path id="Path_198" data-name="Path 198" d="M18.159,22.213H9.67A1.214,1.214,0,0,0,8.457,21H7.245a1.214,1.214,0,0,0-1.213,1.213H3.606a.606.606,0,0,0,0,1.213H6.032a1.214,1.214,0,0,0,1.213,1.213H8.457A1.214,1.214,0,0,0,9.67,23.426h8.489a.606.606,0,0,0,0-1.213ZM7.245,23.426V22.213H8.457v.6s0,0,0,0,0,0,0,0v.6Z" transform="translate(-3 -11.298)" fill="#611bcb"></path></svg>  Filter
                          </button>
                          <Menu {...bindMenu(popupState)}>
                            <MenuItem onClick={() => { handleRequestSort("salesDate"); popupState.close() }}>Date</MenuItem>
                            <MenuItem onClick={() => { handleRequestSort("customerName"); popupState.close() }}>Customer Name</MenuItem>
                            <MenuItem onClick={() => { handleRequestSort("paymentStatus"); popupState.close() }}>Payment Status</MenuItem>
                          </Menu>
                        </React.Fragment>
                      )}
                    </PopupState>
                  </div>
                  <button onClick={() => handleDocument("pdf")} type="button" className="invenShopfy-action-btn warning-btn">
                    <span><svg id="pdf-file" xmlns="http://www.w3.org/2000/svg" width="19.027" height="19.72" viewBox="0 0 19.027 19.72"><path id="Path_188" data-name="Path 188" d="M82.8,209H81.578a.578.578,0,0,0-.578.58l.009,4.389a.578.578,0,1,0,1.155,0v-1.333l.636,0a1.817,1.817,0,1,0,0-3.634Zm0,2.478-.639,0c0-.246,0-.511,0-.664,0-.131,0-.4,0-.661H82.8a.662.662,0,1,1,0,1.323Z" transform="translate(-78.227 -200.95)" fill="#ff9720"></path><path id="Path_189" data-name="Path 189" d="M210.784,209h-1.207a.578.578,0,0,0-.578.579s.009,4.246.009,4.262a.578.578,0,0,0,.578.576h0c.036,0,.9,0,1.241-.009a2.449,2.449,0,0,0,2.253-2.7C213.083,210.088,212.159,209,210.784,209Zm.025,4.251c-.15,0-.407,0-.647.006,0-.5,0-2.581-.006-3.1h.628c1.06,0,1.143,1.188,1.143,1.553C211.927,212.467,211.582,213.238,210.81,213.251Z" transform="translate(-201.297 -200.95)" fill="#ff9720"></path><path id="Path_190" data-name="Path 190" d="M355.344,209a.578.578,0,1,0,0-1.155h-1.766a.578.578,0,0,0-.578.578v4.358a.578.578,0,0,0,1.155,0v-1.643H355.2a.578.578,0,1,0,0-1.155h-1.048V209Z" transform="translate(-339.75 -199.837)" fill="#ff9720"></path><path id="Path_191" data-name="Path 191" d="M26.294,5.585H25.87V5.42a2.877,2.877,0,0,0-.792-1.987L22.678.9a2.9,2.9,0,0,0-2.1-.9H12.89a1.735,1.735,0,0,0-1.733,1.733V5.585h-.424A1.735,1.735,0,0,0,9,7.318v6.933a1.735,1.735,0,0,0,1.733,1.733h.424v2A1.735,1.735,0,0,0,12.89,19.72H24.137a1.735,1.735,0,0,0,1.733-1.733v-2h.424a1.735,1.735,0,0,0,1.733-1.733V7.318A1.735,1.735,0,0,0,26.294,5.585ZM12.312,1.733a.578.578,0,0,1,.578-.578h7.691a1.74,1.74,0,0,1,1.258.541l2.4,2.531a1.726,1.726,0,0,1,.475,1.192v.165h-12.4Zm12.4,16.254a.578.578,0,0,1-.578.578H12.89a.578.578,0,0,1-.578-.578v-2h12.4Zm2.157-3.736a.578.578,0,0,1-.578.578H10.733a.578.578,0,0,1-.578-.578V7.318a.578.578,0,0,1,.578-.578h15.56a.578.578,0,0,1,.578.578Z" transform="translate(-9 0)" fill="#ff9720"></path></svg></span>
                  </button>
                  <button onClick={() => handleDocument("csv")} type="button" className="invenShopfy-action-btn secondary-btn">
                    <span><svg id="csv" xmlns="http://www.w3.org/2000/svg" width="18.105" height="18.105" viewBox="0 0 18.105 18.105"><path id="Path_184" data-name="Path 184" d="M16.514,8.558h-.566V4.774a.535.535,0,0,0-.155-.375h0L11.55.155A.535.535,0,0,0,11.174,0H3.748A1.593,1.593,0,0,0,2.157,1.591V8.558H1.591A1.593,1.593,0,0,0,0,10.149v6.365a1.593,1.593,0,0,0,1.591,1.591H16.514a1.593,1.593,0,0,0,1.591-1.591V10.149A1.593,1.593,0,0,0,16.514,8.558ZM11.7,1.811l2.432,2.432h-1.9a.531.531,0,0,1-.53-.53Zm-8.487-.22a.531.531,0,0,1,.53-.53h6.9V3.713A1.593,1.593,0,0,0,12.235,5.3h2.652V8.558H3.218ZM17.045,16.514a.531.531,0,0,1-.53.53H1.591a.531.531,0,0,1-.53-.53V10.149a.531.531,0,0,1,.53-.53H16.514a.531.531,0,0,1,.53.53Z" transform="translate(0 0)" fill="#27db8d"></path><path id="Path_185" data-name="Path 185" d="M92.591,303.061a.531.531,0,0,1,.53.53.53.53,0,1,0,1.061,0,1.591,1.591,0,0,0-3.183,0v2.122a1.591,1.591,0,1,0,3.183,0,.53.53,0,0,0-1.061,0,.53.53,0,1,1-1.061,0v-2.122A.531.531,0,0,1,92.591,303.061Z" transform="translate(-87.782 -291.321)" fill="#27db8d"></path><path id="Path_186" data-name="Path 186" d="M212.591,304.122a.53.53,0,1,1,.375-.906.53.53,0,0,0,.75-.75,1.591,1.591,0,1,0-1.125,2.717.53.53,0,1,1-.375.906.53.53,0,1,0-.75.75,1.591,1.591,0,1,0,1.125-2.717Z" transform="translate(-203.539 -291.321)" fill="#27db8d"></path><path id="Path_187" data-name="Path 187" d="M333.778,302.013a.531.531,0,0,0-.643.386l-.546,2.185-.546-2.185a.53.53,0,1,0-1.029.257l1.061,4.243a.53.53,0,0,0,1.029,0l1.061-4.243A.53.53,0,0,0,333.778,302.013Z" transform="translate(-319.293 -291.317)" fill="#27db8d"></path></svg></span>
                  </button>
                  <button onClick={() => handleDocument("csv")} type="button" className="invenShopfy-action-btn">
                    <span><svg id="printer" xmlns="http://www.w3.org/2000/svg" width="19.26" height="19.26" viewBox="0 0 19.26 19.26"><path id="Path_192" data-name="Path 192" d="M16.439,4.853h-.527V2.821A2.824,2.824,0,0,0,13.091,0H6.169A2.824,2.824,0,0,0,3.348,2.821V4.853H2.821A2.824,2.824,0,0,0,0,7.674v4.514a2.824,2.824,0,0,0,2.821,2.821h.527v2.558A1.7,1.7,0,0,0,5.041,19.26h9.178a1.7,1.7,0,0,0,1.693-1.693V15.009h.527a2.824,2.824,0,0,0,2.821-2.821V7.674A2.824,2.824,0,0,0,16.439,4.853ZM4.476,2.821A1.7,1.7,0,0,1,6.169,1.129h6.921a1.7,1.7,0,0,1,1.693,1.693V4.853H4.476ZM14.783,17.567a.565.565,0,0,1-.564.564H5.041a.565.565,0,0,1-.564-.564V12H14.783Zm3.348-5.379a1.7,1.7,0,0,1-1.693,1.693h-.527V12h.339a.564.564,0,1,0,0-1.129H3.009a.564.564,0,1,0,0,1.129h.339v1.881H2.821a1.7,1.7,0,0,1-1.693-1.693V7.674A1.7,1.7,0,0,1,2.821,5.981H16.439a1.7,1.7,0,0,1,1.693,1.693Z" fill="#2c6ae5"></path><path id="Path_193" data-name="Path 193" d="M204.574,353h-3.009a.564.564,0,1,0,0,1.128h3.009a.564.564,0,1,0,0-1.128Z" transform="translate(-193.439 -339.721)" fill="#2c6ae5"></path><path id="Path_194" data-name="Path 194" d="M204.574,417h-3.009a.564.564,0,1,0,0,1.129h3.009a.564.564,0,1,0,0-1.129Z" transform="translate(-193.439 -401.314)" fill="#2c6ae5"></path><path id="Path_195" data-name="Path 195" d="M67.37,193H65.564a.564.564,0,1,0,0,1.128H67.37a.564.564,0,1,0,0-1.128Z" transform="translate(-62.555 -185.74)" fill="#2c6ae5"></path></svg></span>
                  </button>
                </div>
              </div>
            </div>
            <div className="invenShopfy-manageproduct-table-area">
              <div className="invenShopfy-common-mat-list w-full mt-0.5">
                <div className="inner max2Xl:overflow-x-scroll minMax3Xl:overflow-x-scroll">
                  <div className='min-w-[1350px] xl:w-full'>
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
                                  indeterminate={selected.length > 0 && selected.length < salesData?.data.length}
                                  checked={salesData?.data.length > 0 && selected.length === salesData?.data.length}
                                  onChange={(e) => handleSelectAllClick(e.target.checked)}
                                />
                              </TableCell>
                              {/* Table headers */}
                              <TableCell>
                                <TableSortLabel
                                  active={orderBy === 'salesDate'}
                                  direction={orderBy === 'salesDate' ? order : 'asc'}
                                  onClick={() => handleRequestSort('salesDate')}
                                >
                                  Date
                                </TableSortLabel>
                              </TableCell>
                              <TableCell>
                                <TableSortLabel
                                  active={orderBy === 'referenceNumber'}
                                  direction={orderBy === 'referenceNumber' ? order : 'asc'}
                                  onClick={() => handleRequestSort('referenceNumber')}
                                >
                                  Reference
                                </TableSortLabel>
                              </TableCell>
                              <TableCell>
                                <TableSortLabel
                                  active={orderBy === 'customerName'}
                                  direction={orderBy === 'customerName' ? order : 'asc'}
                                  onClick={() => handleRequestSort('customerName')}
                                >
                                  Customer
                                </TableSortLabel>
                              </TableCell>
                              <TableCell>
                                <TableSortLabel
                                  active={orderBy === 'warehouseName'}
                                  direction={orderBy === 'warehouseName' ? order : 'asc'}
                                  onClick={() => handleRequestSort('warehouseName')}
                                >
                                  Warehouse
                                </TableSortLabel>
                              </TableCell>
                              <TableCell>
                                <TableSortLabel
                                  active={orderBy === 'paymentStatus'}
                                  direction={orderBy === 'paymentStatus' ? order : 'asc'}
                                  onClick={() => handleRequestSort('paymentStatus')}
                                >
                                  Status
                                </TableSortLabel>
                              </TableCell>
                              <TableCell>
                                <TableSortLabel
                                  active={orderBy === 'billerName'}
                                  direction={orderBy === 'billerName' ? order : 'asc'}
                                  onClick={() => handleRequestSort('billerName')}
                                >
                                  biller
                                </TableSortLabel>
                              </TableCell>
                              <TableCell>
                                <TableSortLabel
                                  active={orderBy === 'totalAmount'}
                                  direction={orderBy === 'totalAmount' ? order : 'asc'}
                                  onClick={() => handleRequestSort('totalAmount')}
                                >
                                  Grand Total
                                </TableSortLabel>
                              </TableCell>

                              <TableCell>
                                <TableSortLabel
                                  active={orderBy === 'totalQuantitySold'}
                                  direction={orderBy === 'totalQuantitySold' ? order : 'asc'}
                                  onClick={() => handleRequestSort('totalQuantitySold')}
                                >
                                  Quantity Sold
                                </TableSortLabel>
                              </TableCell>
                              <TableCell>
                                <TableSortLabel>
                                  Action
                                </TableSortLabel>
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          {/* Table body */}
                          <TableBody>
                            {/* Rows */}
                            {salesLoading ? (
                              <tr>
                                <td colSpan={14}>
                                  <div className="invenShopfy-loading-container">
                                    <span className="invenShopfy-loading"></span>
                                  </div>
                                </td>
                              </tr>
                            ) : salesData?.message === "User is not authorized to do this task" ? (
                              <tr>
                                <td colSpan={14}>
                                  <div className="invenShopfy-loading-container">
                                    <h1>User is not authorized to do this task</h1>
                                  </div>
                                </td>
                              </tr>
                            ) : (
                              sortedRows?.map((sales: any) => (
                                <TableRow
                                  key={sales.id}
                                  hover
                                  onClick={() => handleClick(sales.id)}
                                  role="checkbox"
                                  aria-checked={isSelected(sales.id)}
                                  selected={isSelected(sales.id)}
                                >
                                  {/* Checkbox for row selection */}
                                  <TableCell>
                                    <Checkbox checked={isSelected(sales.id)} />
                                  </TableCell>
                                  {/* Data cells */}
                                  <TableCell>{sales.saleDate}</TableCell>
                                  <TableCell>{sales.referenceNumber}</TableCell>
                                  <TableCell>{sales.customerName}</TableCell>
                                  <TableCell>{sales.warehouseName}</TableCell>
                                  <TableCell>
                                    {
                                      sales.saleStatus.toLowerCase() === "paid" ? (
                                        <span className='badge badge-success'>{sales.saleStatus}</span>
                                      ) : (
                                        sales.saleStatus.toLowerCase() === "unpaid" ? (
                                          <span className='badge badge-warning'>{sales.saleStatus}</span>
                                        ) : (<span className='badge badge-teal'>{sales.saleStatus}</span>)
                                      )
                                    }
                                  </TableCell>
                                  <TableCell>{sales.billerName}</TableCell>
                                  <TableCell>{MoneyFormat.format(sales.totalAmount)}</TableCell>
                                  <TableCell>{sales.totalQuantitySold}</TableCell>
                                  <TableCell>
                                    <div className="invenShopfy-list-action-style">
                                      <PopupState variant="popover">
                                        {(popupState: any) => (
                                          <React.Fragment>
                                            <button className='' type='button' {...bindTrigger(popupState)}>
                                              Action <i className="fa-sharp fa-solid fa-sort-down"></i>
                                            </button>
                                            <Menu {...bindMenu(popupState)}>
                                              <MenuItem onClick={() => { handleViewSale(sales.id); popupState.close() }}> <i className="fa-regular fa-eye"></i>View Sale</MenuItem>
                                              <MenuItem onClick={popupState.close}><i className="fa-regular fa-pen-to-square"></i><Link href='/trading/sales/newsale'>Add Sale</Link></MenuItem>
                                              <MenuItem onClick={() => { handleGenerateInvoiceDialogOpen(sales.id); popupState.close() }}> <i className="fa-regular fa-print"></i>Generate Invoice</MenuItem>
                                              <MenuItem
                                                onClick={() => {
                                                  if (sales.saleStatus !== "Paid") {
                                                    handleAddPaymentDialogOpen(sales.id);
                                                    popupState.close();
                                                  }
                                                }}
                                                disabled={sales.saleStatus === "Paid"}
                                                style={{
                                                  color: sales.saleStatus === "Paid" ? '#c0c0c0' : 'inherit',
                                                  pointerEvents: sales.saleStatus === "Paid" ? 'none' : 'auto'
                                                }}
                                              >
                                                <i className={`fa-regular fa-circle-plus ${sales.saleStatus !== "Paid" ? '' : 'disabled'}`}></i>
                                                Add Payment
                                              </MenuItem>
                                              {/* <MenuItem onClick={() => {handleViewPaymentDialogOpen();  popupState.close()}}> <i className="fa-regular fa-money-check-dollar"></i>View Payment</MenuItem> */}

                                              <MenuItem
                                                onClick={() => { if (sales.saleStatus == "Paid") { handleViewPaymentDialogOpen(sales.id); popupState.close() } }}
                                                disabled={sales.saleStatus !== "Paid"}
                                                style={{
                                                  color: sales.saleStatus !== "Paid" ? '#c0c0c0' : 'inherit',
                                                  pointerEvents: sales.saleStatus !== "Paid" ? 'none' : 'auto'
                                                }}
                                              >
                                                <i className={`fa-regular fa-money-check-dollar ${sales.saleStatus === "Paid" ? '' : 'disabled'}`}></i>
                                                View Payment
                                              </MenuItem>
                                              <MenuItem onClick={popupState.close}><i className="fa-light fa-trash-can"></i> Delete</MenuItem>
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
                  </div>
                </div>
                <div className="invenShopfy-pagination-area">
                  {/* Pagination */}
                  <TablePagination
                    component="div"
                    count={salesData?.totalCount || 0}
                    rowsPerPage={currentPageSize}
                    page={currentPageNumber - 1}
                    onPageChange={(_, newPage) => handlePageChange(null, newPage + 1)}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ViewSalePopup saleId={selectedSaleId} open={openViewSaleDialog} handleViewSaleDialogClose={handleViewSaleDialogClose} />
      <TradingSalesListAddPayemnt saleId={selectedSaleId} open={openeAddPaymentDialog} handleAddPaymentDialogClose={handleAddPaymentDialogClose} />
      <TradingSalesListViewPayment saleId={selectedSaleId} open={openeViewPaymentDialog} handleViewPaymentDialogClose={handleViewPaymentDialogClose} />
      <TradingSalesListInvoice saleId={selectedSaleId} open={openeGenerateInvoiceDialog} handleGenerateInvoiceDialogClose={handleGenerateInvoiceDialogClose} />
    </>


  );
}

export default SaleList