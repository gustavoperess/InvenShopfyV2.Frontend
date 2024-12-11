import React, { useRef, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import logo from '../../../../../../public/assets/img/logo/login-logo.png';
import Image from 'next/image';
import { useGetSalesReturnByIdQuery } from '@/services/Sales/SaleReturn';
import { MoneyFormat } from '@/interFace/interFace';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface SaleReturnPopupProps {
    open: boolean;
    returnId: number | undefined;
    handleViewDialogClose: () => void;
}
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


const SaleReturnPopup = ({ open, returnId, handleViewDialogClose }: SaleReturnPopupProps) => {
    const { data: salesReturnData, error: salesReturnError, isLoading: salesReturnLoading, refetch } = useGetSalesReturnByIdQuery(
        returnId as number,
        { skip: returnId === undefined }
    );
    useEffect(() => {
        if (returnId !== undefined) {
            refetch();
        }
    }, [returnId, refetch]);


    const handleGenerateInvoicePDF = () => {
        if (!salesReturnData || !salesReturnData.data) return;
    
        const doc = new jsPDF();
        let finalY = 0;
    
        // Invoice Title
        doc.setFontSize(20);
        doc.setTextColor(44, 106, 229); // Primary blue
        doc.text("Invoice", 105, 15, { align: "center" });
    
        // Invoice Meta Information (Date, Reference, etc.)
        const metaInfo = [
            { label: "Date:", value: salesReturnData.data.returnDate || "N/A" },
            { label: "Reference:", value: salesReturnData.data.referenceNumber || "N/A" },
            { label: "Warehouse:", value: salesReturnData.data.warehouseName || "N/A" },
            { label: "Sale Status:", value: salesReturnData.data.remarkStatus || "N/A" },
        ];
    
        metaInfo.forEach((item, index) => {
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0); // Black text
            doc.text(`${item.label} ${item.value}`, 14, 30 + index * 8);
        });
    
        // From Section
        doc.text("From:", 14, 60);
        doc.text(`Name: ${salesReturnData.data.billerName || "N/A"}`, 14, 66);
    
        // To Section
        doc.text("To:", 105, 60);
        doc.text(`Name: ${salesReturnData.data.customerName || "N/A"}`, 105, 66);
    
        // Product Table (Single Item)
        const product = salesReturnData.data.salesReturnProductDetails; // Assuming it's not an array
        // autoTable(doc, {
        //     startY: 90,
        //     head: [["SL", "Products", "Reference No", "Unit", "Unit Price", "Qty", "Sub Total"]],
        //     body: [
        //         [
        //             1, // Serial number
        //             product.productName || "N/A",
        //             product.referenceNumber || "N/A",
        //             product.unitShortName || "N/A",
        //             MoneyFormat.format(product.productPrice) || "N/A",
        //             product.totalQuantitySoldPerProduct || "N/A",
        //             MoneyFormat.format(product.totalPricePerProduct) || "N/A",
        //         ],
        //     ],
        //     theme: "grid",
        //     headStyles: { fillColor: [44, 106, 229], textColor: 255 }, // Header style
        //     bodyStyles: { fontSize: 10, cellPadding: 3 },
        // });
    
        // finalY = (doc as any).lastAutoTable.finalY;
    
        // Additional Information (Footer)
        doc.text("Sales Note:", 14, finalY + 10);
        doc.text(salesReturnData.data.returnNote || "N/A", 14, finalY + 16);
        doc.text("Remarks:", 14, finalY + 22);
        doc.text(salesReturnData.data.remarkStatus || "N/A", 14, finalY + 28);
    
        // Total Amount
        doc.text("Total Amount:", 14, finalY + 34);
        doc.text(MoneyFormat.format(salesReturnData.data.returnTotalAmount) || "N/A", 14, finalY + 40);
    
        // Save PDF
        doc.save("invoice.pdf");
    };
    
    
    

    return (
        <>
            <div className='invenShopfy-common-modal'>
                <BootstrapDialog
                    onClose={handleViewDialogClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <DialogContent dividers className='no-border'>
                        <div className='invenShopfy-common-modal-width width-full'>
                            <div className="invenShopfy-invoice-popup-area">
                                <div className="invenShopfy-invoice-popup-logo text-center mt-7 mb-10">
                                    <Image src={logo} style={{ width: 'auto', height: 'auto' }} alt="logo img" />
                                </div>
                                {/******** Table Start********/}
                                <div className=" mb-5">
                                    <div className="invenShopfy-common-small-table mt-0.5 xs:overflow-x-auto">
                                        <table>
                                            <thead>
                                                <tr className='bg-lightest'>
                                                    <th>Date</th>
                                                    <th>Reference</th>
                                                    <th>Customer</th>
                                                    <th>Warehouse</th>
                                                    <th>Biller</th>
                                                    <th>Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr key={salesReturnData?.data.id}>
                                                    <td>{salesReturnData?.data.returnDate}</td>
                                                    <td>{salesReturnData?.data.referenceNumber}</td>
                                                    <td>{salesReturnData?.data.customerName}</td>
                                                    <td>{salesReturnData?.data.warehouseName}</td>
                                                    <td>{salesReturnData?.data.customerName}</td>
                                                    <td>{MoneyFormat.format(salesReturnData?.data.returnTotalAmount)}</td> 
                                                </tr>
                                                <tr>
                                                    <td colSpan={5}><span className='font-semibold text-heading'>Total = </span></td>
                                                    <td><span className='font-semibold text-heading'>{MoneyFormat.format(salesReturnData?.data.returnTotalAmount)}</span></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                {/******** Table End********/}
                                <div className="invenShopfy-invoice-popup-address pt-5 pb-1">
                                    <div className="invenShopfy-invoice-popup-address-inner text-start">
                                        <ul>
                                            <li>Sales Note : <span>{salesReturnData?.data.returnNote}</span></li>
                                            <li >Remarks : <span>{salesReturnData?.data.remarkStatus}</span></li>
                                            <li>Created by : <span>{salesReturnData?.data.billerName}</span></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="invenShopfy-invoice-popup-btn invenShopfy-table-header-search-action-btn">
                                    <button onClick={handleViewDialogClose} type="button" className="cancel"> Cancel</button>
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
                        </div>
                    </DialogContent>
                </BootstrapDialog>
            </div>
        </>
    );
};

export default SaleReturnPopup;