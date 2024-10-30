"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { Accept, useDropzone } from "react-dropzone";
import { MenuItem, TextField, FormControl, InputAdornment } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from '@mui/material'
import { useAddProductMutation } from '@/services/Product/Product';
import { useGetAllProductsUnitQuery } from '@/services/Product/Unit';
import { useGetAllProductsBrandQuery } from '@/services/Product/Brand';
import { useGetAllProductsCategoryQuery, useGetProductByIdQuery } from '@/services/Product/Category';
import { NumericFormat } from 'react-number-format';
import { toast } from 'react-toastify';


// Define the structure of the data
interface mainCategoryData {
    mainCategory: string;
    id: number;
    subCategory: string;
}

interface brandData {
    id: number;
    title: string;
}

interface unitData {
    id: number;
    title: string;
}


const AddProduct = () => {
    const [selectedCategory, setSelectedCategory] = useState<number | string>("");
    const [selectedTitle, setSelectedTitle] = useState<string>("");
    const [selectedBrand, setSelectedBrand] = useState<string>("");
    const [selectedUnit, setSelectedUnit] = useState<string>("");
    const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
    const [selectedCode, setSelectedCode] = useState<number | undefined>();
    const [featured, setFeatured] = useState<boolean | false>(false);
    const [expired, setExpired] = useState<boolean | false>(false);
    const [sale, setSale] = useState<boolean | false>(false);
    const [warehousePrice, setSelectedDiffPriceWarehouse] = useState<boolean | false>(false);
    const [productImage, setProductImage] = useState<string | null>(null);
    const [selectSubCategory, setSelectSubCategory] = useState<string>("");
    const [subCategories, setSubCategories] = useState<string[]>([]);
    const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
    const [currentPageSize, setCurrentPageSize] = useState(10);
    const { data: totalUnitData, error: totalUnitError, isLoading: totalUnitLoading } = useGetAllProductsUnitQuery({ pageNumber: currentPageNumber, pageSize: currentPageSize });
    const { data: totalBrandData, error: totalBrandError, isLoading: totalBrandLoading } = useGetAllProductsBrandQuery({ pageNumber: currentPageNumber, pageSize: currentPageSize });
    const { data: totalCategoryData, error: totalCategoryError, isLoading: totalCategoryLoading } = useGetAllProductsCategoryQuery({ pageNumber: currentPageNumber, pageSize: currentPageSize });
    const { data: subCategoryData } = useGetProductByIdQuery(Number(selectedCategory) || 0, { skip: !selectedCategory });
    const [addProduct] = useAddProductMutation();


    useEffect(() => {
        if (subCategoryData) {
            setSubCategories(subCategoryData.data.subCategory || []);
            setSelectSubCategory(''); 
        }
    }, [subCategoryData]);


    // handlers

    //handle brand submit form
    const handleFormSubmit = async (event: any) => {
        event.preventDefault()
        const productData = {
            title: selectedTitle, differPriceWarehouse: warehousePrice,
            productImage, categoryId: selectedCategory,
            subcategory: selectSubCategory, productCode: selectedCode,
            brandId: selectedBrand, unitId: selectedUnit,
            price: selectedPrice, featured, expired, sale
        };
        try {
            await addProduct(productData).unwrap();
            setSelectedTitle('');
            setProductImage(null);
            setSelectedCategory("");
            setSelectSubCategory("");
            setSelectedCode(undefined);
            setSelectedBrand("");
            setSelectedUnit("");
            setSelectedPrice(undefined);
            setFeatured(false);
            setSale(false);
            setExpired(false);
            setSelectedDiffPriceWarehouse(false);
            toast.success("Product Created Successfully!")
        } catch (error: any) {
            if (error?.data?.message) {
                toast.error(error?.data?.message);
            } else {
                // Fallback error message
                toast.error("Failed to create product. Please try again later.");
            }
        }
    }

    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedCategory(e.target.value as string);

        if (!subCategories.some(subCategory => subCategory === selectSubCategory)) {
            setSelectSubCategory(''); 
        }
    };

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64String = reader.result as string; // Cast to string
                const base64WithoutPrefix = base64String.split(',')[1]; 
                setProductImage(base64WithoutPrefix);
                // setProductImage(`data:${dataUrl}`);
            };

            reader.readAsDataURL(file); // Read the file as Data URL (Base64)
        }
    }, []);

    const accept: Accept = {
        'image/*': []
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept });


    return (
        <>
            <div className="inventual-content-area px-4 sm:px-7">
                <div className="inventual-addproduct-area bg-white p-5 sm:p-7 custom-shadow rounded-8 mb-5 mt-7">
                    <div className="grid grid-cols-12 gap-y-7 sm:gap-7">
                        <div className="col-span-12 xl:col-span-9 lg:col-span-8 lg:order-1 maxMd:order-2">
                            <form onSubmit={handleFormSubmit}>
                                <div className="grid grid-cols-12 gap-y-7 sm:gap-7">
                                    <div className="col-span-12 xl:col-span-12 lg:col-span-12">
                                        <div className="inventual-select-field">
                                            <div className="inventual-form-field">
                                            <h5>Product Name</h5>
                                            <div className="inventual-input-field-style">
                                                    <FormControl fullWidth>
                                                        <TextField 
                                                            fullWidth
                                                            placeholder="Macbook Pro*"
                                                            variant="outlined"
                                                            value={selectedTitle}
                                                            required
                                                            inputProps={{ maxLength: 80 }}
                                                            onChange={(e) => setSelectedTitle(e.target.value)}
                                                             />
                                                    </FormControl>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 xl:col-span-4 md:col-span-6">
                                        <div className="inventual-select-field">
                                            <div className="inventual-form-field">
                                                <h5>Category</h5>
                                                <div className="inventual-select-field-style">
                                                    <FormControl fullWidth>
                                                        <TextField
                                                            label="Select"
                                                            select
                                                            required
                                                            helperText="Please select a category"
                                                            value={selectedCategory}
                                                            onChange={handleCategoryChange}
                                                            fullWidth
                                                            InputLabelProps={{ shrink: true }}
                                                            SelectProps={{
                                                                displayEmpty: true,
                                                                renderValue: (value) => {
                                                                    const selectedCategoryItem = totalCategoryData?.data.find(
                                                                        (category: mainCategoryData) => category.id === Number(value)
                                                                    );
                                                                    return selectedCategoryItem ? selectedCategoryItem.mainCategory : <em>Select Category</em>;
                                                                },
                                                            }}
                                                        >
                                                            {totalCategoryData && totalCategoryData.data.length > 0 ? (
                                                                totalCategoryData.data.map((mainCategory: mainCategoryData) => (
                                                                    <MenuItem key={mainCategory.id} value={mainCategory.id}>
                                                                        {mainCategory.mainCategory}
                                                                    </MenuItem>
                                                                ))
                                                            ) : (
                                                                <MenuItem value="">
                                                                    <em>No Categories Available</em>
                                                                </MenuItem>
                                                            )}
                                                        </TextField>
                                                    </FormControl>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 xl:col-span-4 md:col-span-6">
                                        <div className="inventual-select-field">
                                            <div className="inventual-form-field">
                                                <h5>Sub-Category</h5>
                                                <div className="inventual-select-field-style">
                                                    <TextField
                                                        select
                                                        label="Select"
                                                        required
                                                        value={selectSubCategory}
                                                        onChange={(e) => setSelectSubCategory(e.target.value)}
                                                     
                                                        SelectProps={{
                                                            displayEmpty: true,
                                                            renderValue: (value: any) => {
                                                                const selectedSubCategory = subCategories.find((subCategory) => subCategory === value);
                                                                return selectedSubCategory ? selectedSubCategory : <em>Select Sub-Category</em>;
                                                            },
                                                        }}>
                                                        {subCategories.length > 0 ? (
                                                            subCategories.map((subCategory) => (
                                                                <MenuItem key={subCategory} value={subCategory}>
                                                                    {subCategory}
                                                                </MenuItem>
                                                            ))
                                                        ) : (
                                                            <MenuItem value="">
                                                                <em>No Sub-Categories Available</em>
                                                            </MenuItem>
                                                        )}
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
                                                    <FormControl fullWidth>
                                                        <TextField 
                                                            fullWidth
                                                            type="number"
                                                            required
                                                            placeholder="8952202236"
                                                            variant="outlined"
                                                            inputProps={{ min: 1, max: 10000000 }}
                                                            onChange={(e) => setSelectedCode(Number(e.target.value))}/>
                                                    </FormControl>
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
                                                        required
                                                        value={selectedBrand}
                                                        onChange={(e) => setSelectedBrand(e.target.value)}
                                                        SelectProps={{
                                                            displayEmpty: true,
                                                            renderValue: (value: any) => {
                                                                const selectedBrand = totalBrandData?.data.find((brand: brandData) => brand.id === value);
                                                                return selectedBrand ? selectedBrand.title : <em>Select Brand</em>;
                                                            },
                                                        }}>
                                                        {totalBrandData && totalBrandData.data.length > 0 ? (
                                                            totalBrandData.data.map((brand: brandData) => (
                                                                <MenuItem key={brand.id} value={brand.id}>
                                                                    {brand.title}
                                                                </MenuItem>
                                                            ))
                                                        ) : (
                                                            <MenuItem value="">
                                                                <em>No Brands Available</em>
                                                            </MenuItem>
                                                        )}
                                                    </TextField>
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
                                                        required
                                                        value={selectedUnit}
                                                        onChange={(e) => setSelectedUnit(e.target.value)}
                                                        SelectProps={{
                                                            displayEmpty: true,
                                                            renderValue: (value: any) => {
                                                                const selectedUnit = totalUnitData?.data.find((unit: unitData) => unit.id === value);
                                                                return selectedUnit ? selectedUnit.title : <em>Select Unit</em>;
                                                            },
                                                        }}>
                                                        {totalUnitData && totalUnitData.data.length > 0 ? (
                                                            totalUnitData.data.map((unit: unitData) => (
                                                                <MenuItem key={unit.id} value={unit.id}>
                                                                    {unit.title}
                                                                </MenuItem>
                                                            ))
                                                        ) : (
                                                            <MenuItem value="">
                                                                <em>No Units Available</em>
                                                            </MenuItem>
                                                        )}
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
                                                     <NumericFormat
                                                        customInput={TextField}
                                                        thousandSeparator=","
                                                        required
                                                        decimalSeparator="."
                                                        decimalScale={2}
                                                        fixedDecimalScale
                                                        value={selectedPrice ?? ''} // Display empty if `selectedPrice` is null
                                                        onValueChange={(values) => {
                                                            setSelectedPrice(values.floatValue); 
                                                        }}
                                                        InputProps={{
                                                            startAdornment: <InputAdornment position="start">£</InputAdornment>,
                                                        }}
                                                        fullWidth
                                                        variant="outlined"
                                                        placeholder="100.00"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="inventual-add-product-content mt-7">
                                    <div className='inventual-checkbox-style mb-2'>
                                        <FormControlLabel
                                            control={<Checkbox
                                                checked={featured}
                                                onChange={(e) => setFeatured(e.target.checked)}
                                                inputProps={{ 'aria-label': 'controlled' }} />}
                                            label="Add Featured"
                                        />
                                    </div>
                                    <span className="block text-[14px] italic mb-7">This product will be displayed in POS</span>
                                    <div className='inventual-checkbox-style mb-5'>
                                        <FormControlLabel
                                            control={<Checkbox
                                                checked={expired}
                                                onChange={(e) => setExpired(e.target.checked)}
                                                inputProps={{ 'aria-label': 'controlled' }} />}
                                            label="This product has date expired"
                                        />
                                    </div>
                                    <div className='inventual-checkbox-style mb-5'>
                                        <FormControlLabel
                                            control={<Checkbox
                                                checked={sale}
                                                onChange={(e) => setSale(e.target.checked)}
                                                inputProps={{ 'aria-label': 'controlled' }} />}
                                            label="Add Promotional Sale"
                                        />
                                    </div>
                                    <div className='inventual-checkbox-style mb-5'>
                                        <FormControlLabel
                                            control={<Checkbox
                                                checked={warehousePrice}
                                                onChange={(e) => setSelectedDiffPriceWarehouse(e.target.checked)}
                                                inputProps={{ 'aria-label': 'controlled' }} />}
                                            label="Different Price for other warehouses?"
                                        />
                                    </div>
                                    <div className="inventual-submit-btn pt-2.5">
                                        <button type="submit" className="inventual-btn">Create Product</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-span-12 xl:col-span-3 lg:col-span-4 lg:order-2 maxMd:order-1">
                            <div className="inventual-product-dragdrop ngx-file-drop__drop-zone text-center border border-dashed border-primary bg-[#F8FAFF] p-4">
                                <div {...getRootProps({ className: 'dropzone-two' })}>
                                    <input {...getInputProps()} />
                                    {productImage ? (
                                        <img src={`data:image/jpeg;base64,${productImage}`} alt="Selected" className="preview-image" 
                                        style={{ maxHeight: '450px', width: 'auto', objectFit: 'contain' }}
                                        />
                                    ) : (
                                        <>
                                            <h3 className="text-[20px] font-semibold text-heading mb-4">Drop product image here</h3>
                                            <span className="block text-[20px] font-semibold text-heading mb-7">Or</span>
                                            <button type="submit" className="inventual-btn">Browse File</button>
                                            <span className="text-[14px] text-heading font-medium block pt-7">Allowed JPEG, JPG & PNG format  |  Max 100 mb</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>
    );
};

export default AddProduct;