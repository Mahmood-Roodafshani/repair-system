import * as React from 'react';
import {Paper as MuiPaper, PaperProps} from "@mui/material";
import {blue} from "@mui/material/colors";

export interface CustomPaperProps extends PaperProps {
    colored?: boolean;
}

const Paper = (props: CustomPaperProps) => {
    const {colored, elevation = 5, style, children, ...otherProps} = props;
    return <MuiPaper style={{backgroundColor: colored ? blue[50] : 'white', margin: 10, padding: 10, ...style}}
                     elevation={elevation}
                     {...otherProps}>{children}</MuiPaper>;
}

export default Paper;