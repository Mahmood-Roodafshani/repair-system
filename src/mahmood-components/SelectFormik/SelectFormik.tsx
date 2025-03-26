import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { OutlinedTextFieldProps } from '@mui/material/TextField/TextField';
import { useField, useFormikContext } from 'formik';
import { useEffect } from 'react';
import { OptionType } from 'src/constants';

interface SelectProps extends Partial<OutlinedTextFieldProps> {
  name: string;
  options: OptionType[];
  isHandledByFormik?: boolean;
  addEmptyEntry?: boolean;
  clearFlag?: boolean;
}

const SelectFormik = (props: SelectProps) => {
  const { isHandledByFormik = true, ...otherProps } = props;
  if (isHandledByFormik)
    return (
      <SelectWithFormik
        sx={props.sx ? props.sx : { width: '250px' }}
        {...otherProps}
      />
    );
  else
    return (
      <SelectWithoutFormik
        sx={props.sx ? props.sx : { width: '250px' }}
        {...otherProps}
      />
    );
};

const SelectWithFormik = (props: SelectProps) => {
  const {
    name,
    addEmptyEntry = false,
    options,
    type = 'text',
    size = 'small',
    variant = 'outlined',
    isHandledByFormik = true,
    clearFlag = false,
    ...otherProps
  } = props;
  const { setFieldValue, values } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (event: any) => {
    setFieldValue(name, event.target.value);
  };

  useEffect(() => {
    if (clearFlag) setFieldValue(name, '');
  }, [clearFlag]);

  const configSelect = {
    select: true,
    fullWidth: true,
    ...field,
    ...otherProps
  };

  // meta object containes
  // submitForm, isSubmitting, touched, errors
  if (meta && meta.error) {
    // @ts-ignore
    configSelect.error = true;
    // @ts-ignore
    configSelect.helperText = meta.error;
  }

  return (
    <TextField
      size={size}
      type={type}
      value={(values as any).name}
      {...configSelect}
      onChange={handleChange}
      variant={variant}
      defaultValue={
        props.defaultValue === undefined && props.value === undefined
          ? ''
          : props.defaultValue
      }
    >
      {addEmptyEntry ? (
        <MenuItem key={'select'} value={''}>
          انتخاب
        </MenuItem>
      ) : null}
      {options.map((item) => (
        <MenuItem key={item.id} value={item.id}>
          {item.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

const SelectWithoutFormik = (props: SelectProps) => {
  const {
    name,
    addEmptyEntry = false,
    type = 'text',
    size = 'small',
    variant = 'outlined',
    options,
    ...otherProps
  } = props;

  const handleChange = (event: any) => {
    // @ts-ignore
    props.onChange(event);
  };

  const configSelect = {
    select: true,
    fullWidth: true,
    ...otherProps
  };

  return (
    <TextField
      size={size}
      type={type}
      {...configSelect}
      onChange={handleChange}
      variant={variant}
    >
      {addEmptyEntry ? (
        <MenuItem key={'select'} value={''}>
          انتخاب
        </MenuItem>
      ) : null}
      {options.map((item, index) => (
        <MenuItem key={item.id} value={item.id}>
          {item.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectFormik;
