import { FormControlLabel, Switch } from '@mui/material';
import { useField } from 'formik';

interface SwitchFormikProps {
  name: string;
  label: string;
}

const SwitchFormik = ({ name, label }: SwitchFormikProps) => {
  const [field] = useField(name);

  return (
    <FormControlLabel
      control={<Switch {...field} checked={field.value} />}
      label={label}
    />
  );
};

export default SwitchFormik;
