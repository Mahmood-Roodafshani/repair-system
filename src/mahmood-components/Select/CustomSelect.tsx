import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { OutlinedTextFieldProps } from '@mui/material/TextField/TextField';
import { useField, useFormikContext } from 'formik';
import { OptionType } from 'src/constants';

interface SelectProps
  extends Partial<Omit<OutlinedTextFieldProps, 'onChange'>> {
  name: string;
  options: OptionType[];
  addEmptyEntry?: boolean;
  onChange?: (newValue: string) => void;
}

const CustomSelect = (props: SelectProps) => {
  const {
    name,
    addEmptyEntry = false,
    options,
    onChange,
    type = 'text',
    size = 'small',
    variant = 'outlined',
    ...otherProps
  } = props;
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (event: any) => {
    const value = event.target.value;
    setFieldValue(name, value);
    if (onChange) {
      onChange(value);
    }
  };

  let configSelect = {
    select: true,
    fullWidth: true,
    ...field,
    ...otherProps
  };

  if (meta && meta.touched && meta.error) {
    configSelect = {
      ...configSelect,
      error: true,
      helperText: meta.error
    };
  }

  return (
    <TextField
      size={size}
      type={type}
      {...configSelect}
      onChange={handleChange}
      variant={variant}
      value={field.value}
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
export default CustomSelect;
