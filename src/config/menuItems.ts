import {
  Dashboard as DashboardIcon,
  Info as InfoIcon,
  Group as GroupIcon,
  Security as SecurityIcon,
  Announcement as AnnouncementIcon,
  SwapHoriz as SwapHorizIcon,
  Draw as DrawIcon,
  Build as BuildIcon,
  Work as WorkIcon,
  Code as CodeIcon,
  TrackChanges as TrackChangesIcon,
  Settings as SettingsIcon,
  List as ListIcon,
  Add as AddIcon
} from '@mui/icons-material';

export const menuConfigs = {
  main: [
    {
      name: 'داشبورد',
      link: '/dashboard',
      icon: DashboardIcon,
    },
    {
      name: 'مدیریت تعمیرات',
      link: '/repairs',
      icon: BuildIcon,
      items: [
        {
          name: 'لیست تعمیرات',
          link: '/repairs/list',
          icon: ListIcon,
        },
        {
          name: 'تعمیرات جدید',
          link: '/repairs/new',
          icon: AddIcon,
        },
      ],
    },
    {
      name: 'اطلاعات پایه',
      link: '/base-info-panel',
      icon: InfoIcon,
      items: [
        {
          name: 'اطلاعات کارکنان',
          link: '/base-info-panel/staff-info',
          icon: GroupIcon
        },
        {
          name: 'اطلاعات خانواده',
          link: '/base-info-panel/family-info',
          icon: GroupIcon
        },
        {
          name: 'اطلاعات دیگر',
          link: '/base-info-panel/other-info',
          icon: InfoIcon
        }
      ]
    },
    {
      name: 'مدیریت کاربران',
      link: '/usermanagement',
      icon: GroupIcon,
      items: [
        {
          name: 'کنترل دسترسی',
          link: '/usermanagement/accessControl',
          icon: SecurityIcon
        },
        {
          name: 'مدیریت نقش',
          link: '/usermanagement/roleManagement',
          icon: GroupIcon
        },
        {
          name: 'ایجاد گروه دسترسی',
          link: '/usermanagement/create-group-access',
          icon: GroupIcon
        },
        {
          name: 'اطلاع رسانی امنیتی',
          link: '/usermanagement/security-announcement',
          icon: AnnouncementIcon
        },
        {
          name: 'اطلاع رسانی عمومی',
          link: '/usermanagement/public-announcement',
          icon: AnnouncementIcon
        },
        {
          name: 'انتخاب جایگزین',
          link: '/usermanagement/choose-replacement',
          icon: SwapHorizIcon
        },
        {
          name: 'نمونه امضا',
          link: '/usermanagement/signiture',
          icon: DrawIcon
        }
      ]
    },
    {
      name: 'سامانه تعمیرات',
      link: '/repair-panel',
      icon: BuildIcon,
      items: [
        {
          name: 'کارتابل',
          link: '/repair-panel/cartable',
          icon: BuildIcon
        },
        {
          name: 'درخواست تعمیر',
          link: '/repair-panel/repair-request',
          icon: BuildIcon
        },
        {
          name: 'گزارش محتوا',
          link: '/repair-panel/content-report',
          icon: BuildIcon
        },
        {
          name: 'گزارش عملکرد یگانی',
          link: '/repair-panel/group-performance-report',
          icon: BuildIcon
        },
        {
          name: 'گزارش عملکرد فردی',
          link: '/repair-panel/individual-performance-report',
          icon: BuildIcon
        },
        {
          name: 'رابط فنی',
          link: '/repair-panel/technical-interface',
          icon: BuildIcon
        },
        {
          name: 'کمیسیون',
          link: '/repair-panel/commission',
          icon: BuildIcon
        },
        {
          name: 'اقلام امانی',
          link: '/repair-panel/borrowed-items',
          icon: BuildIcon
        },
        {
          name: 'لیست اقلام',
          link: '/repair-panel/items-list',
          icon: BuildIcon
        },
        {
          name: 'شرکت ها',
          link: '/repair-panel/companies',
          icon: BuildIcon
        },
        {
          name: 'اتصال کد اموال به گروه',
          link: '/repair-panel/group-property-code',
          icon: BuildIcon
        },
        {
          name: 'درخواست مفقودی',
          link: '/repair-panel/missing-request',
          icon: BuildIcon
        },
        {
          name: 'چاپ برگه خروج',
          link: '/repair-panel/print-checkout',
          icon: BuildIcon
        },
        {
          name: 'فرآیند سامانه',
          link: '/repair-panel/system-process',
          icon: BuildIcon
        }
      ]
    },
    {
      name: 'سامانه مشاغل',
      link: '/jobs-panel',
      icon: WorkIcon,
      items: [
        {
          name: 'لیست مشاغل',
          link: '/jobs-panel/list',
          icon: WorkIcon
        },
        {
          name: 'درختواره مشاغل',
          link: '/jobs-panel/tree',
          icon: WorkIcon
        }
      ]
    },
    {
      name: 'سامانه کدینگ',
      link: '/coding-panel',
      icon: CodeIcon,
      items: [
        {
          name: 'کدینگ',
          link: '/coding-panel/coding',
          icon: CodeIcon
        },
        {
          name: 'دسترسی کدینگ',
          link: '/coding-panel/access',
          icon: CodeIcon
        }
      ]
    },
    {
      name: 'سامانه پیگیری',
      link: '/tracking-panel',
      icon: TrackChangesIcon,
      items: [
        {
          name: 'پیگیری',
          link: '/tracking-panel/tracking',
          icon: TrackChangesIcon
        }
      ]
    }
  ]
};