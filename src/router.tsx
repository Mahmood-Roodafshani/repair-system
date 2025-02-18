import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router';
import { Navigate } from 'react-router-dom';

import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';
import {
  AccessControl,
  BorrowedItems,
  Cartable,
  ChooseReplacement,
  CodingAccess,
  CodingHomePage,
  Commission,
  Companies,
  ContentReport,
  CreateGroupAccess,
  Dashboard,
  GroupPerformanceReport,
  GroupPropertyCode,
  IndividualPerformanceReport,
  ItemsList,
  JobsHomePage,
  JobsList,
  JobsTree,
  LoginPage,
  MissingRequest,
  PrintCheckout,
  PublicAnnouncements,
  RepairPanelHomePage,
  RepairRequest,
  RoleManagement,
  SecurityAnnouncements,
  Signiture,
  SystemProcess,
  TechnicalInterface,
  Tracking,
  TrackingHomePage,
  UserManagementHomePage
} from './content';
import {
  CodingPanelSidebarLayout,
  DashboardSidebarLayout,
  JobsPanelSidebarLayout,
  RepairPanelSidebarLayout,
  TrackingPanelSidebarLayout,
  UserManagementSidebarLayout
} from './layouts';
import { BaseInfoPanelSidebarLayout } from './layouts/baseInfoPanelSidebarLayout';
import {
  BaseInfoHomePage,
  FamilyInfo,
  OtherInfo,
  StaffInfo
} from './content/pages/baseInfoPanel';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Applications

const Messenger = Loader(
  lazy(() => import('src/content/applications/Messenger'))
);
const Transactions = Loader(
  lazy(() => import('src/content/applications/Transactions'))
);
const UserProfile = Loader(
  lazy(() => import('src/content/applications/Users/profile'))
);
const UserSettings = Loader(
  lazy(() => import('src/content/applications/Users/settings'))
);

// Components

const Buttons = Loader(
  lazy(() => import('src/content/pages/Components/Buttons'))
);
const Accordions = Loader(
  lazy(() => import('src/content/pages/Components/Accordions'))
);
const Tabs = Loader(lazy(() => import('src/content/pages/Components/Tabs')));
const Badges = Loader(
  lazy(() => import('src/content/pages/Components/Badges'))
);
const Tooltips = Loader(
  lazy(() => import('src/content/pages/Components/Tooltips'))
);
const Avatars = Loader(
  lazy(() => import('src/content/pages/Components/Avatars'))
);
const Cards = Loader(lazy(() => import('src/content/pages/Components/Cards')));
const Forms = Loader(lazy(() => import('src/content/pages/Components/Forms')));

// Status

const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);
const Status500 = Loader(
  lazy(() => import('src/content/pages/Status/Status500'))
);
const StatusComingSoon = Loader(
  lazy(() => import('src/content/pages/Status/ComingSoon'))
);
const StatusMaintenance = Loader(
  lazy(() => import('src/content/pages/Status/Maintenance'))
);

const routes: RouteObject[] = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="dashboard" replace />
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: 'overview',
        element: <Navigate to="/" replace />
      },
      {
        path: 'status',
        children: [
          {
            path: '',
            element: <Navigate to="404" replace />
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />
          }
        ]
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },
  {
    path: 'dashboard',
    element: <DashboardSidebarLayout />,
    children: [
      {
        path: '',
        element: <Dashboard />
      }
    ]
  },
  {
    path: 'repair-panel',
    element: <RepairPanelSidebarLayout />,
    children: [
      {
        path: '',
        element: <RepairPanelHomePage />
      },
      {
        path: 'cartable',
        element: <Cartable />
      },
      {
        path: 'repair-request',
        element: <RepairRequest />
      },
      {
        path: 'content-report',
        element: <ContentReport />
      },
      {
        path: 'group-performance-report',
        element: <GroupPerformanceReport />
      },
      {
        path: 'individual-performance-report',
        element: <IndividualPerformanceReport />
      },
      {
        path: 'technical-interface',
        element: <TechnicalInterface />
      },
      {
        path: 'commission',
        element: <Commission />
      },
      {
        path: 'borrowed-items',
        element: <BorrowedItems />
      },
      {
        path: 'items-list',
        element: <ItemsList />
      },
      {
        path: 'companies',
        element: <Companies />
      },
      {
        path: 'group-property-code',
        element: <GroupPropertyCode />
      },
      {
        path: 'missing-request',
        element: <MissingRequest />
      },
      {
        path: 'print-checkout',
        element: <PrintCheckout />
      },
      {
        path: 'system-process',
        element: <SystemProcess />
      }
    ]
  },
  {
    path: 'jobs-panel',
    element: <JobsPanelSidebarLayout />,
    children: [
      {
        path: '',
        element: <JobsHomePage />
      },
      {
        path: 'list',
        element: <JobsList />
      },
      {
        path: 'tree',
        element: <JobsTree />
      }
    ]
  },
  {
    path: 'tracking-panel',
    element: <TrackingPanelSidebarLayout />,
    children: [
      {
        path: '',
        element: <TrackingHomePage />
      },
      {
        path: 'tracking',
        element: <Tracking />
      }
    ]
  },
  {
    path: 'base-info-panel',
    element: <BaseInfoPanelSidebarLayout />,
    children: [
      {
        path: '',
        element: <BaseInfoHomePage />
      },
      {
        path: 'staff-info',
        element: <StaffInfo />
      },
      {
        path: 'family-info',
        element: <FamilyInfo />
      },
      {
        path: 'other-info',
        element: <OtherInfo />
      }
    ]
  },
  {
    path: 'coding-panel',
    element: <CodingPanelSidebarLayout />,
    children: [
      {
        path: '',
        element: <CodingHomePage />
      },
      {
        path: 'coding',
        element: <CodingHomePage />
      },
      {
        path: 'access',
        element: <CodingAccess />
      }
    ]
  },
  {
    path: 'usermanagement',
    element: <UserManagementSidebarLayout />,
    children: [
      {
        path: '',
        element: <UserManagementHomePage />
      },
      {
        path: 'accessControl',
        element: <AccessControl />
      },
      {
        path: 'roleManagement',
        element: <RoleManagement />
      },
      {
        path: 'create-group-access',
        element: <CreateGroupAccess />
      },
      {
        path: 'security-announcement',
        element: <SecurityAnnouncements />
      },
      {
        path: 'public-announcement',
        element: <PublicAnnouncements />
      },
      {
        path: 'choose-replacement',
        element: <ChooseReplacement />
      },
      {
        path: 'signiture',
        element: <Signiture />
      }
    ]
  }
];

export default routes;
