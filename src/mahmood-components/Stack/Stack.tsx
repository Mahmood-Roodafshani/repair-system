import * as React from 'react';
import {Stack as MStack, StackProps} from "@mui/material";

const Stack = (props: StackProps) => {
    const {children, direction = "row", spacing = 2, ...otherProps} = props;
    return <MStack direction={direction} spacing={spacing} {...otherProps}>{children}</MStack>;
}

export default Stack;