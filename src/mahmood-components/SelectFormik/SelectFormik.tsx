import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { OutlinedTextFieldProps } from '@mui/material/TextField/TextField';
import { useField, useFormikContext } from 'formik';
import { OptionType } from 'src/models';

interface SelectProps extends Partial<OutlinedTextFieldProps> {
  name: string;
  options: OptionType[];
  isHandledByFormik?: boolean;
  addEmptyEntry?: boolean;
}

const SelectFormik = (props: SelectProps) => {
  const { isHandledByFormik = true, ...otherProps } = props;
  if (isHandledByFormik) return <SelectWithFormik {...otherProps} />;
  else return <SelectWithoutFormik {...otherProps} />;
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
    ...otherProps
  } = props;
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (event: any) => {
    setFieldValue(name, event.target.value);
  };

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
