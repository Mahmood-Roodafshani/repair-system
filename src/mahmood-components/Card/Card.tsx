import * as React from 'react';
import {CardContent, CardContentProps} from "@mui/material";

const Card = (props: CardContentProps) => {
    const {children, ...otherProps} = props;
    return <CardContent sx={{marginLeft: "auto", marginRight: "auto"}} {...otherProps}>{children}</CardContent>;
}

export default Card;