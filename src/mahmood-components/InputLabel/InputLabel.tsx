import * as React from 'react';
import {InputLabel as MInputLabel, InputLabelProps} from "@mui/material";

const InputLabel = (props: InputLabelProps) => {
    const {children, ...otherProps} = props;
    return <MInputLabel {...otherProps}>{children}</MInputLabel>;
}

export default InputLabel;