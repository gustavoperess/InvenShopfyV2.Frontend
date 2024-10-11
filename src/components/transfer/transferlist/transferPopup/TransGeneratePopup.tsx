import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import logo from '../../../../../public/assets/img/logo/login-logo.png';
import Image from 'next/image';

interface GenerateInvoicePopupProps {
    open: boolean;
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

const TransGeneratePopup = ({ open, handleGenerateInvoiceDialogClose }: GenerateInvoicePopupProps) => {

    const dummyData = (e: any) => {
        e.preventDefault();
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
                        <button autoFocus onClick={handleGenerateInvoiceDialogClose} type='button'><i className="fa-regular fa-xmark"></i></button>
                    </div>
                    <DialogContent dividers>
                        <div className='inventual-common-modal-width width-full'>
                            <form onSubmit={dummyData}>
                                <div className="inventual-invoice-popup-area">
                                    <div className="inventual-invoice-popup-logo text-center mt-7 mb-10">
                                        <Image src={logo} style={{ width: 'auto', height: 'auto' }} alt="logo img" />
                                    </div>
                                    <div className="inventual-invoice-popup-heading mb-11">
                                        <ul className="bg-primary rounded-[3px] flex flex-wrap items-center px-4 py-3 gap-y-2">
                                            <li className="pe-4 me-4 border-e border-solid border-border text-white m-0">
                                                <span className="text-[14px font-bold inline-block">Date :</span>
                                                <span className="text-[14px font-normal inline-block ps-1">12/13/2022</span>
                                            </li>
                                            <li className="pe-4 me-4 border-e border-solid border-border text-white m-0">
                                                <span className="text-[14px font-bold inline-block">Reference :</span>
                                                <span className="text-[14px font-normal inline-block ps-1">S-5852987452</span>
                                            </li>
                                            <li className="pe-4 me-4 border-e border-solid border-border text-white m-0">
                                                <span className="text-[14px font-bold inline-block">Warehouse :</span>
                                                <span className="text-[14px font-normal inline-block ps-1">Warehouse 1</span>
                                            </li>
                                            <li className='text-white'>
                                                <span className="text-[14px font-bold inline-block m-0">Sale Status :</span>
                                                <span className="text-[14px font-normal inline-block ps-1">Completed</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="inventual-invoice-popup-address-area flex justify-between flex-wrap mb-9 pb-0.5 gap-y-7">
                                        <div className="inventual-invoice-popup-address">
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
                                    <div className="inventual-invoice-table-area">
                                        <div className="inventual-invoice-table-inner border border-solid border-gray-borderThree border-b-0">
                                            <div className="inventual-invoice-table-inner-wrapper">
                                                <div className="inventual-invoice-table-list h-12 bg-gray-bg">
                                                    <div className="inventual-invoice-table-sl border-e border-solid border-gray-borderThree">
                                                        <h5>SL</h5>
                                                    </div>
                                                    <div className="inventual-invoice-table-product border-e border-solid border-gray-borderThree">
                                                        <h5>Products</h5>
                                                    </div>
                                                    <div className="inventual-invoice-table-batch border-e border-solid border-gray-borderThree">
                                                        <h5>Batch No</h5>
                                                    </div>
                                                    <div className="inventual-invoice-table-unit border-e border-solid border-gray-borderThree">
                                                        <h5>Unit</h5>
                                                    </div>
                                                    <div className="inventual-invoice-table-price border-e border-solid border-gray-borderThree">
                                                        <h5>Unit Price</h5>
                                                    </div>
                                                    <div className="inventual-invoice-table-qty border-e border-solid border-gray-borderThree">
                                                        <h5>Qty</h5>
                                                    </div>
                                                    <div className="inventual-invoice-table-tax border-e border-solid border-gray-borderThree">
                                                        <h5>Tax</h5>
                                                    </div>
                                                    <div className="inventual-invoice-table-discount border-e border-solid border-gray-borderThree">
                                                        <h5>Discount</h5>
                                                    </div>
                                                    <div className="inventual-invoice-table-total">
                                                        <h5>Sub Total</h5>
                                                    </div>
                                                </div>
                                                <div className="inventual-invoice-table-list custom-height-70">
                                                    <div className="inventual-invoice-table-sl border-e border-solid border-gray-borderThree">
                                                        <span>01</span>
                                                    </div>
                                                    <div className="inventual-invoice-table-product border-e border-solid border-gray-borderThree">
                                                        <span>3D Cannon Camera</span>
                                                    </div>
                                                    <div className="inventual-invoice-table-batch border-e border-solid border-gray-borderThree">
                                                        <span>30566205</span>
                                                    </div>
                                                    <div className="inventual-invoice-table-unit border-e border-solid border-gray-borderThree">
                                                        <span>pc</span>
                                                    </div>
                                                    <div className="inventual-invoice-table-price border-e border-solid border-gray-borderThree">
                                                        <span>25.00</span>
                                                    </div>
                                                    <div className="inventual-invoice-table-qty border-e border-solid border-gray-borderThree">
                                                        <span>1</span>
                                                    </div>
                                                    <div className="inventual-invoice-table-tax border-e border-solid border-gray-borderThree">
                                                        <span>8 (10%)</span>
                                                    </div>
                                                    <div className="inventual-invoice-table-discount border-e border-solid border-gray-borderThree">
                                                        <span>10 (5%)</span>
                                                    </div>
                                                    <div className="inventual-invoice-table-total">
                                                        <span>23.00</span>
                                                    </div>
                                                </div>
                                                <div className="inventual-invoice-table-list custom-height-70">
                                                    <div className="inventual-invoice-table-sl border-e border-solid border-gray-borderThree">
                                                        <span>01</span>
                                                    </div>
                                                    <div className="inventual-invoice-table-product border-e border-solid border-gray-borderThree">
                                                        <span>Green Lemon</span>
                                                    </div>
                                                    <div className="inventual-invoice-table-batch border-e border-solid border-gray-borderThree">
                                                        <span>30566206</span>
                                                    </div>
                                                    <div className="inventual-invoice-table-unit border-e border-solid border-gray-borderThree">
                                                        <span>kg</span>
                                                    </div>
                                                    <div className="inventual-invoice-table-price border-e border-solid border-gray-borderThree">
                                                        <span>70.00</span>
                                                    </div>
                                                    <div className="inventual-invoice-table-qty border-e border-solid border-gray-borderThree">
                                                        <span>1</span>
                                                    </div>
                                                    <div className="inventual-invoice-table-tax border-e border-solid border-gray-borderThree">
                                                        <span>0 (0%)</span>
                                                    </div>
                                                    <div className="inventual-invoice-table-discount border-e border-solid border-gray-borderThree">
                                                        <span>0 (0%)</span>
                                                    </div>
                                                    <div className="inventual-invoice-table-total">
                                                        <span>70.00</span>
                                                    </div>
                                                </div>
                                                <div className="inventual-invoice-table-list h-10">
                                                    <div className="inventual-invoice-table-sll">
                                                        <h5>Total =</h5>
                                                    </div>
                                                    <div className="inventual-invoice-table-batch"></div>
                                                    <div className="inventual-invoice-table-unit"></div>
                                                    <div className="inventual-invoice-table-price"></div>
                                                    <div className="inventual-invoice-table-qty"></div>
                                                    <div className="inventual-invoice-table-tax border-s border-solid border-gray-borderThree">
                                                        <h5>8.00</h5>
                                                    </div>
                                                    <div className="inventual-invoice-table-discount border-s border-solid border-gray-borderThree">
                                                        <h5>10.00</h5>
                                                    </div>
                                                    <div className="inventual-invoice-table-total border-s border-solid border-gray-borderThree">
                                                        <h5>93.00</h5>
                                                    </div>
                                                </div>
                                                <div className="inventual-invoice-table-list h-10">
                                                    <div className="inventual-invoice-table-sll">
                                                        <span>Order Discount :</span>
                                                    </div>
                                                    <div className="inventual-invoice-table-batch"></div>
                                                    <div className="inventual-invoice-table-unit"></div>
                                                    <div className="inventual-invoice-table-price"></div>
                                                    <div className="inventual-invoice-table-qty"></div>
                                                    <div className="inventual-invoice-table-tax"></div>
                                                    <div className="inventual-invoice-table-discount"></div>
                                                    <div className="inventual-invoice-table-total border-s border-solid border-gray-borderThree">
                                                        <span>-0.00</span>
                                                    </div>
                                                </div>
                                                <div className="inventual-invoice-table-list h-10">
                                                    <div className="inventual-invoice-table-sll">
                                                        <span>Order Tax :</span>
                                                    </div>
                                                    <div className="inventual-invoice-table-batch"></div>
                                                    <div className="inventual-invoice-table-unit"></div>
                                                    <div className="inventual-invoice-table-price"></div>
                                                    <div className="inventual-invoice-table-qty"></div>
                                                    <div className="inventual-invoice-table-tax"></div>
                                                    <div className="inventual-invoice-table-discount"></div>
                                                    <div className="inventual-invoice-table-total border-s border-solid border-gray-borderThree">
                                                        <span>+3 (2%)</span>
                                                    </div>
                                                </div>
                                                <div className="inventual-invoice-table-list h-10">
                                                    <div className="inventual-invoice-table-sll">
                                                        <h5>Grand Total :</h5>
                                                    </div>
                                                    <div className="inventual-invoice-table-batch"></div>
                                                    <div className="inventual-invoice-table-unit"></div>
                                                    <div className="inventual-invoice-table-price"></div>
                                                    <div className="inventual-invoice-table-qty"></div>
                                                    <div className="inventual-invoice-table-tax"></div>
                                                    <div className="inventual-invoice-table-discount"></div>
                                                    <div className="inventual-invoice-table-total border-s border-solid border-gray-borderThree">
                                                        <h5>96.00</h5>
                                                    </div>
                                                </div>
                                                <div className="inventual-invoice-table-list h-10">
                                                    <div className="inventual-invoice-table-sll">
                                                        <span>Paid Amount :</span>
                                                    </div>
                                                    <div className="inventual-invoice-table-batch"></div>
                                                    <div className="inventual-invoice-table-unit"></div>
                                                    <div className="inventual-invoice-table-price"></div>
                                                    <div className="inventual-invoice-table-qty"></div>
                                                    <div className="inventual-invoice-table-tax"></div>
                                                    <div className="inventual-invoice-table-discount"></div>
                                                    <div className="inventual-invoice-table-total border-s border-solid border-gray-borderThree">
                                                        <span>96.00</span>
                                                    </div>
                                                </div>
                                                <div className="inventual-invoice-table-list h-10">
                                                    <div className="inventual-invoice-table-sll">
                                                        <span>Due Amount :</span>
                                                    </div>
                                                    <div className="inventual-invoice-table-batch"></div>
                                                    <div className="inventual-invoice-table-unit"></div>
                                                    <div className="inventual-invoice-table-price"></div>
                                                    <div className="inventual-invoice-table-qty"></div>
                                                    <div className="inventual-invoice-table-tax"></div>
                                                    <div className="inventual-invoice-table-discount"></div>
                                                    <div className="inventual-invoice-table-total border-s border-solid border-gray-borderThree">
                                                        <span>0.00</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="inventual-invoice-popup-address pt-7 pb-1 mb-12">
                                        <div className="inventual-invoice-popup-address-inner text-start">
                                            <ul>
                                                <li>Sales Note : <span>N/A</span></li>
                                                <li className="pb-5">Remarks : <span>N/A</span></li>
                                                <li>Created by : <span>Richard Joseph</span></li>
                                                <li><span>info@example.com</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="inventual-invoice-popup-btn inventual-table-header-search-action-btn">
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

export default TransGeneratePopup;