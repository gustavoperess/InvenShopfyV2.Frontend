"use client"

import * as React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const SelectElements = () => {
    const dummyData = (e:any) => {
        e.preventDefault();
    };

    return (
        <div className="inventual-common-card mb-5">
            <form onSubmit={dummyData}>
                <div className="grid grid-cols-12 sm:gap-x-[30px] gap-y-[18px]">
                    <div className="col-span-12 md:col-span-6">
                        <div className="inventual-form-field">
                            <h5>Selector Style</h5>
                            <div className="inventual-select-field-style">
                                <TextField
                                    select
                                    label="Select"
                                    defaultValue=""
                                    SelectProps={{
                                        displayEmpty: true,
                                        renderValue: (value:any) => {
                                        if (value === '') {
                                            return <em>Select Option</em>;
                                        }
                                        return value;
                                        },
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>Select Option</em>
                                    </MenuItem>
                                    <MenuItem value="Option 1">Option 1</MenuItem>
                                    <MenuItem value="Option 2">Option 2</MenuItem>
                                    <MenuItem value="Option 3">Option 3</MenuItem>
                                </TextField>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6">
                        <div className="inventual-form-field">
                            <h5>Selector Style Two</h5>
                            <div className="inventual-select-field-style">
                                <TextField
                                    select
                                    label="Select"
                                    defaultValue=""
                                    SelectProps={{
                                        displayEmpty: true,
                                        renderValue: (value:any) => {
                                        if (value === '') {
                                            return <em>Select Subject</em>;
                                        }
                                        return value;
                                        },
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>Select Subject</em>
                                    </MenuItem>
                                    <MenuItem value="Option 1">Option 1</MenuItem>
                                    <MenuItem value="Option 2">Option 2</MenuItem>
                                    <MenuItem value="Option 3">Option 3</MenuItem>
                                </TextField>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SelectElements;
