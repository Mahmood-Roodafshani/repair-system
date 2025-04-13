import { FormHelperText } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { RadioGroupProps as MRadioGroupProps } from '@mui/material/RadioGroup/RadioGroup';
import { useField, useFormikContext } from 'formik';
import { useEffect, useState } from 'react';
import { OptionType } from 'src/constant/options';

interface s extends MRadioGroupProps {
  options: OptionType[];
  name: string;
  legend?: string;
}

const RadioButtonGroupFormik = (props: s) => {
  const { name, legend, options, ...otherProps } = props;
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const [helperText, setHelperText] = useState('');

  const handleChange = (event: any, value: any) => {
    setFieldValue(name, value);
    if (props.onChange) props.onChange(event, value);
  };

  // props config for Checkbox
  const configCheckbox: any = {
    ...field,
    ...otherProps
  };
  // props config for FormControl
  const configFormControl: any = {};

  if (meta && meta.touched && meta.error) {
    // @ts-ignore
    configFormControl.error = true;
  }

  useEffect(() => {
    setHelperText(meta && meta.touched && meta.error ? meta.error : '');
  }, [meta.error]);

  return (
    <FormControl {...configFormControl}>
      {legend ? <FormLabel component="legend">{legend}</FormLabel> : null}
      <RadioGroup {...configCheckbox} name={name} onChange={handleChange}>
        {options.map((option) => (
          <FormControlLabel
            key={option.id}
            value={String(option.id)}
            control={<Radio />}
            label={option.label}
            checked={
              configCheckbox.value
                ? option.id === configCheckbox.value
                : option.id === configCheckbox.defaultValue
            }
          />
        ))}
      </RadioGroup>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default RadioButtonGroupFormik;
