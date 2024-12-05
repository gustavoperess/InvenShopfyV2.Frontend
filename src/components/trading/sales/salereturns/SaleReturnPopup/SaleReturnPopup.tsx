import React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import logo from '../../../../../../public/assets/img/logo/login-logo.png';
import Image from 'next/image';

interface SaleReturnPopupProps {
    open: boolean;
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

interface GenerateInvoiceListData {
    date: string;
    reference: string;
    customer: string;
    warehouse: string;
    biller: string;
    amount: number;
}
const SaleReturnPopup = ({ open, handleViewDialogClose }: SaleReturnPopupProps) => {

    const sampleData: GenerateInvoiceListData[] = [
        {
            date: '01/01/2024',
            reference: 'S-326564580710',
            customer: 'William Prady',
            warehouse: 'Warehouse 8',
            biller: 'Nancy R. Borgman',
            amount: 5250,
        },
    ]

    const dummyData = (e: any) => {
        e.preventDefault();
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
                            <form onSubmit={dummyData}>
                                <div className="invenShopfy-invoice-popup-area">
                                    <div className="invenShopfy-invoice-popup-logo text-center mt-7 mb-10">
                                        <Image src={logo}   style={{ width: 'auto', height: 'auto' }} alt="logo img" />
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
                                                    {
                                                        sampleData.length > 0 ? (
                                                            sampleData.map((product, index) => <tr key={index}>
                                                                <td>{product.date}</td>
                                                                <td>{product.reference}</td>
                                                                <td>{product.customer}</td>
                                                                <td>{product.warehouse}</td>
                                                                <td>{product.biller}</td>
                                                                <td>${product.amount}</td>
                                                            </tr>)
                                                        ) : <tr>
                                                            <td colSpan={9} className='text-center'>Data not found</td>
                                                        </tr>
                                                    }
                                                    <tr>
                                                        <td colSpan={5}><span className='font-semibold text-heading'>Total = </span></td>
                                                        <td><span className='font-semibold text-heading'>$5250</span></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    {/******** Table End********/}
                                    <div className="invenShopfy-invoice-popup-address pt-5 pb-1">
                                        <div className="invenShopfy-invoice-popup-address-inner text-start">
                                            <ul>
                                                <li>Sales Note : <span>N/A</span></li>
                                                <li >Remarks : <span>N/A</span></li>
                                                <li>Created by : <span>Richard Joseph</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="invenShopfy-invoice-popup-btn invenShopfy-table-header-search-action-btn">
                                        <button onClick={handleViewDialogClose} type="button" className="cancel"> Cancel</button>
                                        <button type="button" className="printer"><svg id="printer" xmlns="http://www.w3.org/2000/svg" width="19.26" height="19.26" viewBox="0 0 19.26 19.26">
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

export default SaleReturnPopup;