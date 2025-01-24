import * as React from 'react';
import MaterialIconType from "./MaterialIconType";
import {Icon as MIcon, IconProps as MIconProps} from "@mui/material";

export interface IconProps extends MIconProps {
    type?: MaterialIconType;
}

const Icon = (props: IconProps) => {
    const {type, children, ...others} = props;
    return <MIcon {...others}>{type ? type : null}</MIcon>;
}

export default Icon;