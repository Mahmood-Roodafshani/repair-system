// import React from "react"
// import {DatePicker, DateTimePicker, LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
// // import { DateRangePicker, DateRange } from '@mui/x-date-pickers-pro';
// import AdapterJalali from "@date-io/date-fns-jalali";
// import {TextField} from "@mui/material";
//
// interface CustomDatePickerParams {
//     label: string;
//     type: DatePickerType;
//     onChange: (newValue: Date | null) => void;
// }
//
// export default function CustomDatePicker(props: CustomDatePickerParams) {
//     const [value, setValue] = React.useState<Date | null>(null);
//     if (DatePickerType.DATE_AND_TIME === props.type) {
//         return <LocalizationProvider dateAdapter={AdapterJalali}>
//             <DateTimePicker
//                 renderInput={(props) => <TextField size="small" style={{width: '100%'}} {...props} />}
//                 label={props.label}
//                 value={value}
//                 onChange={(newValue) => {
//                     setValue(newValue);
//                     props.onChange(newValue);
//                 }}
//             />
//         </LocalizationProvider>;
//     } else if (DatePickerType.DATE === props.type) {
//         return <LocalizationProvider dateAdapter={AdapterJalali}>
//             <DatePicker
//                 renderInput={(props) => <TextField size="small" {...props} />}
//                 label={props.label}
//                 mask="____/__/__"
//                 value={value}
//                 onChange={(newValue) => {
//                     setValue(newValue);
//                     props.onChange(newValue);
//                 }}
//             />
//         </LocalizationProvider>;
//     } else {
//         return <LocalizationProvider dateAdapter={AdapterJalali}>
//             <TimePicker
//                 renderInput={(props) => <TextField size="small" {...props} />}
//                 label={props.label}
//                 value={value}
//                 onChange={(newValue) => {
//                     setValue(newValue);
//                     props.onChange(newValue);
//                 }}
//             />
//         </LocalizationProvider>;
//     }/*else if (DatePickerType.DATE_RANGE === props.type){
//         return <LocalizationProvider dateAdapter={AdapterJalali}>
//             <DateRangePicker
//                 calendars={1}
//                 value={value}
//                 onChange={(newValue) => {
//                     setValue(newValue);
//                 }}
//                 renderInput={(startProps, endProps) => (
//                     <React.Fragment>
//                         <TextField {...startProps} />
//                         <Box sx={{ mx: 2 }}> to </Box>
//                         <TextField {...endProps} />
//                     </React.Fragment>
//                 )}
//             />
//         </LocalizationProvider>;
//     }*/
// }
//
// export enum DatePickerType {
//     DATE,
//     DATE_RANGE,
//     DATE_AND_TIME,
//     TIME
// }