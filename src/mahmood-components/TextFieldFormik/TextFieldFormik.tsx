import TextField from '@mui/material/TextField';
import { OutlinedTextFieldProps } from '@mui/material/TextField/TextField';
import { useField, useFormikContext } from 'formik';
import { useEffect } from 'react';

interface LocalTextFieldProps extends Partial<OutlinedTextFieldProps> {
  name: string;
  isHandledByFormik?: boolean;
  visualFormatter?: (val: string) => string;
  clearFlag?: boolean;
}

const TextFieldFormik = (props: LocalTextFieldProps) => {
  const { isHandledByFormik = true, type = 'text', ...otherProps } = props;
  // if (isHandledByFormik)
  return (
    <TextFieldWithFormik
      sx={props.sx ? props.sx : { width: '250px' }}
      type={type}
      {...otherProps}
    />
  );
  // else
  //     return <TextFieldWithoutFormik type={type} {...otherProps}/>
};

const TextFieldWithFormik = (props: LocalTextFieldProps) => {
  const { name, clearFlag, ...otherProps } = props;
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const configTextField = {
    fullWidth: true,
    // ...field,
    ...otherProps
  };

  // meta object containes
  // submitForm, isSubmitting, touched, errors
  if (meta && meta.error) {
    // @ts-ignore
    configTextField.error = true;
    // @ts-ignore
    configTextField.helperText = meta.error;
  }

  function handleChange(e: any) {
    let newValue = e.target.value;
    setFieldValue(field.name, String(newValue));
  }

  useEffect(() => {
    if (clearFlag) setFieldValue(name, '');
  }, [clearFlag]);

  let formattedValue = props.visualFormatter
    ? props.visualFormatter(field.value)
    : field.value;
  return (
    <TextField
      size={'small'}
      onChange={handleChange}
      {...configTextField}
      variant={'outlined'}
      value={formattedValue}
    />
  );
};

export default TextFieldFormik;
