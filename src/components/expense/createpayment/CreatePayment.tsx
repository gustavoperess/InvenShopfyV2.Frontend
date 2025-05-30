"use client"
import React, { useState, useEffect } from 'react';
import { MenuItem, TextField } from '@mui/material';
import DatePicker from "react-datepicker"; import { toast } from 'react-toastify';
import { useGetExpenseByNameQuery } from '@/services/Expense/Expense';
import { TExpenseInterface } from '@/interFace/interFace';
import { NumericFormat } from 'react-number-format';
import { useAddPaymentExpenseMutation } from '@/services/Expense/ExpensePayment';



const CreatePayment = () => {
    const [expenseNumber, setExpenseNumber] = useState<string>("");
    const [expenseAmount, setExpenseAmount] = useState<string>("");
    const [paymentType, setPaymentType] = useState<string>("Card");
    const [paymentStatus, setPaymentStatus] = useState<string>("");
    const [creditCard, setCreditCard] = useState<string>("");
    const [expenseId, setExpenseId] = useState<number>();
    const [expenseCategory, setExpenseCategory] = useState<string>("");
    const [expenseNote, setExpenseNote] = useState<string>("");
    const [expenseDate, setExpenseDate] = useState(new Date());
    const [suggestions, setSuggestions] = useState<TExpenseInterface[]>([]);
    const [fetchSuggestions, setFetchSuggestions] = useState<boolean>(true);
    const debouncedSearchTerm = useDebounce(expenseNumber, 500);
    const [addPayment] = useAddPaymentExpenseMutation();


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

    const { data: expenseSuggestionData, error } = useGetExpenseByNameQuery(debouncedSearchTerm, {
        skip: !debouncedSearchTerm.trim().length || !fetchSuggestions, // Skip API call if fetchSuggestions is false
    });


    useEffect(() => {
        if (expenseSuggestionData) {
            setSuggestions(expenseSuggestionData.data || []);
        }
    }, [expenseSuggestionData]);


    const handleSuggestionSelect = (suggestion: TExpenseInterface) => {
        setExpenseAmount(suggestion.expenseCost);
        setExpenseNumber(suggestion.voucherNumber);
        setExpenseId(suggestion.id);
        setPaymentStatus(suggestion.expenseStatus);
        setExpenseCategory(suggestion.expenseCategory);
        setSuggestions([]);
        setFetchSuggestions(false);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setExpenseNumber(e.target.value);
        setFetchSuggestions(true);
    };

    const handleDateChange = (date: Date | null) => {
        setExpenseDate(date || new Date());
    };

    const handleCreditCardChange = (event: any) => {
        let value = event.target.value.replace(/\D/g, '');
        value = value.slice(0, 16);
        const formattedValue = value.replace(/(.{4})/g, '$1 ').trim();
        setCreditCard(formattedValue);

    }

    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };


    const handleCreatePayment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let date = formatDate(expenseDate)
        const PaymentData = { date, cardNumber: creditCard, expenseId, expenseNote, paymentType, }
        try {
            await addPayment(PaymentData).unwrap();
            setExpenseAmount("");
            setExpenseNumber("");
            setCreditCard("");
            setExpenseDate(new Date())
            setPaymentStatus("");
            setExpenseCategory("");
            setExpenseNote("")
            toast.success("Payment Created successfully!");
        } catch (error: any) {
            if (error?.data?.message) {
                toast.error(error?.data?.message);
                setExpenseAmount("");
                setExpenseNumber("");
                setCreditCard("");
                setExpenseDate(new Date())
                setPaymentStatus("");
                setExpenseCategory("");
                setExpenseNote("")
            } else {
                // Fallback error message
                toast.error("Failed to create payment. Please try again later.");
            }
        }
    };
    return (
        <>
            <div className="invenShopfy-content-area px-4 sm:px-7 max2Xl:pb-0 pb-[170px]">
                <div className="invenShopfy-create-payment-area bg-white p-5 sm:p-7 custom-shadow rounded-8 mt-7">
                    <form onSubmit={handleCreatePayment}>
                        <div className="grid grid-cols-12 gap-y-7 sm:gap-7">
                            <div className="col-span-12">
                                <div className="grid grid-cols-12 gap-y-7 sm:gap-7">
                                    <div className="col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-4">
                                        <div className="invenShopfy-form-field">
                                            <h5>Search by Reference</h5>
                                            <div className="invenShopfy-input-field-style search-field">
                                                <TextField
                                                    fullWidth
                                                    placeholder="D-422134"
                                                    variant="outlined"
                                                    value={expenseNumber}
                                                    onChange={handleNameChange}
                                                />
                                                {suggestions.length > 0 && (
                                                    <div className='search-dropdown dropdown-scroll'>
                                                        <ul>
                                                            {suggestions.map((expense) => (
                                                                <li key={expense.id} onClick={() => handleSuggestionSelect(expense)}>
                                                                    <p className='title'>{expense.voucherNumber}</p>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-4">
                                        <div className="invenShopfy-formTree-field">
                                            <h5>Payment status</h5>
                                            <div className="invenShopfy-select-field-style">
                                                <TextField
                                                    required
                                                    value={paymentStatus}
                                                    disabled={paymentStatus !== ''}
                                                    style={{
                                                        backgroundColor: paymentStatus !== '' ? '#e0e0e0' : 'inherit',
                                                        color: paymentStatus !== '' ? '#757575' : 'inherit',
                                                        width: '100%',
                                                    }}
                                                >
                                                </TextField>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-4">
                                        <div className="invenShopfy-select-field">
                                            <div className="invenShopfy-form-field">
                                                <h5>Expense Price</h5>
                                                <div className="invenShopfy-input-field-style">
                                                    <NumericFormat
                                                        value={expenseAmount}
                                                        thousandSeparator
                                                        valueIsNumericString
                                                        disabled={expenseAmount !== ''}
                                                        prefix="£"
                                                        style={{
                                                            backgroundColor: expenseAmount !== '' ? '#e0e0e0' : 'inherit',
                                                            color: expenseAmount !== '' ? '#757575' : 'inherit',
                                                            height: "48px"
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                        <div className="invenShopfy-formTree-field">
                                            <h5>Category</h5>
                                            <div className="invenShopfy-select-field-style">
                                                <TextField
                                                    required
                                                    value={expenseCategory}
                                                    disabled={expenseCategory !== ''}
                                                    style={{
                                                        backgroundColor: expenseCategory !== '' ? '#e0e0e0' : 'inherit',
                                                        color: expenseCategory !== '' ? '#757575' : 'inherit',
                                                        width: '100%',
                                                    }}
                                                >
                                                </TextField>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                        <div className="invenShopfy-formTwo-field">
                                            <h5>Date</h5>
                                            <div className="invenShopfy-input-field-style">
                                                <DatePicker
                                                    selected={expenseDate}
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
                                        <div className="invenShopfy-form-field">
                                            <h5>Payment Type</h5>
                                            <div className="invenShopfy-select-field-style">
                                                <TextField
                                                    select
                                                    label="Select"
                                                    required
                                                    value={paymentType}
                                                    onChange={(e) => setPaymentType(e.target.value)}
                                                    defaultValue="Card"
                                                    SelectProps={{
                                                        displayEmpty: true,
                                                        renderValue: (value: any) => {
                                                            return value
                                                        },
                                                    }}>
                                                    <MenuItem value="Card">Card</MenuItem>
                                                    <MenuItem value="Cash">Cash</MenuItem>
                                                </TextField>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6">
                                        <div className="invenShopfy-form-field">
                                            <h5>Card Number</h5>
                                            <div className="invenShopfy-input-field-style">
                                                <TextField
                                                    fullWidth
                                                    type="text"
                                                    placeholder="Enter card number"
                                                    variant="outlined"
                                                    required
                                                    onChange={handleCreditCardChange}
                                                    value={creditCard}
                                                    disabled={paymentType == 'Cash'}
                                                    style={{
                                                        backgroundColor: paymentType == 'Cash' ? '#e0e0e0' : 'inherit',
                                                        color: paymentType == 'Cash' ? '#757575' : 'inherit',
                                                        width: '100%',
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12">
                                        <div className="invenShopfy-input-field-style">
                                            <TextField
                                                fullWidth
                                                multiline
                                                required
                                                rows={4}
                                                value={expenseNote}
                                                placeholder='Staff Notes'
                                                inputProps={{ maxLength: 500 }}
                                                onChange={(e) => setExpenseNote(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12 flex justify-end">
                                        <button
                                            className={`invenShopfy-btn w-full ${paymentStatus != "Paid" ? '' : 'disabled'}`}
                                            type="submit">
                                            Pay Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreatePayment;