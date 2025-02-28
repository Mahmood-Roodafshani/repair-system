import { Box, Typography } from '@mui/material';
import DateObject from 'react-date-object';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import DatePicker from 'react-multi-date-picker';

function CustomDatePicker({
  label,
  value,
  width = '250px',
  maxDate = new Date(),
  onChange,
  error
}: {
  label: string;
  value: Date | DateObject | string;
  width?: string;
  maxDate?: Date;
  onChange: (date: any) => void;
  error?: string;
}) {
  return (
    <Box component={'div'}>
      <DatePicker
        style={{
          width: width,
          borderColor: error ? 'red' : undefined
        }}
        calendar={persian}
        locale={persian_fa}
        maxDate={maxDate}
        value={value}
        placeholder={label}
        onChange={onChange}
      />
      {error && (
        <Typography
          mt={'4px'}
          mr={'8px'}
          fontSize={11}
          fontWeight={'bold'}
          color="error"
        >
          {error}
        </Typography>
      )}
    </Box>
  );
}

export default CustomDatePicker;
