import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { styled } from '@mui/material/styles';

const StyledStaticDatePicker = styled(StaticDatePicker)({
 
});

export default function Calender() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          'StaticDatePicker',
        ]}
      >
        <DemoItem>
          <StyledStaticDatePicker
            defaultValue={dayjs(new Date())}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
