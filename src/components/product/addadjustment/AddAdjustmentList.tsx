"use client"
import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { TProductInterface, TMainCategoryInterface, TUnitInterface, TBrandInterface } from '@/interFace/interFace';
import { toast } from 'react-toastify';
import { useGetProductByNameForAdjusmentPageQuery } from '@/services/Product/Product';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Accept, useDropzone } from "react-dropzone";
import { IMaskInput } from 'react-imask';
import { CustomProps } from '@/interFace/interFace';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FilledInput, IconButton, InputAdornment, MenuItem, TextField, FormControl, Input } from '@mui/material';
import { NumericFormat } from 'react-number-format';
import { useGetAllProductsUnitQuery } from '@/services/Product/Unit';
import { useGetAllProductsBrandQuery } from '@/services/Product/Brand'
import { useGetAllProductsCategoryQuery, useGetProductByIdQuery } from '@/services/Product/Category';




const AddAdjustmentList = () => {
    const [productName, setProductName] = useState<string>("");
    const [brandId, setBrandId] = useState<string>("");
    const [unitId, setUnitId] = useState<string>("");
    const [productPrice, setProductPrice] = useState<number | undefined>();
    const [marginRange, setMarginRange] = useState<string>("5% to 10%");
    const [productImage, setProductImage] = useState<string | null>(null);
    const [subCategory, setSubCategory] = useState<string>("");
    // initial values
    const [productCateogy, setProductCategory] = useState<string | number>("");
    const [productBrand, setProductBrand] = useState<string | null>(null);
    const [productTaxPercentage, setProductTaxPercentage] = useState<number>();
    const [productUnit, setProductUnit] = useState<string | null>(null);
    const [subCategories, setSubCategories] = useState<string[]>([]);
    const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
    const [currentPageSize, setCurrentPageSize] = useState(10);
    const [suggestions, setSuggestions] = useState<TProductInterface[]>([]);
    const [fetchSuggestions, setFetchSuggestions] = useState(true);
    const { data: totalUnitData } = useGetAllProductsUnitQuery({ pageNumber: currentPageNumber, pageSize: currentPageSize }, { skip: !productUnit });
    const { data: totalBrandData } = useGetAllProductsBrandQuery({ pageNumber: currentPageNumber, pageSize: currentPageSize }, { skip: !productBrand });
    const { data: totalCategoryData } = useGetAllProductsCategoryQuery({ pageNumber: currentPageNumber, pageSize: currentPageSize }, { skip: !productCateogy });
    const { data: subCategoryData } = useGetProductByIdQuery(Number(productCateogy) || 0, { skip: !productCateogy });
    const debouncedSearchTerm = useDebounce(productName, 500);


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

    const { data: productSuggestionsData, error } = useGetProductByNameForAdjusmentPageQuery(debouncedSearchTerm, {
        skip: !debouncedSearchTerm.trim().length || !fetchSuggestions, // Skip API call if fetchSuggestions is false
    });

    useEffect(() => {
        if (productSuggestionsData) {
            setSuggestions(productSuggestionsData.data || []);
        }
    }, [productSuggestionsData]);

    useEffect(() => {
        if (subCategoryData) {
            setSubCategories(subCategoryData.data.subCategory || []);
            setSubCategory('');
        }
    }, [subCategoryData]);


    const handleSuggestionSelect = (suggestion: TProductInterface) => {
        setProductName(suggestion.productName);
        setProductBrand(suggestion.brandName);
        setProductTaxPercentage(suggestion.taxPercentage)
        setProductPrice(suggestion.productPrice);
        setProductUnit(suggestion.unitName)
        setMarginRange(suggestion.marginRange);
        setProductCategory(suggestion.mainCategoryId);
        setProductImage(suggestion.productImage);
        setSuggestions([]);
        setFetchSuggestions(false);
    };


    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductName(e.target.value);
        setFetchSuggestions(true);
    };

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64String = reader.result as string; // Cast to string
                const base64WithoutPrefix = base64String.split(',')[1];
                setProductImage(base64WithoutPrefix);
            };

            reader.readAsDataURL(file); // Read the file as Data URL (Base64)
        }
    }, []);

    const accept: Accept = {
        'image/*': []
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept });


    const handleAdjustmentForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            toast.success("Adjustment Created successfully!");


        } catch {
            toast.error("Failed to  create adjustmnet. Please try again later.");
        }
    }

    return (
        <>
            <div className="inventual-content-area px-4 sm:px-7">
                <div className="inventual-addadjustment-area bg-white p-5 sm:p-7 custom-shadow rounded-8 mt-7">
                    <form onSubmit={handleAdjustmentForm}>
                        <div className="inventual-barcode-area">
                            <div className="inventual-addbrand-upload-area flex maxSm:flex-wrap gap-7 mb-7">
                                <div className="col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-4">
                                    <div
                                        className="inventual-product-dragdrop ngx-file-drop__drop-zone text-center border border-dashed border-primary bg-[#F8FAFF] p-4"
                                        style={{ padding: "10px", marginBottom: "10px" }}
                                    >
                                        <div {...getRootProps({ className: "dropzone-two" })}>
                                            <input {...getInputProps()} />
                                            {productImage ? (
                                                <Image
                                                    src={productImage.startsWith("https") ? productImage : `data:image/jpeg;base64,${productImage}`}
                                                    className="rounded" height={300} width={300} alt="profilePicture"
                                                    style={{ maxHeight: "300px", width: "auto",objectFit: "contain" }}
                                                />
                                            ) : (
                                                <>
                                                    <h3 className="text-[20px] font-semibold text-heading mb-4">
                                                        Replace product's image
                                                    </h3>
                                                    <span className="block text-[20px] font-semibold text-heading mb-7">
                                                        Or
                                                    </span>
                                                    <button type="button" className="inventual-btn">
                                                        Browse Picture
                                                    </button>
                                                    <span className="text-[14px] text-heading font-medium block pt-7">
                                                        Allowed JPEG, JPG & PNG format | Max 100 mb
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-12 w-full gap-5">
                                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-8">
                                        <div className="inventual-form-field">
                                            <h5>Search by Product Name</h5>
                                            <div className="inventual-input-field-style search-field">
                                                <TextField
                                                    fullWidth
                                                    placeholder="Macbook..."
                                                    variant="outlined"
                                                    value={productName}
                                                    onChange={handleNameChange}
                                                />
                                                {suggestions.length > 0 && (
                                                    <div className='search-dropdown dropdown-scroll'>
                                                        <ul>
                                                            {suggestions.map((product) => (
                                                                <li key={product.id} onClick={() => handleSuggestionSelect(product)}>
                                                                    <p className='title'>{product.productName}</p>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
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
                                                        value={productPrice ?? ''}
                                                        onValueChange={(values) => {
                                                            setProductPrice(values.floatValue);
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
                                    <div className="col-span-12 xl:col-span-4 md:col-span-6">
                                        <div className="inventual-select-field">
                                            <div className="inventual-form-field">
                                                <h5>Category</h5>
                                                <div className="inventual-select-field-style">
                                                    <FormControl fullWidth>
                                                        <TextField
                                                            label="Category"
                                                            select
                                                            required
                                                            value={
                                                                totalCategoryData?.data?.some(
                                                                    (category: { id: number }) => category.id === Number(productCateogy)
                                                                )
                                                                    ? productCateogy
                                                                    : ""
                                                            } // Set to "" if no matching category found
                                                            onChange={(e) => setProductCategory(e.target.value)}
                                                            helperText="Please select a category"
                                                            fullWidth
                                                            InputLabelProps={{ shrink: true }}
                                                            SelectProps={{
                                                                displayEmpty: true,
                                                                renderValue: (value) => {
                                                                    const selectedCategory = totalCategoryData?.data.find(
                                                                        (category: { id: number }) => category.id === Number(value)
                                                                    );
                                                                    return selectedCategory ? selectedCategory.mainCategory : <em>Select Category</em>;
                                                                },
                                                            }}
                                                        >
                                                            {totalCategoryData?.data?.length > 0 ? (
                                                                totalCategoryData.data.map((category: { id: number; mainCategory: string }) => (
                                                                    <MenuItem key={category.id} value={category.id}>
                                                                        {category.mainCategory}
                                                                    </MenuItem>
                                                                ))
                                                            ) : (
                                                                <MenuItem value="">
                                                                    <em>Loading Categories...</em>
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
                                                        value={subCategory}
                                                        onChange={(e) => setSubCategory(e.target.value)}
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
                                                <h5>Brand</h5>
                                                <div className="inventual-select-field-style">
                                                    <TextField
                                                        select
                                                        label="Select"
                                                        required
                                                        value={brandId}
                                                        onChange={(e) => setBrandId(e.target.value)}
                                                        SelectProps={{
                                                            displayEmpty: true,
                                                            renderValue: (value: any) => {
                                                                return productBrand ? productBrand : <em>Select Brand</em>;
                                                            },
                                                        }}>
                                                        {totalBrandData && totalBrandData.data.length > 0 ? (
                                                            totalBrandData.data.map((brand: TBrandInterface) => (
                                                                <MenuItem key={brand.id} value={brand.id}>
                                                                    {brand.brandName}
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
                                        <div className="inventual-form-field">
                                            <h5>Tax</h5>
                                            <div className="inventual-select-field-style">
                                                <TextField
                                                    select
                                                    label="Select"
                                                    required
                                                    value={productTaxPercentage ?? 8}
                                                    onChange={(e) => setProductTaxPercentage(Number(e.target.value))}
                                                    SelectProps={{
                                                        displayEmpty: true,
                                                        renderValue: (value: any) => {
                                                            if (value === '') {
                                                                return <em>Payment Status</em>;
                                                            }
                                                            return `${value}%`;
                                                        },
                                                    }}
                                                >
                                                    <MenuItem value={5}>5%</MenuItem>
                                                    <MenuItem value={8}>8%</MenuItem>
                                                    <MenuItem value={12}>12%</MenuItem>
                                                </TextField>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 xl:col-span-4 md:col-span-6">
                                        <div className="inventual-form-field">
                                            <h5>Margin Range</h5>
                                            <div className="inventual-select-field-style">
                                                <TextField
                                                    select
                                                    label="Select"
                                                    required
                                                    value={marginRange ?? "5% to 10%"}
                                                    onChange={(e) => setMarginRange(e.target.value)}
                                                    SelectProps={{
                                                        displayEmpty: true,
                                                        renderValue: (value: any) => {
                                                            return value === '' ? <em>5% to 10%</em> : `${value}`;
                                                        },
                                                    }}>
                                                    <MenuItem value="5% to 10%">5% to 10%</MenuItem>
                                                    <MenuItem value="10% to 12%">10% to 12%</MenuItem>
                                                    <MenuItem value="12% to 14%">12% to 14%</MenuItem>
                                                </TextField>
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
                                                        value={unitId}
                                                        onChange={(e) => setUnitId(e.target.value)}
                                                        SelectProps={{
                                                            displayEmpty: true,
                                                            renderValue: (value: any) => {
                                                                return productUnit ? productUnit : <em>Select Unit</em>;
                                                            },
                                                        }}>
                                                        {totalUnitData && totalUnitData.data.length > 0 ? (
                                                            totalUnitData.data.map((unit: TUnitInterface) => (
                                                                <MenuItem key={unit.id} value={unit.id}>
                                                                    {unit.unitName}
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
                                </div>
                            </div>


                        </div>
                        <div className="flex justify-end">
                            <button className='inventual-btn primary-btn' type="submit">Create Adjustment</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddAdjustmentList;