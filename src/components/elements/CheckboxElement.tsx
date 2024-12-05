"use client"
import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from '@mui/material';

const CheckboxElement = () => {
  return (
    <div className="invenShopfy-common-card mb-5">
      <div className="grid grid-cols-12 sm:gap-x-[30px] gap-y-[18px]">
        <div className="col-span-12 md:col-span-6">
          <div className='invenShopfy-checkbox-style'>
            <FormControlLabel
              control={<Checkbox inputProps={{ 'aria-label': 'controlled' }} />}
              label="Use client" // Set your label here
            />
          </div>
        </div>
        <div className="col-span-12 md:col-span-6">
          <div className='invenShopfy-checkbox-style'>
            <FormControlLabel
              control={<Checkbox inputProps={{ 'aria-label': 'controlled' }} />}
              label="Use Client Two" // Set your label here
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckboxElement;