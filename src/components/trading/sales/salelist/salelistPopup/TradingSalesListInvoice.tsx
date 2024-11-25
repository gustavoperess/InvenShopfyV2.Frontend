import React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import logo from '../../../../../../public/assets/img/logo/login-logo.png';
import Image from 'next/image';
import { useGetSalesBySaleIdQuery } from '@/services/Sales/Sales';
import { MoneyFormat } from '@/interFace/interFace';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface GenerateInvoicePopupProps {
    open: boolean;
    saleId: number | undefined;
    handleGenerateInvoiceDialogClose: () => void;
}
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const TradingSalesListInvoice = ({ open, saleId, handleGenerateInvoiceDialogClose }: GenerateInvoicePopupProps) => {
    const { data: salesData, error: salesError, isLoading: salesLoading, refetch } = useGetSalesBySaleIdQuery(
        saleId as number, 
        { skip: saleId === undefined }
    );


    const dummyData = (e: any) => {
        e.preventDefault();
    };



    const handleGenerateInvoicePDF = () => {
        const doc = new jsPDF();
      
        // Invoice Title
        doc.setFontSize(20);
        doc.setTextColor(44, 106, 229); // Primary blue
        doc.text("Invoice", 105, 15, { align: "center" });
      
        // Invoice Meta Information (Date, Reference, etc.)
        const metaInfo = [
          { label: "Date:", value: salesData?.data[0]?.saleDate || "N/A" },
          { label: "Reference:", value: salesData?.data[0]?.referenceNumber || "N/A" },
          { label: "Warehouse:", value: salesData?.data[0]?.warehouseName || "N/A" },
          { label: "Sale Status:", value: salesData?.data[0]?.saleStatus || "N/A" },
        ];
      
        metaInfo.forEach((item, index) => {
          doc.setFontSize(12);
          doc.setTextColor(0, 0, 0); // Black text
          doc.text(`${item.label} ${item.value}`, 14, 30 + index * 8);
        });
      
        // From Section
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text("From:", 14, 60);
        doc.text(`Name: ${salesData?.data[0]?.billerName || "N/A"}`, 14, 66);
        doc.text(`Email: ${salesData?.data[0]?.billerEmail || "N/A"}`, 14, 72);
        doc.text(`Phone: ${salesData?.data[0]?.billerPhoneNumber || "N/A"}`, 14, 78);
      
        // To Section
        doc.text("To:", 105, 60);
        doc.text(`Name: ${salesData?.data[0]?.customerName || "N/A"}`, 105, 66);
        doc.text(`Email: ${salesData?.data[0]?.customerEmail || "N/A"}`, 105, 72);
        doc.text(`Phone: +${salesData?.data[0]?.customerPhoneNumber || "N/A"}`, 105, 78);
        doc.text(`Address: ${salesData?.data[0]?.customerAddress || "N/A"}`, 105, 84);
      
        // Product Table
        autoTable(doc, {
          startY: 90,
          head: [["SL", "Products", "Reference No", "Unit", "Unit Price", "Qty", "Sub Total"]],
          body: salesData?.data
            ? salesData.data.map((product: any, index: number) => [
                index + 1,
                product.productName || "N/A",
                product.referenceNumber || "N/A",
                product.unitShortName || "N/A",
                MoneyFormat.format(product.productPrice) || "N/A",
                product.totalQuantitySoldPerProduct || "N/A",
                MoneyFormat.format(product.totalPricePerProduct) || "N/A",
              ])
            : [["", "No products available", "", "", "", "", ""]],
          theme: "grid",
          headStyles: { fillColor: [44, 106, 229], textColor: 255 }, // Header style
          bodyStyles: { fontSize: 10, cellPadding: 3 },
        });
      
        // Additional Information (Footer)
        // doc.text("Sales Note:", 14, doc.lastAutoTable.finalY + 10);
        // doc.text(salesData?.data[0]?.saleNote || "N/A", 14, doc.lastAutoTable.finalY + 16);
        // doc.text("Remarks:", 14, doc.lastAutoTable.finalY + 22);
        // doc.text(salesData?.data[0]?.staffNote || "N/A", 14, doc.lastAutoTable.finalY + 28);
      
        // Save PDF
        doc.save("invoice.pdf");
      };
      



    return (
        <>
            <div className='inventual-common-modal'>
                <BootstrapDialog
                    onClose={handleGenerateInvoiceDialogClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <div className='inventual-modal-title'>
                        <h4>Generate Invoice</h4>
                        <button
                            autoFocus
                            onClick={handleGenerateInvoiceDialogClose}
                            type='button'>
                            <i className="fa-regular fa-xmark"></i>
                        </button>
                    </div>
                    <DialogContent dividers>
                        <div className='inventual-common-modal-width width-full'>
                            <form onSubmit={dummyData}>
                                <div className="inventual-invoice-popup-area">
                                    <div className="inventual-invoice-popup-logo text-center mt-7 mb-10">
                                        <Image src={logo}  style={{ width: 'auto', height: 'auto' }} alt="logo img" />
                                    </div>
                                    <div className="inventual-invoice-popup-heading mb-11">
                                        <ul className="bg-primary rounded-[3px] flex flex-wrap justify-between items-center px-4 py-3 gap-y-2">
                                            <li className=" flex gap-[5px] flex-wrap pe-4 me-4 border-e border-solid border-border text-white m-0">
                                                <span className="text-[14px font-bold inline-block">Date : </span>
                                                <span className="text-[14px font-normal inline-block ps-1">{salesData?.data[0].saleDate}</span>
                                            </li>
                                            <li className=" flex gap-[5px] flex-wrap pe-4 me-4 border-e border-solid border-border text-white m-0">
                                                <span className="text-[14px font-bold inline-block">Reference : </span>
                                                <span className="text-[14px font-normal inline-block ps-1">{salesData?.data[0].referenceNumber}</span>
                                            </li>
                                            <li className="flex gap-[5px] flex-wrap pe-4 me-4 border-e border-solid border-border text-white m-0">
                                                <span className="text-[14px font-bold inline-block">Warehouse : </span>
                                                <span className="text-[14px font-normal inline-block ps-1">{salesData?.data[0].warehouseName}</span>
                                            </li>
                                            <li className=' flex gap-[5px] flex-wrap text-white'>
                                                <span className="text-[14px font-bold inline-block m-0">Sale Status : </span>
                                                <span className="text-[14px font-normal inline-block ps-1">{salesData?.data[0].saleStatus}</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="inventual-invoice-popup-address-area flex justify-between flex-wrap mb-9 pb-0.5 gap-y-7">
                                        <div className="inventual-invoice-popup-address whitespace-nowrap">
                                            <div className="inventual-invoice-popup-address-inner text-start">
                                                <h5>From</h5>
                                                <ul>
                                                    <li>Name : <span>{salesData?.data[0].billerName}</span></li>
                                                    <li>Email : <span>{salesData?.data[0].billerEmail}</span></li>
                                                    <li>Phone : <span>{salesData?.data[0].billerPhoneNumber}</span></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="inventual-invoice-popup-address">
                                            <div className="inventual-invoice-popup-address-inner text-start">
                                                <h5>To</h5>
                                                <ul>
                                                    <li>Name : <span>{salesData?.data[0].customerName}</span></li>
                                                    <li>Email : <span>{salesData?.data[0].customerEmail}</span></li>
                                                    <li>Phone : <span>+{salesData?.data[0].customerPhoneNumber}</span></li>
                                                    <li>Address : <span>{salesData?.data[0].customerAddress}</span></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    {/******** Table Start********/}
                                    <div className=" mb-5">
                                        <div className="inventual-common-small-table mt-0.5 xs:overflow-x-auto">
                                            <table>
                                                <thead>
                                                    <tr className='bg-lightest'>
                                                        <th>SL</th>
                                                        <th>Products</th>
                                                        <th>Reference No</th>
                                                        <th>Unit</th>
                                                        <th>Unit Price</th>
                                                        <th>Qty</th>
                                                        <th>Sub Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        salesData?.data != undefined ? (
                                                            salesData?.data.map((product : any) => <tr key={product.productId}>
                                                                <td>{product.productId}</td>
                                                                <td>{product.productName}</td>
                                                                <td>{product.referenceNumber}</td>
                                                                <td>{product.unitShortName}</td>
                                                                <td>{MoneyFormat.format(product.productPrice)}</td>
                                                                <td>{product.totalQuantitySoldPerProduct}</td>
                                                                <td>{MoneyFormat.format(product.totalPricePerProduct)}</td>
                                                            </tr>)
                                                        ) : <tr>
                                                            <td colSpan={7} className='text-center'>Data not found</td>
                                                        </tr>
                                                    }
                                                    <tr>
                                                        <td colSpan={6}>Shipping Cost : </td>
                                                        <td>{MoneyFormat.format(salesData?.data[0].shippingCost)}</td>

                                                    </tr>
                                                    <tr>
                                                        <td colSpan={6}>Order Discount : </td>
                                                        <td>{salesData?.data[0].discount}%</td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={6}>Order Tax : </td>
                                                        <td>{MoneyFormat.format(salesData?.data[0].taxAmount)}</td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={6}><span className='font-semibold text-heading'>Grand Total : </span></td>
                                                        <td> <span className='font-semibold text-heading'>{MoneyFormat.format(salesData?.data[0].totalAmount)}</span></td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={6}>Paid Amount : </td>
                                                        <td>{MoneyFormat.format(salesData?.data[0].totalAmount)}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    {/******** Table End********/}
                                    <div className="inventual-invoice-popup-address pt-5 pb-1">
                                        <div className="inventual-invoice-popup-address-inner text-start">
                                            <ul>
                                            <li>Sales Note : <span>{salesData?.data[0].saleNote}</span></li>
                                                <li >Remarks : <span>{salesData?.data[0].staffNote}</span></li>
                                                <li>Created by : <span>{salesData?.data[0].billerName}</span></li>
                                                <li><span>{salesData?.data[0].billerEmail}</span></li> 
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="inventual-invoice-popup-btn inventual-table-header-search-action-btn">
                                        <button onClick={() => handleGenerateInvoicePDF()} type="button" className="printer"><svg id="printer" xmlns="http://www.w3.org/2000/svg" width="19.26" height="19.26" viewBox="0 0 19.26 19.26">
                                            <path id="Path_192" data-name="Path 192" d="M16.439,4.853h-.527V2.821A2.824,2.824,0,0,0,13.091,0H6.169A2.824,2.824,0,0,0,3.348,2.821V4.853H2.821A2.824,2.824,0,0,0,0,7.674v4.514a2.824,2.824,0,0,0,2.821,2.821h.527v2.558A1.7,1.7,0,0,0,5.041,19.26h9.178a1.7,1.7,0,0,0,1.693-1.693V15.009h.527a2.824,2.824,0,0,0,2.821-2.821V7.674A2.824,2.824,0,0,0,16.439,4.853ZM4.476,2.821A1.7,1.7,0,0,1,6.169,1.129h6.921a1.7,1.7,0,0,1,1.693,1.693V4.853H4.476ZM14.783,17.567a.565.565,0,0,1-.564.564H5.041a.565.565,0,0,1-.564-.564V12H14.783Zm3.348-5.379a1.7,1.7,0,0,1-1.693,1.693h-.527V12h.339a.564.564,0,1,0,0-1.129H3.009a.564.564,0,1,0,0,1.129h.339v1.881H2.821a1.7,1.7,0,0,1-1.693-1.693V7.674A1.7,1.7,0,0,1,2.821,5.981H16.439a1.7,1.7,0,0,1,1.693,1.693Z" fill="#2c6ae5" />
                                            <path id="Path_193" data-name="Path 193" d="M204.574,353h-3.009a.564.564,0,1,0,0,1.128h3.009a.564.564,0,1,0,0-1.128Z" transform="translate(-193.439 -339.721)" fill="#2c6ae5" />
                                            <path id="Path_194" data-name="Path 194" d="M204.574,417h-3.009a.564.564,0,1,0,0,1.129h3.009a.564.564,0,1,0,0-1.129Z" transform="translate(-193.439 -401.314)" fill="#2c6ae5" />
                                            <path id="Path_195" data-name="Path 195" d="M67.37,193H65.564a.564.564,0,1,0,0,1.128H67.37a.564.564,0,1,0,0-1.128Z" transform="translate(-62.555 -185.74)" fill="#2c6ae5" />
                                        </svg> Print
                                        </button>
                                        <button type="button" className="pdf"><svg xmlns="http://www.w3.org/2000/svg" width="19.45" height="15.56" viewBox="0 0 19.45 15.56">
                                            <g id="Layer_3" data-name="Layer 3" transform="translate(-1 -4)">
                                                <path id="Path_217" data-name="Path 217" d="M18.058,4H3.392A2.394,2.394,0,0,0,1,6.392V17.168A2.394,2.394,0,0,0,3.392,19.56H18.058a2.394,2.394,0,0,0,2.392-2.392V6.392A2.394,2.394,0,0,0,18.058,4ZM3.392,5.3H18.058a1.1,1.1,0,0,1,1.1,1.1v.5l-8.428,5.418L2.3,6.888v-.5a1.1,1.1,0,0,1,1.1-1.1ZM18.058,18.263H3.392a1.1,1.1,0,0,1-1.1-1.1V8.429l8.078,5.193a.648.648,0,0,0,.7,0l8.078-5.193v8.739a1.1,1.1,0,0,1-1.1,1.1Z" fill="#ff9720" />
                                            </g>
                                        </svg> Email
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </DialogContent>
                </BootstrapDialog>
            </div>
        </>
    );
};

export default TradingSalesListInvoice;