"use client"
import React, { useState, useEffect } from 'react';
import { MenuItem, TextField, FormControl, InputAdornment } from '@mui/material';
import { NumericFormat } from 'react-number-format';
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import { useGetWarehouseNamesQuery } from '@/services/Warehouse/Warehouse';
import { useGetAllExpenseCategoriesQuery, useGetExpenseCategoryByIdQuery } from '@/services/Expense/ExpenseCategory';
import { useAddExpenseMutation } from '@/services/Expense/Expense';
import { TMainCategoryInterface, TWarehouseInterface } from '@/interFace/interFace';


const AddExpenseList = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [expense, setExpense] = useState<string>('');
    const [selectWarehouse, setSelectWarehouse] = useState<string>('');
    const [expenseNote, setExpenseNote] = useState<string>("");
    const [selectStatus, setSelectStatus] = useState('');
    const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
    const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
    const [currentPageSize, setCurrentPageSize] = useState(25);
    const [shippingCost, setShippingCost] = useState<number | undefined>();
    const [selectedCategory, setSelectedCategory] = useState<number | string>("");
    const [subCategories, setSubCategories] = useState<string[]>([]);
    const [selectSubCategory, setSelectSubCategory] = useState<string>("");
    const { data: totalCategoryData } = useGetAllExpenseCategoriesQuery({ pageNumber: currentPageNumber, pageSize: currentPageSize });
    const { data: warehouseData } = useGetWarehouseNamesQuery({ pageNumber: currentPageNumber, pageSize: currentPageSize });
    const { data: subCategoryData } = useGetExpenseCategoryByIdQuery(Number(selectedCategory) || 0, { skip: !selectedCategory });
    const [createExpense] = useAddExpenseMutation();

    useEffect(() => {
        if (subCategoryData) {
            setSubCategories(subCategoryData.data.subCategory || []);
            setSelectSubCategory('');
        }
    }, [subCategoryData]);


    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedCategory(e.target.value as string);

        if (!subCategories.some(subCategory => subCategory === selectSubCategory)) {
            setSelectSubCategory('');
        }
    };
    // handle Date
    const handleDateChange = (date: Date | null) => {
        setStartDate(date || new Date());
    };
    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }; 



    const handleExpenseListData = async (event: any) => {
        event.preventDefault();
        let date = formatDate(startDate)

        const expenseDatatoSubmit = {
            warehouseId: selectWarehouse, date,
            expenseStatus: selectStatus, expenseDescription: expense,
            expenseCategoryId: selectedCategory, expenseType: selectSubCategory,
            expenseCost: selectedPrice, expenseNote, shippingCost
        };

        try {
            await createExpense(expenseDatatoSubmit).unwrap();
            toast.success("Expense Created successfully!");
            setStartDate(new Date());
            setExpense('');
            setSelectWarehouse('');
            setExpense("")
            setSelectSubCategory("")
            setSelectSubCategory("")
            setSelectedPrice(undefined)
            setExpenseNote("")
            setShippingCost(undefined)
            setSelectStatus('');
        } catch (error: any) {
            if (error?.data?.message) {
                toast.error(error?.data?.message);
            }
            else {
                // Fallback error message
                toast.error("Failed to create Expense. Please try again later.");
            }
        }
    }


    return (
        <>
            <div className="invenShopfy-content-area px-4 sm:px-7 max2Xl:pb-0 pb-[170px]">
                <div className="invenShopfy-add-expense-area bg-white p-5 sm:p-7 custom-shadow rounded-8 mt-7">
                    <form onSubmit={handleExpenseListData}>
                        <div className="grid grid-cols-12 gap-y-7 sm:gap-7">
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="invenShopfy-formTwo-field">
                                    <h5>Date</h5>
                                    <div className="invenShopfy-input-field-style">
                                        <DatePicker
                                            selected={startDate}
                                            required
                                            onChange={handleDateChange}
                                            showYearDropdown
                                            showMonthDropdown
                                            useShortMonthInDropdown
                                            showPopperArrow={false}
                                            peekNextMonth
                                            dropdownMode="select"
                                            isClearable
                                            placeholderText="DD/MM/YYYY"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="invenShopfy-select-field">
                                    <div className="invenShopfy-form-field">
                                        <h5>Expense Name</h5>
                                        <div className="invenShopfy-input-field-style">
                                            <FormControl fullWidth>
                                                <TextField
                                                    fullWidth
                                                    placeholder="Incandescent light bulb"
                                                    value={expense}
                                                    required
                                                    inputProps={{ maxLength: 80 }}
                                                    onChange={(e) => setExpense(e.target.value)}
                                                />
                                            </FormControl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="invenShopfy-select-field">
                                    <div className="invenShopfy-form-field">
                                        <h5>Select Warehouse</h5>
                                        <div className="invenShopfy-select-field-style">
                                            <TextField
                                                select
                                                label="Select"
                                                required
                                                value={selectWarehouse}
                                                onChange={(e) => setSelectWarehouse(e.target.value)}
                                                SelectProps={{
                                                    displayEmpty: true,
                                                    renderValue: (value: any) => {
                                                        const selectedWarehouse = warehouseData?.data.find((warehouse: TWarehouseInterface) => warehouse.id === value);
                                                        return selectedWarehouse ? selectedWarehouse.warehouseTitle : <em>Select Warehouse</em>;
                                                    },
                                                }}>
                                                {warehouseData && warehouseData.data.length > 0 ? (
                                                    warehouseData.data.map((warehouse: TWarehouseInterface) => (
                                                        <MenuItem key={warehouse.id} value={warehouse.id}>
                                                            {warehouse.warehouseTitle}
                                                        </MenuItem>
                                                    ))
                                                ) : (
                                                    <MenuItem value="">
                                                        <em>No Warehouse Available</em>
                                                    </MenuItem>
                                                )}
                                            </TextField>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-12 xl:col-span-4 md:col-span-6">
                                <div className="invenShopfy-select-field">
                                    <div className="invenShopfy-form-field">
                                        <h5>Expense Type</h5>
                                        <div className="invenShopfy-select-field-style">
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
                                                                (category: TMainCategoryInterface) => category.id === Number(value)
                                                            );
                                                            return selectedCategoryItem ? selectedCategoryItem.mainCategory : <em>Select Category</em>;
                                                        },
                                                    }}
                                                >
                                                    {totalCategoryData && totalCategoryData.data.length > 0 ? (
                                                        totalCategoryData.data.map((mainCategory: TMainCategoryInterface) => (
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
                                <div className="invenShopfy-select-field">
                                    <div className="invenShopfy-form-field">
                                        <h5>Sub-Category</h5>
                                        <div className="invenShopfy-select-field-style">
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
                                <div className="invenShopfy-select-field">
                                    <div className="invenShopfy-form-field">
                                        <h5>Expense Cost</h5>
                                        <div className="invenShopfy-input-field-style">
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
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="invenShopfy-form-field">
                                    <h5>Status</h5>
                                    <div className="invenShopfy-select-field-style">
                                        <TextField
                                            select
                                            required
                                            label="Select"
                                            value={selectStatus}
                                            onChange={(e) => setSelectStatus(e.target.value)}
                                            defaultValue=""
                                            SelectProps={{
                                                displayEmpty: true,
                                                renderValue: (value: any) => {
                                                    if (value === '') {
                                                        return <em>Unpaid</em>;
                                                    }
                                                    return value;
                                                },
                                            }}
                                        >
                                            <MenuItem value="Unpaid">Unpaid</MenuItem>
                                            <MenuItem value="Paid">Paid</MenuItem>
                                        </TextField>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="invenShopfy-form-field">
                                    <h5>Shipping Cost</h5>
                                    <NumericFormat
                                        customInput={TextField}
                                        thousandSeparator=","
                                        required
                                        decimalSeparator="."
                                        decimalScale={2}
                                        fixedDecimalScale
                                        value={shippingCost ?? ''}
                                        onValueChange={(values) => {
                                            setShippingCost(values.floatValue);
                                        }}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">£</InputAdornment>,
                                        }}
                                        inputProps={{ min: 0.01, max: 1000000 }}
                                        fullWidth
                                        variant="outlined"
                                        placeholder="50.00"
                                    />
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12">
                                <div className="invenShopfy-input-field-style">
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={4}
                                        value={expenseNote}
                                        placeholder='Expense Notes'
                                        inputProps={{ maxLength: 500 }}
                                        onChange={(e) => setExpenseNote(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-span-12 flex justify-end">
                                <button type="submit" className="invenShopfy-btn">Create Expense</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddExpenseList;
