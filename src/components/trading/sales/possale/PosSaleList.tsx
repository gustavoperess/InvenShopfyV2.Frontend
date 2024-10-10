"use client"
import { useState } from 'react';
import { MenuItem, TextField } from '@mui/material';
import * as React from 'react';
import AddCustomerPopup from './popup/AddCustomerPopup';
import MakePaymentPopup from './popup/MakePaymentPopup';
import DiscountPaymentPopup from './popup/DiscountPaymentPopup';
import { TProduct } from '@/interFace/interFace';
import product_data from '@/data/product-data';
import { toast } from 'react-toastify';

const PosSaleList = (
    {
        productListData,
        setProductListData,
        setFilteredData,
        setActiveProducts
    }:
        {
            setFilteredData: React.Dispatch<React.SetStateAction<TProduct[]>>,
            productListData: TProduct[],
            setProductListData: React.Dispatch<React.SetStateAction<TProduct[]>>
            setActiveProducts: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>
        }
) => {
    const [customerData, setCustomerData] = useState<string>('');
    const [refNoData, setRefNoData] = useState<string>('');
    const [billerData, setBillerData] = useState<string>('');
    const [warehouseData, setWarehouseData] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [shippingAmount, setShippingAmount] = useState<number>(0);

    const handleInputChange = (event: any) => {
        const { value } = event.target;
        setSearchTerm(value);
        filterData(value);
    };

    const filterData = (searchTerm: any) => {
        const filteredData = product_data.filter((item) =>
            (item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setFilteredData(filteredData);
    };

    // Popup Start
    const [openFirstDialog, setOpenFirstDialog] = useState<boolean>(false);
    const [openMakePaymentDialog, setOpenMakePaymentDialog] = useState<boolean>(false);
    const [openDiscountPaymentDialog, setOpenDiscountPaymentDialog] = useState<boolean>(false);

    const handleFirstDialogOpen = () => {
        setOpenFirstDialog(true);
    };
    const handleFirstDialogClose = () => {
        setOpenFirstDialog(false);
    };
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
    // Popup end

    //handle remove data from selected product
    const handleRemoveData = (removeId: any) => {
        const remainingItem = productListData.filter((product) => product.id !== removeId);
        setProductListData(remainingItem);

        // Update activeProducts to remove the corresponding key
        setActiveProducts(prevState => {
            const updatedActiveProducts = { ...prevState };
            delete updatedActiveProducts[removeId];
            return updatedActiveProducts;
        });
    }

    //handle Increament
    const handleIncreament = (increaseId: any) => {
        setProductListData((prevData) => prevData.map((product) => {
            if (product.id === increaseId) {
                return {
                    ...product,
                    quantity: product.quantity + 1
                }
            }
            return product;
        }))
    }

    //handle Decreament
    const handleDecrement = (decreaseId: any) => {
        setProductListData((prevData) => prevData.map((product) => {
            if (product.id === decreaseId) {
                return {
                    ...product,
                    quantity: product.quantity - 1 >= 1 ? product.quantity - 1 : 1
                }
            }
            return product;
        }))
    }

    //calculate subtotal
    const calculateSubtotal = (product: any) => {
        let tax = 0;
        let discount = 0;
        tax = product.price * product.tax / 100;
        discount = product.price * product.discount / 100;
        const subTotal = (product.price + tax - discount) * product.quantity;
        return subTotal;
    }

    //calculate total tax
    const calculateTax = () => {
        return productListData.reduce((totalTax, product) => {
            const productTax = (product.price * product.tax / 100) * product.quantity;
            return totalTax + productTax;
        }, 0)
    }

    //calculate total discount
    const calculateDiscount = () => {
        return productListData.reduce((totalDiscount, product) => {
            const productDiscount = (product.price * product.discount / 100) * product.quantity;
            return totalDiscount + productDiscount;
        }, 0)
    }

    //calculate total
    const calculateTotal = () => {
        return productListData.reduce((total, product) => {
            return total + product.price * product.quantity;
        }, 0)
    }

    // handle shipping value change
    const handleShippingValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const amount = parseFloat(event.target.value);
        setShippingAmount(isNaN(amount) ? 0 : amount)
    };

    //grand total
    const calculateGrandTotal = calculateTotal() + shippingAmount + calculateTax() - calculateDiscount();

    //handle reset form data
    const handlePosFormReset = () => {
        setSearchTerm('');
        setWarehouseData('');
        setBillerData('');
        setCustomerData('');
        setRefNoData('');
        setShippingAmount(0);
        setProductListData([]);
        setActiveProducts({});
    }

    //handle save draft
    const handleSaveDraft = () => {
        try {
            toast.success("Draft Saved successfully!");
        } catch {
            toast.error("Failed to Save. Please try again later.");
        }
    }

    return (
        <>
            <div className="inventual-common-card min-h-full">
                <div className="grid grid-cols-12 gap-x-5 gap-y-6">
                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6">
                        <div className="flex items-center w-full">
                            <div className="inventual-form-field w-full">
                                <div className="inventual-select-field-style">
                                    <TextField
                                        id='customer'
                                        name='customer'
                                        select
                                        label="Select"
                                        defaultValue=""
                                        value={customerData}
                                        onChange={(e) => setCustomerData(e.target.value)}
                                        SelectProps={{
                                            displayEmpty: true,
                                            renderValue: (value: any) => {
                                                if (value === '') {
                                                    return <em>Select Customer</em>;
                                                }
                                                return value;
                                            },
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>Select Warehouse</em>
                                        </MenuItem>
                                        <MenuItem value="Shane Watson">Shane Watson</MenuItem>
                                        <MenuItem value="David Warner">David Warner</MenuItem>
                                        <MenuItem value="David Miller">David Miller</MenuItem>
                                        <MenuItem value="Hashim Amla">Hashim Amla</MenuItem>
                                        <MenuItem value="Imran Tahir">Imran Tahir</MenuItem>
                                        <MenuItem value="JP Duminy">JP Duminy</MenuItem>
                                        <MenuItem value="Kagiso Rabada">Kagiso Rabada</MenuItem>
                                        <MenuItem value="Kagiso Rabada">Stuart Broad</MenuItem>
                                    </TextField>
                                </div>
                            </div>
                            <button onClick={handleFirstDialogOpen} className='min-w-12 w-12 h-12 inline-flex items-center justify-center bg-primary text-white rounded-r-[3px] text-[20px]' type='button'>
                                <i className="fa-regular fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6">
                        <div className="inventual-form-field">
                            <div className="inventual-select-field-style">
                                <TextField
                                    id='biller'
                                    name='biller'
                                    select
                                    label="Select"
                                    defaultValue=""
                                    value={billerData}
                                    onChange={(e) => setBillerData(e.target.value)}
                                    SelectProps={{
                                        displayEmpty: true,
                                        renderValue: (value: any) => {
                                            if (value === '') {
                                                return <em>Select Biller</em>;
                                            }
                                            return value;
                                        },
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>Select Biller</em>
                                    </MenuItem>
                                    <MenuItem value="Shane Watson">Shane Watson</MenuItem>
                                    <MenuItem value="David Warner">David Warner</MenuItem>
                                    <MenuItem value="David Miller">David Miller</MenuItem>
                                    <MenuItem value="Hashim Amla">Hashim Amla</MenuItem>
                                    <MenuItem value="Imran Tahir">Imran Tahir</MenuItem>
                                    <MenuItem value="JP Duminy">JP Duminy</MenuItem>
                                    <MenuItem value="Kagiso Rabada">Kagiso Rabada</MenuItem>
                                    <MenuItem value="Kagiso Rabada">Stuart Broad</MenuItem>
                                </TextField>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6">
                        <div className="inventual-select-field">
                            <div className="inventual-form-field">
                                <div className="inventual-select-field-style">
                                    <TextField
                                        id='warehouse'
                                        name='warehouse'
                                        select
                                        label="Select"
                                        defaultValue=""
                                        value={warehouseData}
                                        onChange={(e) => setWarehouseData(e.target.value)}
                                        SelectProps={{
                                            displayEmpty: true,
                                            renderValue: (value: any) => {
                                                if (value === '') {
                                                    return <em>Select Warehouse</em>;
                                                }
                                                return value;
                                            },
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>Select Warehouse</em>
                                        </MenuItem>
                                        <MenuItem value="United States">United States</MenuItem>
                                        <MenuItem value="Canada">Canada</MenuItem>
                                        <MenuItem value="Mexico">Mexico</MenuItem>
                                        <MenuItem value="France">France</MenuItem>
                                        <MenuItem value="Germany">Germany</MenuItem>
                                    </TextField>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6">
                        <div className="inventual-form-field">
                            <div className="inventual-input-field-style">
                                <input
                                    value={refNoData}
                                    onChange={(e) => setRefNoData(e.target.value)}
                                    id="referenceNo"
                                    name="referenceNo"
                                    type="text"
                                    placeholder='Reference No'
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12">
                        <div className="inventual-form-field">
                            <div className="inventual-input-field-style">
                                <input
                                    id='search_id'
                                    name='search'
                                    type="text"
                                    value={searchTerm}
                                    onChange={handleInputChange}
                                    placeholder='Scan / search products by name'
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12">
                        <div className="inventual-add-adjustment-table overflow-y-scroll xl:overflow-hidden min-h-[240px]">
                            <div className="inventual-common-small-table mt-0.5 w-[1150px] xl:w-full">
                                <table>
                                    <thead>
                                        <tr className='bg-lightest'>
                                            <th>Products</th>
                                            <th>Batch No</th>
                                            <th>Price</th>
                                            <th>Tax</th>
                                            <th>Discount</th>
                                            <th>Qty</th>
                                            <th>Sub Total</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            productListData.length > 0 ? (
                                                productListData.map((product) => <tr key={product.id}>
                                                    <td>{product.title}</td>
                                                    <td>{product.batchNo}</td>
                                                    <td>${product.price}</td>
                                                    <td>{product.tax}%</td>
                                                    <td>{product.discount}%</td>
                                                    <td>
                                                        <div className="inventual-addsale-product-qty">
                                                            <span className='flex items-center'>
                                                                <button type='button' onClick={() => handleDecrement(product.id)}><i className="fa-regular fa-minus"></i></button>
                                                                <p>{product.quantity}</p>
                                                                <button type='button' onClick={() => handleIncreament(product.id)}><i className="fa-regular fa-plus"></i></button>
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td>${calculateSubtotal(product)}</td>
                                                    <td>
                                                        <div className="inventual-addsale-product-action">
                                                            <button
                                                                className="product-delete-btn"
                                                                onClick={() => handleRemoveData(product.id)}
                                                            >
                                                                <i className="fa-regular fa-xmark"></i>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>)
                                            ) : (<tr>
                                                <td className='text-center' colSpan={8}>Select product at least one </td>
                                            </tr>)
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="inventual-possale-total-area border-t border-[#C1D5FE] border-solid pt-6 pb-1">
                            <div className="inventual-possale-total-wrapper flex justify-between flex-wrap">
                                <div className="inventual-form-field small-width">
                                    <h5>Total Price</h5>
                                    <div className="inventual-input-field-style">
                                        <input
                                            type="text"
                                            placeholder='$0'
                                            defaultValue={`$${parseInt(calculateTotal().toFixed(2))}`}
                                            disabled
                                        />

                                    </div>
                                </div>
                                <div className="inventual-form-field small-width">
                                    <h5>Total Product</h5>
                                    <div className="inventual-input-field-style">
                                        <input
                                            type="text"
                                            placeholder='$0'
                                            defaultValue={productListData.length}
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className="inventual-possale-total-tax mb-4">
                                    <h5 className="text-[16px] font-semibold text-heading mb-[11px]">Total Tax</h5>
                                    <div className="inventual-possale-total-field small-width">
                                        <input
                                            id="tax"
                                            name="tax"
                                            type="text"
                                            placeholder="$8.00"
                                            defaultValue={parseInt(calculateTax().toFixed(2))}
                                            disabled
                                        />
                                        <button type="button">$</button>
                                    </div>
                                </div>
                                <div className="inventual-possale-total-discount mb-4">
                                    <h5 className="text-[16px] font-semibold text-heading mb-[11px]">Total Discount</h5>
                                    <div className="inventual-possale-total-field small-width">
                                        <input
                                            id="discount"
                                            name="discount"
                                            type="text"
                                            placeholder="$25.00"
                                            defaultValue={parseInt(calculateDiscount().toFixed(2))}
                                            disabled
                                        />
                                        <button onClick={handleDiscountPaymentDialogOpen} type='button'>$</button>
                                    </div>
                                </div>
                                <div className="inventual-possale-total-shipping mb-4">
                                    <h5 className="text-[16px] font-semibold text-heading mb-[11px]">Shipping</h5>
                                    <div className="inventual-possale-total-field small-width">
                                        <input
                                            id="shipping"
                                            name="shipping"
                                            type="text"
                                            placeholder="0"
                                            value={shippingAmount}
                                            onChange={handleShippingValue}
                                        />
                                        <button type="button">$</button>
                                    </div>
                                </div>

                            </div>
                            <h4 className="mb-7 text-[20px] h-12 leading-[46px] text-center font-bold text-heading border-[#C1D5FE] border border-solid rounded-[5px] bg-[#ecf2f8]">
                                Grand Total : ${parseInt(calculateGrandTotal.toFixed(2))}
                            </h4>
                            <div className="grid grid-cols-12 gap-y-5 sm:gap-7">
                                <div className="col-span-12 sm:col-span-3">
                                    <div className="inventual-material-btn-item">
                                        <button
                                            className='inventual-btn w-full secondary-btn'
                                            type="button"
                                            onClick={handlePosFormReset}
                                        >
                                            Reset All
                                        </button>
                                    </div>
                                </div>
                                <div className="col-span-12 sm:col-span-3">
                                    <div className="inventual-material-btn-item">
                                        <button onClick={handleSaveDraft} className='inventual-btn w-full danger-btn' type="button">Save Draft</button>
                                    </div>
                                </div>
                                <div className="col-span-12 sm:col-span-6">
                                    <div className="inventual-material-btn-item">
                                        <button
                                            onClick={() => productListData.length > 0 && customerData && billerData && warehouseData ? handleMakePaymentDialogOpen() : null}
                                            className={`inventual-btn w-full ${productListData.length > 0 && customerData && billerData && warehouseData ? '' : 'disabled'}`}
                                            type="button"
                                        >
                                            Make Payment
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
                calculateGrandTotal={calculateGrandTotal}
                open={openMakePaymentDialog}
                handleMakePaymentDialogClose={handleMakePaymentDialogClose}
            />
            <AddCustomerPopup open={openFirstDialog} handleFirstDialogClose={handleFirstDialogClose} />
            <DiscountPaymentPopup open={openDiscountPaymentDialog} handleDiscountPaymentDialogClose={handleDiscountPaymentDialogClose} />
        </>
    );
};

export default PosSaleList;