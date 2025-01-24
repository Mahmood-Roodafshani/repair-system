import * as React from 'react';
import i18n from "../../i18n/i18n";
import ButtonType from "./ButtonType";
import {Button as MButton, ButtonProps as MButtonProps} from "@mui/material";

export interface ButtonProps extends MButtonProps {
    buttonType: ButtonType,
    showIcon?:boolean
}
const Button = (props: ButtonProps) => {
    const {buttonType,showIcon=true, variant = 'outlined', ...otherProps} = props;
    let text = buttonType.text ? buttonType.text : (buttonType.defaultMessage ? i18n.t(buttonType.defaultMessage) : '');
    let BProps = {...otherProps};
    if (showIcon)
        BProps = {...otherProps,endIcon:buttonType.icon}
    return <MButton variant={variant} {...BProps}>{text}</MButton>;
}
export default Button;