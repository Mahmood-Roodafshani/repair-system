import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import CodeIcon from '@mui/icons-material/Code';
import InfoIcon from '@mui/icons-material/Info';
import BuildIcon from '@mui/icons-material/Build';
import WorkIcon from '@mui/icons-material/Work';
import ListIcon from '@mui/icons-material/List';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import HomeIcon from '@mui/icons-material/Home';
import SecurityIcon from '@mui/icons-material/Security';
import GroupIcon from '@mui/icons-material/Group';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import DrawIcon from '@mui/icons-material/Draw';
import LockIcon from '@mui/icons-material/Lock';

export class StaticMenu {
    static appMenuItems = [
        {
            title: "داشبورد",
            link: "/dashboard",
            icon: DashboardIcon,
            section: 'all'
        },
        {
            title: "مدیریت کاربران",
            icon: PeopleIcon,
            section: 'user',
            items: [
                {
                    title: "کنترل دسترسی",
                    link: "/usermanagement/accessControl",
                    icon: SecurityIcon
                },
                {
                    title: "مدیریت نقش",
                    link: "/usermanagement/roleManagement",
                    icon: GroupIcon
                },
                {
                    title: "مدیریت دسترسی‌ها",
                    link: "/usermanagement/permission",
                    icon: LockIcon
                },
                {
                    title: "ایجاد گروه دسترسی",
                    link: "/usermanagement/create-group-access",
                    icon: GroupIcon
                },
                {
                    title: "اطلاع رسانی امنیتی",
                    link: "/usermanagement/security-announcement",
                    icon: AnnouncementIcon
                },
                {
                    title: "اطلاع رسانی عمومی",
                    link: "/usermanagement/public-announcement",
                    icon: AnnouncementIcon
                },
                {
                    title: "انتخاب جایگزین",
                    link: "/usermanagement/choose-replacement",
                    icon: SwapHorizIcon
                },
                {
                    title: "نمونه امضا",
                    link: "/usermanagement/signiture",
                    icon: DrawIcon
                }
            ]
        },
        {
            title: "سامانه تعمیرات",
            icon: BuildIcon,
            section: 'repair',
            items: [
                {
                    title: "کارتابل",
                    link: "/repair-panel/cartable",
                    icon: BuildIcon
                },
                {
                    title: "درخواست تعمیر",
                    link: "/repair-panel/repair-request",
                    icon: BuildIcon
                },
                {
                    title: "گزارش محتوا",
                    link: "/repair-panel/content-report",
                    icon: BuildIcon
                },
                {
                    title: "گزارش عملکرد یگانی",
                    link: "/repair-panel/group-performance-report",
                    icon: BuildIcon
                },
                {
                    title: "گزارش عملکرد فردی",
                    link: "/repair-panel/individual-performance-report",
                    icon: BuildIcon
                },
                {
                    title: "رابط فنی",
                    link: "/repair-panel/technical-interface",
                    icon: BuildIcon
                },
                {
                    title: "کمیسیون",
                    link: "/repair-panel/commission",
                    icon: BuildIcon
                },
                {
                    title: "اقلام امانی",
                    link: "/repair-panel/borrowed-items",
                    icon: BuildIcon
                },
                {
                    title: "لیست اقلام",
                    link: "/repair-panel/items-list",
                    icon: BuildIcon
                },
                {
                    title: "شرکت ها",
                    link: "/repair-panel/companies",
                    icon: BuildIcon
                },
                {
                    title: "اتصال کد اموال به گروه",
                    link: "/repair-panel/group-property-code",
                    icon: BuildIcon
                },
                {
                    title: "درخواست مفقودی",
                    link: "/repair-panel/missing-request",
                    icon: BuildIcon
                },
                {
                    title: "چاپ برگه خروج",
                    link: "/repair-panel/print-checkout",
                    icon: BuildIcon
                },
                {
                    title: "فرآیند سامانه",
                    link: "/repair-panel/system-process",
                    icon: BuildIcon
                }
            ]
        },
        {
            title: "سامانه مشاغل",
            icon: WorkIcon,
            section: 'jobs',
            items: [
                {
                    title: "صفحه اصلی",
                    link: "/jobs-panel",
                    icon: HomeIcon
                },
                {
                    title: "تعریف مشاغل",
                    link: "/jobs-panel/list",
                    icon: ListIcon
                },
                {
                    title: "درختواره مشاغل",
                    link: "/jobs-panel/tree",
                    icon: AccountTreeIcon
                }
            ]
        },
        {
            title: "سامانه پیگیری",
            icon: TrackChangesIcon,
            section: 'tracking',
            items: [
                {
                    title: "رد یابی",
                    link: "/tracking-panel/tracking",
                    icon: TrackChangesIcon
                }
            ]
        },
        {
            title: "سامانه کدینگ",
            icon: CodeIcon,
            section: 'coding',
            items: [
                {
                    title: "کدینگ",
                    link: "/coding-panel/coding",
                    icon: CodeIcon
                },
                {
                    title: "دسترسی کدینگ",
                    link: "/coding-panel/access",
                    icon: CodeIcon
                }
            ]
        },
        {
            title: "اطلاعات پایه",
            icon: InfoIcon,
            section: 'baseInfo',
            items: [
                {
                    title: "اطلاعات پرسنل",
                    link: "/base-info-panel/staff-info",
                    icon: GroupIcon
                },
                {
                    title: "اطلاعات خانواده",
                    link: "/base-info-panel/family-info",
                    icon: GroupIcon
                },
                {
                    title: "سایر اطلاعات",
                    link: "/base-info-panel/other-info",
                    icon: InfoIcon
                }
            ]
        }
    ];
} 