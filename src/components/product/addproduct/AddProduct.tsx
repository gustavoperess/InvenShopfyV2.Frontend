"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { MenuItem, TextField } from '@mui/material';
import dropProductImg from '../../../../public/assets/img/icon/drag.png';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from '@mui/material'
import { FileUploader } from 'react-drag-drop-files';
const fileTypes = ["JPG", "PNG", "GIF"];

const AddProduct = () => {


    //react drag and drop image
    const [files, setFiles] = useState<File[]>([]);
    const handleChange = (file: File) => {
        setFiles([...files, file]);
    };

    //remove drag and drop image
    const handleRemove = (index: any) => {
        const remainingFiles = files.filter((item, i) => i !== index);
        setFiles(remainingFiles);
    };

    //checked different price
    const [differentPrice, setDifferentPrice] = useState(false);

    const handleDifferentPrice = (event: any) => {
        setDifferentPrice(event.target.checked)
    }


    return (
        <>
            <div className="inventual-content-area px-4 sm:px-7">
                <div className="inventual-addproduct-area bg-white p-5 sm:p-7 custom-shadow rounded-8 mb-5 mt-7">
                    <div className="grid grid-cols-12 gap-y-7 sm:gap-7">
                        <div className="col-span-12 xl:col-span-9 lg:col-span-8 lg:order-1 maxMd:order-2">
                            <div className="grid grid-cols-12 gap-y-7 sm:gap-7">
                                <div className="col-span-12 xl:col-span-8 lg:col-span-12">
                                    <div className="inventual-select-field">
                                        <div className="inventual-form-field">
                                            <h5>Product Name</h5>
                                            <div className="inventual-input-field-style">
                                                <input type="text" placeholder='HP Elitebook' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-12 xl:col-span-4 md:col-span-6">
                                    <div className="inventual-form-field">
                                        <h5>Product Type</h5>
                                        <div className="inventual-select-field-style">
                                            <TextField
                                                select
                                                label="Select"
                                                defaultValue=""
                                                SelectProps={{
                                                    displayEmpty: true,
                                                    renderValue: (value: any) => {
                                                        if (value === '') {
                                                            return <em>Select Type</em>;
                                                        }
                                                        return value;
                                                    },
                                                }}
                                            >
                                                <MenuItem value="">
                                                    <em>Select Type</em>
                                                </MenuItem>
                                                <MenuItem value="Technology Products">Technology Products</MenuItem>
                                                <MenuItem value="Automotive Products">Automotive Products</MenuItem>
                                                <MenuItem value="Financial Products">Financial Products</MenuItem>
                                                <MenuItem value="Entertainment Products">Entertainment Products</MenuItem>
                                            </TextField>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-12 xl:col-span-4 md:col-span-6">
                                    <div className="inventual-select-field">
                                        <div className="inventual-form-field">
                                            <h5>Category</h5>
                                            <div className="inventual-select-field-style">
                                                <TextField
                                                    select
                                                    label="Select"
                                                    defaultValue=""
                                                    SelectProps={{
                                                        displayEmpty: true,
                                                        renderValue: (value: any) => {
                                                            if (value === '') {
                                                                return <em>Select Type</em>;
                                                            }
                                                            return value;
                                                        },
                                                    }}
                                                >
                                                    <MenuItem value="">
                                                        <em>Select Type</em>
                                                    </MenuItem>
                                                    <MenuItem value="Computer">Computer</MenuItem>
                                                    <MenuItem value="Television">Television</MenuItem>
                                                    <MenuItem value="Shoes">Shoes</MenuItem>
                                                    <MenuItem value="Fruits">Fruits</MenuItem>
                                                </TextField>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-12 xl:col-span-4 md:col-span-6">
                                    <div className="inventual-select-field">
                                        <div className="inventual-form-field">
                                            <h5>Product Code</h5>
                                            <div className="inventual-input-field-style">
                                                <input type="text" placeholder='8952202236' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-12 xl:col-span-4 md:col-span-6">
                                    <div className="inventual-select-field">
                                        <div className="inventual-form-field">
                                            <h5>Brand</h5>
                                            <div className="inventual-select-field-style">
                                                <TextField
                                                    select
                                                    label="Select"
                                                    defaultValue=""
                                                    SelectProps={{
                                                        displayEmpty: true,
                                                        renderValue: (value: any) => {
                                                            if (value === '') {
                                                                return <em>Select Type</em>;
                                                            }
                                                            return value;
                                                        },
                                                    }}
                                                >
                                                    <MenuItem value="">
                                                        <em>Select Type</em>
                                                    </MenuItem>
                                                    <MenuItem value="Dell">Dell</MenuItem>
                                                    <MenuItem value="Acer">Acer</MenuItem>
                                                    <MenuItem value="asus">asus</MenuItem>
                                                    <MenuItem value="HP">HP</MenuItem>
                                                    <MenuItem value="Lenovo">Lenovo</MenuItem>
                                                </TextField>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-12 xl:col-span-4 md:col-span-6">
                                    <div className="inventual-select-field">
                                        <div className="inventual-form-field">
                                            <h5>Barcode</h5>
                                            <div className="inventual-input-field-style">
                                                <input type="text" placeholder='Scan Barcode' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-12 xl:col-span-4 md:col-span-6">
                                    <div className="inventual-select-field">
                                        <div className="inventual-form-field">
                                            <h5>Product Unit</h5>
                                            <div className="inventual-select-field-style">
                                                <TextField
                                                    select
                                                    label="Select"
                                                    defaultValue=""
                                                    SelectProps={{
                                                        displayEmpty: true,
                                                        renderValue: (value: any) => {
                                                            if (value === '') {
                                                                return <em>Select Type</em>;
                                                            }
                                                            return value;
                                                        },
                                                    }}
                                                >
                                                    <MenuItem value="">
                                                        <em>Select Type</em>
                                                    </MenuItem>
                                                    <MenuItem value="Kilogra">Kilogram</MenuItem>
                                                    <MenuItem value="Meter">Meter</MenuItem>
                                                    <MenuItem value="Piece">Piece</MenuItem>
                                                </TextField>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-12 xl:col-span-4 md:col-span-6">
                                    <div className="inventual-select-field">
                                        <div className="inventual-form-field">
                                            <h5>Product Price</h5>
                                            <div className="inventual-input-field-style">
                                                <input type="text" placeholder='0' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-12 xl:col-span-4 md:col-span-6">
                                    <div className="inventual-select-field">
                                        <div className="inventual-form-field">
                                            <h5>Expense</h5>
                                            <div className="inventual-input-field-style">
                                                <input type="number" placeholder='0' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-12 xl:col-span-4 md:col-span-6">
                                    <div className="inventual-select-field">
                                        <div className="inventual-form-field">
                                            <h5>Unit Price</h5>
                                            <div className="inventual-input-field-style">
                                                <input type="number" placeholder='0' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-12 xl:col-span-4 md:col-span-6">
                                    <div className="inventual-form-field">
                                        <h5>Product Tax</h5>
                                        <div className="inventual-select-field-style">
                                            <TextField
                                                select
                                                label="Select"
                                                defaultValue=""
                                                SelectProps={{
                                                    displayEmpty: true,
                                                    renderValue: (value: any) => {
                                                        if (value === '') {
                                                            return <em>Select Type</em>;
                                                        }
                                                        return value;
                                                    },
                                                }}
                                            >
                                                <MenuItem value="">
                                                    <em>Select Type</em>
                                                </MenuItem>
                                                <MenuItem value="Vat @10%">Vat @10%</MenuItem>
                                                <MenuItem value="Vat @11%">Vat @11%</MenuItem>
                                                <MenuItem value="Vat @15%">Vat @15%</MenuItem>
                                                <MenuItem value="Vat @12%">Vat @12%</MenuItem>
                                                <MenuItem value="Vat @16%">Vat @16%</MenuItem>
                                            </TextField>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-12 xl:col-span-4 md:col-span-6">
                                    <div className="inventual-form-field">
                                        <h5>Tax Method</h5>
                                        <div className="inventual-select-field-style">
                                            <TextField
                                                select
                                                label="Select"
                                                defaultValue=""
                                                SelectProps={{
                                                    displayEmpty: true,
                                                    renderValue: (value: any) => {
                                                        if (value === '') {
                                                            return <em>Select Type</em>;
                                                        }
                                                        return value;
                                                    },
                                                }}
                                            >
                                                <MenuItem value="">
                                                    <em>Select Type</em>
                                                </MenuItem>
                                                <MenuItem value="Exclusive">Exclusive</MenuItem>
                                                <MenuItem value="Non - Exclusive">Non - Exclusive</MenuItem>
                                            </TextField>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-12 xl:col-span-4 md:col-span-6">
                                    <div className="inventual-select-field">
                                        <div className="inventual-form-field">
                                            <h5>Discount</h5>
                                            <div className="inventual-input-field-style">
                                                <input type="text" placeholder='0' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-12 xl:col-span-4 md:col-span-6">
                                    <div className="inventual-select-field">
                                        <div className="inventual-form-field">
                                            <h5>Stock Alert</h5>
                                            <div className="inventual-input-field-style">
                                                <input type="text" placeholder='0' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 xl:col-span-3 lg:col-span-4 lg:order-2 maxMd:order-1">
                            <div className='inventual-product-image-upload rounded-lg relative overflow-hidden'>
                                <FileUploader
                                    maxSize={100}
                                    classes="inventual-input-upload-btn"
                                    onDrop={(file: File) => handleChange(file)}
                                    label="Browse File"
                                    handleChange={handleChange}
                                    name="file"
                                    types={fileTypes}
                                >
                                    <div className="inventual-product-dragdrop ngx-file-drop__drop-zone text-center border border-dashed border-primary bg-[#F8FAFF]">
                                        <span className="flex justify-center items-center mb-6 pb-0.5"><Image src={dropProductImg} alt="user not found" priority /></span>
                                        <h5 className="text-[20px] font-semibold text-heading mb-4">Drop product image here</h5>
                                        <span className="block text-[20px] font-semibold text-heading mb-7">Or</span>
                                        <button type="submit" className="inventual-btn">Browse File</button>
                                        <span className="text-[14px] text-heading font-medium block pt-7">Allowed JPEG, JPG & PNG format  |  Max 100 mb</span>
                                    </div>
                                </FileUploader>
                                <div className="flex flex-wrap gap-4 mt-7">
                                    {files.map((file, index) => (
                                        <div key={index} className="inventual-drag-product-img">
                                            <Image src={URL.createObjectURL(file)} width={60} height={60} alt={`Uploaded File ${index}`} />
                                            <button className='inventual-inventual-drag-close' onClick={() => handleRemove(index)}>X</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="inventual-add-product-content mt-7">
                        <div className='inventual-checkbox-style mb-2'>
                            <FormControlLabel
                                control={<Checkbox inputProps={{ 'aria-label': 'controlled' }} />}
                                label="Add Featured"
                            />
                        </div>
                        <span className="block text-[14px] italic mb-7">This product will be displayed in POS</span>
                        <div className='inventual-checkbox-style mb-5'>
                            <FormControlLabel
                                control={<Checkbox checked={differentPrice} onChange={handleDifferentPrice} inputProps={{ 'aria-label': 'controlled' }} />}
                                label="Different price for different warehouse"
                            />
                        </div>
                        {
                            differentPrice && <div className="grid grid-cols-12 gap-y-7 sm:gap-7 mb-7">
                                <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
                                    <div className="inventual-form-field">
                                        <h5>Warehouse</h5>
                                        <div className="inventual-select-field-style">
                                            <TextField
                                                select
                                                label="Select"
                                                defaultValue=""
                                                SelectProps={{
                                                    displayEmpty: true,
                                                    renderValue: (value: any) => {
                                                        if (value === '') {
                                                            return <em>Select Type</em>;
                                                        }
                                                        return value;
                                                    },
                                                }}
                                            >
                                                <MenuItem value="">
                                                    <em>Select Type</em>
                                                </MenuItem>
                                                <MenuItem value="Warehouse 1">Warehouse 1</MenuItem>
                                                <MenuItem value="Warehouse 2">Warehouse 2</MenuItem>
                                                <MenuItem value="Warehouse 3">Warehouse 3</MenuItem>
                                            </TextField>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
                                    <div className="inventual-select-field">
                                        <div className="inventual-form-field">
                                            <h5>Price</h5>
                                            <div className="inventual-input-field-style">
                                                <input type="number" placeholder='0' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        <div className='inventual-checkbox-style mb-5'>
                            <FormControlLabel
                                control={<Checkbox inputProps={{ 'aria-label': 'controlled' }} />}
                                label="This product has date expired"
                            />
                        </div>
                        <div className='inventual-checkbox-style mb-5'>
                            <FormControlLabel
                                control={<Checkbox inputProps={{ 'aria-label': 'controlled' }} />}
                                label="Add Promotional Sale"
                            />
                        </div>
                        <div className='inventual-checkbox-style mb-5'>
                            <FormControlLabel
                                control={<Checkbox inputProps={{ 'aria-label': 'controlled' }} />}
                                label="This product has multi variant"
                            />
                        </div>
                        <div className='inventual-checkbox-style mb-5'>
                            <FormControlLabel
                                control={<Checkbox inputProps={{ 'aria-label': 'controlled' }} />}
                                label="This product has IMEI Code"
                            />
                        </div>
                        <div className="inventual-submit-btn pt-2.5">
                            <button type="submit" className="inventual-btn">Create Product</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddProduct;