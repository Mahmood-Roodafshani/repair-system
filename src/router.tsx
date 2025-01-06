import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router';
import { Navigate } from 'react-router-dom';

import BaseLayout from 'src/layouts/BaseLayout';
import SidebarLayout from 'src/layouts/SidebarLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';
import {
  AccessControl,
  BorrowedItems,
  Cartable,
  ChooseReplacement,
  Commission,
  Companies,
  ContentReport,
  CreateGroupAccess,
  Dashboard,
  GroupPerformanceReport,
  GroupPropertyCode,
  IndividualPerformanceReport,
  ItemsList,
  LoginPage,
  MissingRequest,
  PrintCheckout,
  PublicAnnouncements,
  RepairRequest,
  RoleManagement,
  SecurityAnnouncements,
  SystemProcess,
  TechnicalInterface,
  UserManagementHomePage
} from './content';
import { UserManagementSidebarLayout } from './layouts/userManagementSidebarLayout';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Pages

const Overview = Loader(lazy(() => import('src/content/overview')));

// Dashboards

const Crypto = Loader(lazy(() => import('src/content/dashboards/Crypto')));

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
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Dashboard />
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
      }
    ]
  }
];

export default routes;
