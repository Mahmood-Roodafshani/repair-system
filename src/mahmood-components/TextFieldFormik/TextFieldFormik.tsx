import React from 'react';
import TextField from '@mui/material/TextField';
import { useField, useFormikContext } from 'formik';
import { OutlinedTextFieldProps } from '@mui/material/TextField/TextField';

interface LocalTextFieldProps extends Partial<OutlinedTextFieldProps> {
  name: string;
  isHandledByFormik?: boolean;
  visualFormatter?: (val: string) => string;
}

const TextFieldFormik = (props: LocalTextFieldProps) => {
  const { isHandledByFormik = true, type = 'text', ...otherProps } = props;
  // if (isHandledByFormik)
  return <TextFieldWithFormik type={type} {...otherProps} />;
  // else
  //     return <TextFieldWithoutFormik type={type} {...otherProps}/>
};

const TextFieldWithFormik = (props: LocalTextFieldProps) => {
  const { name, ...otherProps } = props;
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
