import React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import logo from '../../../../../../public/assets/img/logo/login-logo.png';
import Image from 'next/image';

interface GenerateInvoicePopupProps {
    open: boolean;
    handlePaymentInvoiceDialogClose: () => void;
}
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

interface GenerateInvoiceListData {
    sl: string;
    product: string;
    batchNo: string;
    unit: string;
    unitPrice: number;
    quantity: number;
    tax: number;
    discount: number;
    subTotal: number;
}
const MakePaymentInvoice = ({ open, handlePaymentInvoiceDialogClose }: GenerateInvoicePopupProps) => {

    const sampleData: GenerateInvoiceListData[] = [
        {
            sl: '01',
            product: '3D Cannon Camera',
            batchNo: '30566205',
            unit: 'Pc',
            unitPrice: 25,
            quantity: 1,
            tax: 10,
            discount: 5,
            subTotal: 23,
        },
        {
            sl: '02',
            product: 'Green Lemon',
            batchNo: '30566206',
            unit: 'Kg',
            unitPrice: 70,
            quantity: 1,
            tax: 0,
            discount: 0,
            subTotal: 60,
        },
    ]

    const dummyData = (e: any) => {
        e.preventDefault();
    };

    return (
        <>
            <div className='inventual-common-modal'>
                <BootstrapDialog
                    onClose={handlePaymentInvoiceDialogClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    
                    <DialogContent dividers className='no-border'>  
                        <div className='inventual-common-modal-width width-full'>
                            <form onSubmit={dummyData}>
                                <div className="inventual-invoice-popup-area">
                                    <div className="inventual-invoice-popup-logo text-center mt-7 mb-10">
                                        <Image src={logo} style={{ width: 'auto', height: 'auto' }} alt="logo img" />
                                    </div>
                                    <div className="inventual-invoice-popup-heading mb-11">
                                        <ul className="bg-primary rounded-[3px] flex flex-wrap justify-between items-center px-4 py-3 gap-y-2">
                                            <li className=" flex gap-[5px] flex-wrap pe-4 me-4 border-e border-solid border-border text-white m-0">
                                                <span className="text-[14px font-bold inline-block">Date : </span>
                                                <span className="text-[14px font-normal inline-block ps-1">12/13/2022</span>
                                            </li>
                                            <li className=" flex gap-[5px] flex-wrap pe-4 me-4 border-e border-solid border-border text-white m-0">
                                                <span className="text-[14px font-bold inline-block">Reference : </span>
                                                <span className="text-[14px font-normal inline-block ps-1">S-5852987452</span>
                                            </li>
                                            <li className="flex gap-[5px] flex-wrap pe-4 me-4 border-e border-solid border-border text-white m-0">
                                                <span className="text-[14px font-bold inline-block">Warehouse : </span>
                                                <span className="text-[14px font-normal inline-block ps-1">Warehouse 1</span>
                                            </li>
                                            <li className=' flex gap-[5px] flex-wrap text-white'>
                                                <span className="text-[14px font-bold inline-block m-0">Sale Status : </span>
                                                <span className="text-[14px font-normal inline-block ps-1">Completed</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="inventual-invoice-popup-address-area flex justify-between flex-wrap mb-9 pb-0.5 gap-y-7">
                                        <div className="inventual-invoice-popup-address whitespace-nowrap">
                                            <div className="inventual-invoice-popup-address-inner text-start">
                                                <h5>From</h5>
                                                <ul>
                                                    <li>Name : <span>Richard Joseph</span></li>
                                                    <li>Email : <span>info@example.com</span></li>
                                                    <li>Phone : <span>+02 782 930 782</span></li>
                                                    <li>Address : <span>Milton Street, New York, USA</span></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="inventual-invoice-popup-address">
                                            <div className="inventual-invoice-popup-address-inner text-start">
                                                <h5>To</h5>
                                                <ul>
                                                    <li>Name : <span>Walk - in - Customer</span></li>
                                                    <li>Email : <span>N/A</span></li>
                                                    <li>Phone : <span>+02 202 396 228</span></li>
                                                    <li>Address : <span>Kashba, New York, USA</span></li>
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
                                                        <th>Batch No</th>
                                                        <th>Unit</th>
                                                        <th>Unit Price</th>
                                                        <th>Qty</th>
                                                        <th>Tax</th>
                                                        <th>Discount</th>
                                                        <th>Sub Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        sampleData.length > 0 ? (
                                                            sampleData.map((product, index) => <tr key={index}>
                                                                <td>{product.sl}</td>
                                                                <td>{product.product}</td>
                                                                <td>{product.batchNo}</td>
                                                                <td>{product.unit}</td>
                                                                <td>${product.unitPrice}</td>
                                                                <td>{product.quantity}</td>
                                                                <td>{product.tax}%</td>
                                                                <td>{product.discount}%</td>
                                                                <td>${product.subTotal}</td>
                                                            </tr>)
                                                        ) : <tr>
                                                            <td colSpan={9} className='text-center'>Data not found</td>
                                                        </tr>
                                                    }
                                                    <tr>
                                                        <td colSpan={6}><span className='font-semibold text-heading'>Total = </span></td>
                                                        <td><span className='font-semibold text-heading'>8.00</span></td>
                                                        <td><span className='font-semibold text-heading'>10.00</span></td>
                                                        <td><span className='font-semibold text-heading'>93.00</span></td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={8}>Order Discount : </td>
                                                        <td>-0.00</td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={8}>Order Tax : </td>
                                                        <td>+3 (2%)</td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={8}><span className='font-semibold text-heading'>Grand Total : </span></td>
                                                        <td> <span className='font-semibold text-heading'>96.00</span></td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={8}>Paid Amount : </td>
                                                        <td>96.00</td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={8}>Due Amount : </td>
                                                        <td>0.00</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    {/******** Table End********/}
                                    <div className="inventual-invoice-popup-address pt-5 pb-1">
                                        <div className="inventual-invoice-popup-address-inner text-start">
                                            <ul>
                                                <li>Sales Note : <span>N/A</span></li>
                                                <li >Remarks : <span>N/A</span></li>
                                                <li>Created by : <span>Richard Joseph</span></li>
                                                <li><span>info@example.com</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="inventual-invoice-popup-btn inventual-table-header-search-action-btn">
                                        <button onClick={handlePaymentInvoiceDialogClose} type="button" className="cancel"> Cancel</button>
                                        <button type="button" className="printer"><svg id="printer" xmlns="http://www.w3.org/2000/svg" width="19.26" height="19.26" viewBox="0 0 19.26 19.26">
                                            <path id="Path_192" data-name="Path 192" d="M16.439,4.853h-.527V2.821A2.824,2.824,0,0,0,13.091,0H6.169A2.824,2.824,0,0,0,3.348,2.821V4.853H2.821A2.824,2.824,0,0,0,0,7.674v4.514a2.824,2.824,0,0,0,2.821,2.821h.527v2.558A1.7,1.7,0,0,0,5.041,19.26h9.178a1.7,1.7,0,0,0,1.693-1.693V15.009h.527a2.824,2.824,0,0,0,2.821-2.821V7.674A2.824,2.824,0,0,0,16.439,4.853ZM4.476,2.821A1.7,1.7,0,0,1,6.169,1.129h6.921a1.7,1.7,0,0,1,1.693,1.693V4.853H4.476ZM14.783,17.567a.565.565,0,0,1-.564.564H5.041a.565.565,0,0,1-.564-.564V12H14.783Zm3.348-5.379a1.7,1.7,0,0,1-1.693,1.693h-.527V12h.339a.564.564,0,1,0,0-1.129H3.009a.564.564,0,1,0,0,1.129h.339v1.881H2.821a1.7,1.7,0,0,1-1.693-1.693V7.674A1.7,1.7,0,0,1,2.821,5.981H16.439a1.7,1.7,0,0,1,1.693,1.693Z" fill="#2c6ae5" />
                                            <path id="Path_193" data-name="Path 193" d="M204.574,353h-3.009a.564.564,0,1,0,0,1.128h3.009a.564.564,0,1,0,0-1.128Z" transform="translate(-193.439 -339.721)" fill="#2c6ae5" />
                                            <path id="Path_194" data-name="Path 194" d="M204.574,417h-3.009a.564.564,0,1,0,0,1.129h3.009a.564.564,0,1,0,0-1.129Z" transform="translate(-193.439 -401.314)" fill="#2c6ae5" />
                                            <path id="Path_195" data-name="Path 195" d="M67.37,193H65.564a.564.564,0,1,0,0,1.128H67.37a.564.564,0,1,0,0-1.128Z" transform="translate(-62.555 -185.74)" fill="#2c6ae5" />
                                        </svg> Print
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

export default MakePaymentInvoice;