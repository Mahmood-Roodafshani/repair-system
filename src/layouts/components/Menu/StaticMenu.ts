import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import CodeIcon from '@mui/icons-material/Code';
import InfoIcon from '@mui/icons-material/Info';
import BuildIcon from '@mui/icons-material/Build';
import WorkIcon from '@mui/icons-material/Work';

export class StaticMenu {
    static appMenuItems = [
        {
            title: "داشبورد",
            link: "/dashboard",
            icon: DashboardIcon
        },
        {
            title: "مدیریت کاربران",
            icon: PeopleIcon,
            items: [
                {
                    title: "کنترل دسترسی",
                    link: "/usermanagement/accessControl"
                },
                {
                    title: "مدیریت نقش",
                    link: "/usermanagement/roleManagement"
                },
                {
                    title: "ایجاد گروه دسترسی",
                    link: "/usermanagement/create-group-access"
                }
            ]
        },
        {
            title: "پنل تعمیرات",
            icon: BuildIcon,
            items: [
                {
                    title: "تعمیرات",
                    link: "/repair-panel/repair"
                },
                {
                    title: "مدیریت دسترسی",
                    link: "/repair-panel/access"
                }
            ]
        },
        {
            title: "پنل مشاغل",
            icon: WorkIcon,
            items: [
                {
                    title: "مشاغل",
                    link: "/jobs-panel/jobs"
                },
                {
                    title: "مدیریت دسترسی",
                    link: "/jobs-panel/access"
                }
            ]
        },
        {
            title: "پنل پیگیری",
            icon: TrackChangesIcon,
            items: [
                {
                    title: "پیگیری",
                    link: "/tracking-panel/tracking"
                }
            ]
        },
        {
            title: "پنل کدینگ",
            icon: CodeIcon,
            items: [
                {
                    title: "کدینگ",
                    link: "/coding-panel/coding"
                },
                {
                    title: "مدیریت دسترسی",
                    link: "/coding-panel/access"
                }
            ]
        },
        {
            title: "اطلاعات پایه",
            icon: InfoIcon,
            items: [
                {
                    title: "اطلاعات پرسنل",
                    link: "/base-info-panel/staff-info"
                },
                {
                    title: "اطلاعات خانواده",
                    link: "/base-info-panel/family-info"
                },
                {
                    title: "سایر اطلاعات",
                    link: "/base-info-panel/other-info"
                }
            ]
        }
    ];
} 