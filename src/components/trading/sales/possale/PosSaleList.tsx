"use client"
import React, { useState, useEffect } from 'react';
import { MenuItem, TextField } from '@mui/material';
import Image, { StaticImageData } from 'next/image';
import MakePaymentPopup from './popup/MakePaymentPopup';
import DiscountPaymentPopup from './popup/DiscountPaymentPopup';
import { TSaleInterface, MoneyFormat, TProductInterface } from '@/interFace/interFace';
import { useGetSalesReturnByNameQuery } from '@/services/Sales/SaleReturn';
import { useGetSalesBySaleIdForPosSaleQuery } from '@/services/Sales/Sales';
import { toast } from 'react-toastify';

const PosSaleList = (
    {
 
        productInformation,
        setProductInformation, 
    }:
        {
            productInformation: TProductInterface[]; 
            setActiveProducts: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>
            setProductInformation: React.Dispatch<React.SetStateAction<TProductInterface[]>>; 

        }
) => {
    const [customerData, setCustomerData] = useState<string>('');
    const [warehouseName, setWarehouseName] = useState<string>("");

    const [customerName, setCustomerName] = useState<string>("");
    const [billerName, setBillerName] = useState<string>("");
    const [saleStatus, setSaleStatus] = useState<string>("");
    const [billerData, setBillerData] = useState<string>('');
    const [warehouseData, setWarehouseData] = useState<string>('');
    const [totalAmount, seTotalAmount] = useState<string>("");
    const [taxAmount, setTaxAmount] = useState<number>(0);
    const [profitAmount, setProfitAmount] = useState<number>(0);
    const [discountAmount, setDiscountAmount] = useState<number>(0);
    const [shippingAmount, setShippingAmount] = useState<number>(0);
    const [referenceNumber, setReferenceNumber] = useState<string>("");
    const [fetchSuggestions, setFetchSuggestions] = useState(true);
    const [suggestions, setSuggestions] = useState<TSaleInterface[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [saleId, setSaleId] = useState<number>();
    const { data: salesData, error: salesError, isLoading: salesLoading, refetch } = 
    useGetSalesBySaleIdForPosSaleQuery(saleId as number, {
        skip: saleId === undefined || saleId === null, 
    });


    const debouncedSearchTerm = useDebounce(referenceNumber, 500);

    //debounce function
    function useDebounce(value: string, delay: number) {
        const [debouncedValue, setDebouncedValue] = useState(value);

        useEffect(() => {
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);
            return () => clearTimeout(handler);
        }, [value, delay]);

        return debouncedValue;
    }

    const handleReferenceNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReferenceNumber(e.target.value);
        setFetchSuggestions(true);
    };


    const { data: productSuggestionsData, error } = useGetSalesReturnByNameQuery(debouncedSearchTerm, {
        skip: !debouncedSearchTerm.trim().length || !fetchSuggestions, // Skip API call if fetchSuggestions is false
    });


    useEffect(() => {
        if (productSuggestionsData) {
            setSuggestions(productSuggestionsData.data || []); 
         }
    
    }, [productSuggestionsData]);

    useEffect(() => {
        if (salesData && salesData.data.length > 0 && saleId) {
            setProductInformation(salesData.data);
        } else {
            setProductInformation([]);
        }
    }, [salesData, saleId]);


    const handleSuggestionSelect = (suggestion: TSaleInterface) => {
        setSaleId(suggestion.id)
        setReferenceNumber(suggestion.referenceNumber);
        setWarehouseName(suggestion.warehouseName);
        setSaleStatus(suggestion.saleStatus);
        setBillerName(suggestion.billerName);
        setCustomerName(suggestion.customerName)
        setSuggestions([]);
        setFetchSuggestions(false);
    };


    // Popup Start
    const [openMakePaymentDialog, setOpenMakePaymentDialog] = useState<boolean>(false);
    const [openDiscountPaymentDialog, setOpenDiscountPaymentDialog] = useState<boolean>(false);

    const handleMakePaymentDialogOpen = () => {
        setOpenMakePaymentDialog(true);
    };
    const handleMakePaymentDialogClose = () => {
        setOpenMakePaymentDialog(false);
    };
    const handleDiscountPaymentDialogOpen = () => {
        setOpenDiscountPaymentDialog(true);
    };
    const handleDiscountPaymentDialogClose = () => {
        setOpenDiscountPaymentDialog(false);
    };

    const handlePosFormReset = () => {
        setReferenceNumber(""); 
        setSuggestions([]); 
        setProductInformation([]); 
        setCustomerName(""); 
        setBillerName("");
        setWarehouseName("");
        setSaleStatus("");
        setSaleId(undefined); 
        setFetchSuggestions(false); 
        toast.info("Form has been reset successfully!");
    };
    

    //handle save draft
    const handleSaveDraft = () => {
        try {
            toast.success("Draft Saved successfully!");
        } catch {
            toast.error("Failed to Save. Please try again later.");
        }
    }

    const totalAmountBeforeTax = salesData?.data.reduce((accumulator: any, data: any) => {
        accumulator.totalAmountBeforeTax += data.totalPricePerProduct;
        return accumulator

    }, { totalAmountBeforeTax: 0 })

   

    return (
        <>
            <div className="invenShopfy-common-card min-h-full">
                <div className="grid grid-cols-12 gap-x-5 gap-y-6">
                    <div className="col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12">
                        <div className="invenShopfy-form-field">
                            <h5>Search by reference number</h5>
                            <div className="invenShopfy-input-field-style search-field">
                                <TextField
                                    fullWidth
                                    placeholder="B-874739"
                                    variant="outlined"
                                    value={referenceNumber}
                                    onChange={handleReferenceNumberChange}
                                />
                                {suggestions.length > 0 && (
                                    <div className='search-dropdown dropdown-scroll'>
                                        <ul>
                                            {suggestions.map((product) => (
                                                <li key={product.id} onClick={() => handleSuggestionSelect(product)}>
                                                    <p className='title'>{product.referenceNumber}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6">
                        <div className="flex items-center w-full">
                            <div className="invenShopfy-form-field w-full">
                                <div className="col-span-12 md:col-span-6">
                                    <div className="invenShopfy-formTree-field">
                                        <div className="invenShopfy-input-field-style">
                                            <TextField
                                                required
                                                value={customerName}
                                                placeholder="Customer"
                                                disabled={customerName !== ''}
                                                style={{
                                                    backgroundColor: customerName !== '' ? '#e0e0e0' : 'inherit',
                                                    color: customerName !== '' ? '#757575' : 'inherit',
                                                    width: '100%',
                                                }}>
                                            </TextField>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6">
                        <div className="flex items-center w-full">
                            <div className="invenShopfy-form-field w-full">
                                <div className="col-span-12 md:col-span-6">
                                    <div className="invenShopfy-formTree-field">
                                        <div className="invenShopfy-input-field-style">
                                            <TextField
                                                required
                                                value={billerName}
                                                placeholder="Biller"
                                                disabled={billerName !== ''}
                                                style={{
                                                    backgroundColor: billerName !== '' ? '#e0e0e0' : 'inherit',
                                                    color: billerName !== '' ? '#757575' : 'inherit',
                                                    width: '100%',
                                                }}>
                                            </TextField>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6">
                        <div className="flex items-center w-full">
                            <div className="invenShopfy-form-field w-full">
                                <div className="col-span-12 md:col-span-6">
                                    <div className="invenShopfy-formTree-field">
                                        <div className="invenShopfy-input-field-style">
                                            <TextField
                                                required
                                                value={warehouseName}
                                                placeholder="Warehouse"
                                                disabled={warehouseName !== ''}
                                                style={{
                                                    backgroundColor: warehouseName !== '' ? '#e0e0e0' : 'inherit',
                                                    color: warehouseName !== '' ? '#757575' : 'inherit',
                                                    width: '100%',
                                                }}>
                                            </TextField>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6">
                        <div className="flex items-center w-full">
                            <div className="invenShopfy-form-field w-full">
                                <div className="col-span-12 md:col-span-6">
                                    <div className="invenShopfy-formTree-field">
                                        <div className="invenShopfy-input-field-style">
                                            <TextField
                                                required
                                                value={saleStatus}
                                                placeholder="Status"
                                                disabled={saleStatus !== ''}
                                                style={{
                                                    backgroundColor: saleStatus !== '' ? '#e0e0e0' : 'inherit',
                                                    color: saleStatus !== '' ? '#757575' : 'inherit',
                                                    width: '100%',
                                                }}>
                                            </TextField>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12">
                        <div className="invenShopfy-add-adjustment-table overflow-y-scroll xl:overflow-hidden min-h-[240px]">
                            <div className="invenShopfy-common-small-table mt-0.5 w-[1150px] xl:w-full">
                                <table>
                                    <thead>
                                        <tr className='bg-lightest'>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Unit</th>
                                            <th>Qty</th>
                                            <th>Total</th>
                         
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            productInformation?.length > 0 ? (
                                                productInformation?.map((product: any) => <tr key={product.productId}>
                                                    <td>{product.productName}</td>
                                                    <td>{MoneyFormat.format(product.productPrice)}</td>
                                                    <td>{product.unitShortName}</td>
                                                    <td>{product.totalQuantitySoldPerProduct}</td>
                                                    <td>{MoneyFormat.format(product.totalPricePerProduct)}</td>
                                                </tr>)
                                            ) : (<tr>
                                                <td className='text-center' colSpan={8}>Select product at least one </td>
                                            </tr>)
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="invenShopfy-possale-total-area border-t border-[#C1D5FE] border-solid pt-6 pb-1">
                            <div className="invenShopfy-possale-total-wrapper flex justify-between flex-wrap">
                                <div className="invenShopfy-possale-total-tax mb-4">
                                    <h5 className="text-[16px] font-semibold text-heading mb-[11px]">Total Amount</h5>
                                    <div className="invenShopfy-possale-total-field small-width">
                                        <input
                                            id="tax"
                                            name="tax"
                                            type="text"
                                            placeholder={MoneyFormat.format(saleId != undefined ? totalAmountBeforeTax?.totalAmountBeforeTax ?? 0 : 0)}
                                            
                                        />
                                    </div>
                                </div>
                                <div className="invenShopfy-possale-total-tax mb-4">
                                    <h5 className="text-[16px] font-semibold text-heading mb-[11px]">Profit</h5>
                                    <div className="invenShopfy-possale-total-field small-width">
                                        <input
                                            id="tax"
                                            name="tax"
                                            type="text"
                                            placeholder={MoneyFormat.format(saleId !== undefined ? salesData?.data[0].profitAmount ?? 0 : 0)}
                                            
                                        />
                                   
                                    </div>
                                </div>
                                <div className="invenShopfy-possale-total-tax mb-4">
                                    <h5 className="text-[16px] font-semibold text-heading mb-[11px]">Tax</h5>
                                    <div className="invenShopfy-possale-total-field small-width">
                                        <input
                                            id="tax"
                                            name="tax"
                                            type="text"
                                            placeholder={MoneyFormat.format(saleId != undefined ? salesData?.data[0].taxAmount ?? 0 : 0)}
                                            
                                        />
                               
                                    </div>
                                </div>
                                <div className="invenShopfy-possale-total-discount mb-4">
                                    <h5 className="text-[16px] font-semibold text-heading mb-[11px]">Discount</h5>
                                    <div className="invenShopfy-possale-total-field small-width">
                                        <input
                                            id="discount"
                                            name="discount"
                                            type="text"
                                            placeholder={MoneyFormat.format(saleId !== undefined ? salesData?.data[0].discount ?? 0 : 0)}
                                            
                                        />
                                  
                                    </div>
                                </div>
                                <div className="invenShopfy-possale-total-shipping mb-4">
                                    <h5 className="text-[16px] font-semibold text-heading mb-[11px]">Shipping</h5>
                                    <div className="invenShopfy-possale-total-field small-width">
                                        <input
                                            id="shipping"
                                            name="shipping"
                                            type="text"
                                            placeholder={MoneyFormat.format(saleId !== undefined ? salesData?.data[0]?.shippingCost ?? 0 : 0)}
                                        />
                                    </div>
                                </div>

                            </div>
                            <h4 className="mb-7 text-[20px] h-12 leading-[46px] text-center font-bold text-heading border-[#C1D5FE] border border-solid rounded-[5px] bg-[#ecf2f8]">
                                Grand Total : {MoneyFormat.format(saleId !== undefined ? salesData?.data[0].totalAmount ?? 0:  0)}
                            </h4>
                            <div className="grid grid-cols-12 gap-y-5 sm:gap-7">
                                <div className="col-span-12 sm:col-span-3">
                                    <div className="invenShopfy-material-btn-item">
                                        <button
                                            className='invenShopfy-btn w-full secondary-btn'
                                            type="button"
                                            onClick={handlePosFormReset}>
                                            Reset All
                                        </button>
                                    </div>
                                </div>
                                <div className="col-span-12 sm:col-span-3">
                                    <div className="invenShopfy-material-btn-item">
                                        <button onClick={handleSaveDraft} className='invenShopfy-btn w-full danger-btn' type="button">Save Draft</button>
                                    </div>
                                </div>
                                <div className="col-span-12 sm:col-span-6">
                                    <div className="invenShopfy-material-btn-item">
                                        <button
                                            onClick={() => productInformation.length > 0 ? handleMakePaymentDialogOpen() : null}
                                            className={`invenShopfy-btn w-full ${productInformation.length > 0 && customerData && billerData && warehouseData ? '' : 'disabled'}`}
                                            type="button">
                                            Calculate new total
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="requir-notice-title mt-4 text-danger font-semibold text-[15px]">* Fill the required fields Customer, Biller & Warehouse.</div>
                        </div>
                    </div>
                </div>
            </div>
            <MakePaymentPopup
                calculateGrandTotal={5000}
                open={openMakePaymentDialog}
                handleMakePaymentDialogClose={handleMakePaymentDialogClose}
            />
            <DiscountPaymentPopup open={openDiscountPaymentDialog} handleDiscountPaymentDialogClose={handleDiscountPaymentDialogClose} />
        </>
    );
};

export default PosSaleList;