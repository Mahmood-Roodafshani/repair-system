import React from "react";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import Switch from "@mui/material/Switch";
import {useField, useFormikContext} from "formik";
import {SwitchProps} from "@mui/material/Switch/Switch";

interface s extends SwitchProps {
    name: string,
    label: string,
    legend: string
}

const SwitchFormik = (props: s) => {
    const {name, label, legend, ...otherProps} = props;
    const {setFieldValue} = useFormikContext();
    const [field, meta] = useField(name);

    const handleChange = (event: any) => {
        setFieldValue(name, event.target.checked);
    };

    // props config for Switch
    const configSwitch = {
        ...field,
        ...otherProps
    };
    // props config for FormControl
    const configFormControl = {};

    if (meta && meta.touched && meta.error) {
        // @ts-ignore
        configFormControl.error = true;
    }

    return (
        <FormControl {...configFormControl}>
            <FormLabel component="legend">{legend}</FormLabel>
            <FormGroup>
                <FormControlLabel
                    control={<Switch {...configSwitch} onChange={handleChange}/>}
                    label={label}
                />
            </FormGroup>
        </FormControl>
    );
};

export default SwitchFormik;
