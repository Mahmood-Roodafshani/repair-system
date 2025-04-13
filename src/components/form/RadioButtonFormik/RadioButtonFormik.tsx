// import { FormControlLabel, Radio } from "@material-ui/core";
import { FormControlLabel } from '@mui/material';
import Radio from '@mui/material/Radio';
import { useField } from 'formik';

const RadioButtonFormik = (props: any) => {
  const [field] = useField({
    name: props.name,
    type: 'radio',
    value: props.value
  });
  return (
    <FormControlLabel
      control={<Radio {...props} {...field} />}
      label={props.label}
    />
  );
};

export default RadioButtonFormik;
