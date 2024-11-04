import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import { useGetSalesReturnByNameQuery, useCreateSaleReturnMutation } from '@/services/Sales/SaleReturn';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

interface AddReturnPopupProps {
    open: boolean;
    handleReturnDialogClose: () => void;
    refetch: () => void;
}

interface ReferenceInterface {
    id: number;
    referenceNumber: string;
    billerName: string;
    warehouseName: string;
    totalAmount: string;
    customerName: string;
}


const AddReturnPopup: React.FC<AddReturnPopupProps> = ({ open, handleReturnDialogClose, refetch }) => {
    const [referenceNumber, setReferenceNumber] = useState<string>("");
    const [billerName, setBillerName] = useState<string>("");
    const [warehouseName, setWarehouseName] = useState<string>("");
    const [totalAmount, seTotalAmount] = useState<string>("");
    const [customerName, setCustomerName] = useState<string>("");
    const [returnDate, setReturnDate] = useState(new Date());
    const [returnNote, setReturnNote] = useState<string>("");
    const [fetchSuggestions, setFetchSuggestions] = useState(true);
    const [remarkStatus, setRemarkStatus] = useState<string>("");
    const [suggestions, setSuggestions] = useState<ReferenceInterface[]>([]);


    const [addSaleReturn] = useCreateSaleReturnMutation();

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
    // handle Date
    const handleDateChange = (date: Date | null) => {
        setReturnDate(date || new Date());
    };
    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };


    const { data: productSuggestionsData, error } = useGetSalesReturnByNameQuery(debouncedSearchTerm, {
        skip: !debouncedSearchTerm.trim().length || !fetchSuggestions, // Skip API call if fetchSuggestions is false
    });


    useEffect(() => {
        if (productSuggestionsData) {
            setSuggestions(productSuggestionsData.data || []);
        }
    }, [productSuggestionsData]);

    const handleReferenceNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReferenceNumber(e.target.value);
        setFetchSuggestions(true);
    };

    const handleSuggestionSelect = (suggestion: ReferenceInterface) => {
        setReferenceNumber(suggestion.referenceNumber);
        setBillerName(suggestion.billerName)
        setWarehouseName(suggestion.warehouseName)
        seTotalAmount(suggestion.totalAmount)
        setCustomerName(suggestion.customerName)
        setSuggestions([]);
        setFetchSuggestions(false);
    };

    


    const handleReturnFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let date = formatDate(returnDate)
        const returData = { returnDate: date, customerName, referenceNumber, warehouseName, billerName, totalAmount, remarkStatus: remarkStatus || "Duplicated", returnNote }
        try {
            await addSaleReturn(returData).unwrap();
            toast.success("Sale Created successfully!");
                setReturnDate(new Date());
                setReferenceNumber("")
                setCustomerName('')
                setBillerName('')
                setWarehouseName('')
                seTotalAmount("")
                setRemarkStatus("")
                setReturnNote("")
                refetch();
        } catch (error: any) {
            if (error?.data?.message) {
                toast.error(error?.data?.message);
            } 
            else {
                // Fallback error message
                toast.error("Failed to create Sale. Please try again later.");
            }
        }
    }



    return (
        <div className='inventual-common-modal'>
            <BootstrapDialog
                onClose={handleReturnDialogClose}
                aria-labelledby="customized-dialog-title"
                open={open}>
                <div className='inventual-modal-title'>
                    <h4>Add Return</h4>
                    <button type='button' onClick={handleReturnDialogClose}><i className="fa-regular fa-xmark"></i></button>
                </div>
                <DialogContent dividers>
                    <div className='inventual-common-modal-width width-full'>
                        <form onSubmit={handleReturnFormSubmit}>
                            <div className="grid grid-cols-12 sm:gap-x-[30px] gap-y-[18px]">
                                <div className="col-span-12">
                                    <div className="inventual-form-field">
                                        <h5>Search by reference number</h5>
                                        <div className="inventual-input-field-style search-field">
                                            <TextField
                                                fullWidth
                                                placeholder="Macbook..."
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
                                <div className="col-span-12 md:col-span-6">
                                    <div className="inventual-formTwo-field">
                                        <h5>Date</h5>
                                        <div className="inventual-input-field-style">
                                            <DatePicker
                                                selected={returnDate}
                                                onChange={handleDateChange}
                                                showYearDropdown
                                                showMonthDropdown
                                                useShortMonthInDropdown
                                                showPopperArrow={false}
                                                peekNextMonth
                                                dropdownMode="select"
                                                isClearable
                                                placeholderText="MM/DD/YYYY"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-6">
                                    <div className="inventual-formTree-field">
                                        <h5>Customer</h5>
                                        <div className="inventual-select-field-style">
                                            <TextField
                                                required
                                                value={customerName}
                                                disabled={customerName !== ''}
                                                style={{
                                                    backgroundColor: customerName !== '' ? '#e0e0e0' : 'inherit',
                                                    color: customerName !== '' ? '#757575' : 'inherit',
                                                    width: '100%',
                                                }}
                                            >
                                            </TextField>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-6">
                                    <div className="inventual-formTree-field">
                                        <h5>Warehouse</h5>
                                        <div className="inventual-select-field-style">
                                            <TextField
                                                required
                                                value={warehouseName}
                                                disabled={warehouseName !== ''}
                                                style={{
                                                    backgroundColor: warehouseName !== '' ? '#e0e0e0' : 'inherit',
                                                    color: warehouseName !== '' ? '#757575' : 'inherit',
                                                    width: '100%',
                                                }}
                                            >
                                            </TextField>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-6">
                                    <div className="inventual-formTree-field">
                                        <h5>Biller</h5>
                                        <div className="inventual-input-field-style">
                                            <TextField
                                                required
                                                value={billerName}
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
                                <div className="col-span-12 md:col-span-6">
                                    <div className="inventual-form-field">
                                        <h5>Amount</h5>
                                        <div className="inventual-input-field-style">
                                            <NumericFormat
                                                value={totalAmount}
                                                thousandSeparator
                                                valueIsNumericString
                                                disabled={totalAmount !== ''}
                                                prefix="£"
                                                style={{
                                                    backgroundColor: totalAmount !== '' ? '#e0e0e0' : 'inherit',
                                                    color: totalAmount !== '' ? '#757575' : 'inherit',
                                                    height: "48px"
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-6">
                                    <div className="inventual-form-field">
                                        <h5>Remark</h5>
                                        <div className="inventual-select-field-style">
                                            <TextField
                                                select
                                                label="Select"
                                                value={remarkStatus}
                                                onChange={(e) => setRemarkStatus(e.target.value)}
                                                SelectProps={{
                                                    displayEmpty: true,
                                                    renderValue: (value: any) => {
                                                        if (value === '') {
                                                            return <em>Duplicated</em>;
                                                        }
                                                        return value;
                                                    },
                                                }}
                                            >
                                                <MenuItem value="">
                                                    <em>Duplicated</em>
                                                </MenuItem>
                                                <MenuItem value="PackageBroken">Package Broken</MenuItem>
                                                <MenuItem value="DateExpired">Date Expired</MenuItem>
                                                <MenuItem value="Quality">Quality</MenuItem>
                                                <MenuItem value="NotGood">Not Good</MenuItem>
                                            </TextField>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12">
                                    <div className="inventual-input-field-style">
                                        <TextField
                                            fullWidth
                                            multiline
                                            required
                                            rows={4}
                                            value={returnNote}
                                            placeholder='Return Notes'
                                            inputProps={{ maxLength: 500 }}
                                            onChange={(e) => setReturnNote(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <DialogActions>
                                <button className='inventual-btn' type='submit'>
                                    Add Now
                                </button>
                            </DialogActions>
                        </form>
                    </div>
                </DialogContent>
            </BootstrapDialog>
        </div>
    );
}

export default AddReturnPopup;
