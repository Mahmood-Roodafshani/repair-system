import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";

export interface MenuItemDto {
    title: string;
    link?: string;
    roles?: string[];
    items?: MenuItemDto[];
    icon?: OverridableComponent<SvgIconTypeMap>;
    isOpen?: boolean;
} 