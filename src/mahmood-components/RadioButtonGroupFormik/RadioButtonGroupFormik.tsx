import React from "react";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import {useField, useFormikContext} from "formik";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import OptionsModel from "../../model/OptionsModel";
import {RadioGroupProps as MRadioGroupProps} from "@mui/material/RadioGroup/RadioGroup";

interface s extends MRadioGroupProps {
    options: OptionsModel[];
    name: string;
    legend?: string;
}

const RadioButtonGroupFormik = (props: s) => {
    const {name, legend, options, ...otherProps} = props;
    const {setFieldValue} = useFormikContext();
    const [field, meta] = useField(name);

    const handleChange = (event: any, value: any) => {
        setFieldValue(name, value);
        props.onChange ? props.onChange(event, value) : null;
    };

    // props config for Checkbox
    const configCheckbox = {
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
            {legend ? <FormLabel component="legend">{legend}</FormLabel> : null}
            <RadioGroup
                {...configCheckbox}
                name={name}
                onChange={handleChange}
            >
                {options.map(option => (
                    <FormControlLabel key={option.id} value={String(option.id)}
                                      control={<Radio/>}
                                      label={option.title}/>
                ))}
            </RadioGroup>
        </FormControl>
    );
};

export default RadioButtonGroupFormik;
