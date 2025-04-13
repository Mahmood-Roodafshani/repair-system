import { Icon as MIcon, IconProps as MIconProps } from '@mui/material';
import MaterialIconType from './MaterialIconType';

export interface IconProps extends MIconProps {
  type?: MaterialIconType;
}

const Icon = (props: IconProps) => {
  const { type, children, ...others } = props;
  return <MIcon {...others}>{type ? type : null}</MIcon>;
};

export default Icon;
