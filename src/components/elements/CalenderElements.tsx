"use client"

import React, { useState } from 'react';
import DatePicker from "react-datepicker";

const CalenderElements = () => {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(new Date());

    const dummyData = (e:any) => {
        e.preventDefault();
    };

    return (
        <div className="inventual-common-card mb-5">
            <form onSubmit={dummyData}>
                <div className="grid grid-cols-12 sm:gap-x-[30px] gap-y-[18px]">
                    <div className="col-span-12 md:col-span-6">
                        <div className="inventual-form-field">
                            <h5>Calender Style</h5>
                            <div className="inventual-input-field-style">
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    showYearDropdown
                                    showMonthDropdown
                                    useShortMonthInDropdown
                                    showPopperArrow={false}
                                    peekNextMonth
                                    dropdownMode="select"
                                    isClearable
                                    placeholderText="MM/DD/YYYY"
                                    className="w-full"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6">
                        <div className="inventual-form-field">
                            <h5>Calender Style</h5>
                            <div className="inventual-input-field-style">
                                <DatePicker
                                    selected={endDate}
                                    onChange={(date) => setEndDate(date)}
                                    showYearDropdown
                                    showMonthDropdown
                                    useShortMonthInDropdown
                                    showPopperArrow={false}
                                    peekNextMonth
                                    dropdownMode="select"
                                    isClearable
                                    placeholderText="MM/DD/YYYY"
                                    className="w-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CalenderElements;