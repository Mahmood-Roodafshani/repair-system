import { Button as MButton, ButtonProps as MButtonProps } from '@mui/material';
import { i18n } from 'src/localization';
import ButtonType from './ButtonType';

export interface ButtonProps extends MButtonProps {
  buttonType: ButtonType;
  showIcon?: boolean;
  text?: string;
  showText?: boolean;
}
const Button = (props: ButtonProps) => {
  const {
    buttonType,
    showIcon = true,
    showText = true,
    variant = 'outlined',
    ...otherProps
  } = props;
  const text = props.text || buttonType.text || buttonType.defaultMessage ? i18n.t(props.text || buttonType.text || buttonType.defaultMessage) : '';
  let BProps = { ...otherProps };
  if (showIcon) BProps = { ...otherProps, endIcon: buttonType.icon };
  return (
    <MButton variant={variant} {...BProps}>
      {text}
    </MButton>
  );
};
export default Button;
