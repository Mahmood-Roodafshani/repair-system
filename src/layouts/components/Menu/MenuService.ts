import { MenuItemDto } from "./MenuItemDto";
import { StaticMenu } from "./StaticMenu";

export class MenuService {
    static menuList: MenuItemDto[];

    public static getAppMenuList(): MenuItemDto[] {
        if (this.menuList == undefined) {
            this.menuList = <MenuItemDto[]>StaticMenu.appMenuItems;
        }
        return this.menuList;
    }
} 