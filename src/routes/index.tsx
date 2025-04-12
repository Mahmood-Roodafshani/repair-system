import { Suspense, lazy, ComponentType } from 'react';
import { RouteObject, Navigate, useRoutes } from 'react-router-dom';

import SidebarLayout from 'src/layouts/SidebarLayout';
import SuspenseLoader from 'src/components/SuspenseLoader';
import {
  AccessControl,
  BorrowedItems,
  Cartable,
  ChooseReplacement,
  Coding,
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
} from 'src/pages';
import {
  BaseInfoHomePage,
  FamilyInfo,
  OtherInfo,
  StaffInfo
} from 'src/pages/baseInfoPanel';

const Loader = <P extends object>(Component: ComponentType<P>) => (props: P) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

const Buttons = Loader(
  lazy(() => import('src/pages/Components/Buttons'))
);
const Accordions = Loader(
  lazy(() => import('src/pages/Components/Accordions'))
);
const Tabs = Loader(lazy(() => import('src/pages/Components/Tabs')));
const Badges = Loader(
  lazy(() => import('src/pages/Components/Badges'))
);
const Tooltips = Loader(
  lazy(() => import('src/pages/Components/Tooltips'))
);
const Avatars = Loader(
  lazy(() => import('src/pages/Components/Avatars'))
);
const Cards = Loader(lazy(() => import('src/pages/Components/Cards')));
const Forms = Loader(lazy(() => import('src/pages/Components/Forms')));

// Status pages
const Status404 = Loader(
  lazy(() => import('src/pages/Status/Status404'))
);
const Status500 = Loader(
  lazy(() => import('src/pages/Status/Status500'))
);
const StatusComingSoon = Loader(
  lazy(() => import('src/pages/Status/ComingSoon'))
);
const StatusMaintenance = Loader(
  lazy(() => import('src/pages/Status/Maintenance'))
);

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const routes: RouteObject[] = [
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <SidebarLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '',
        element: <Navigate to="/dashboard" replace />
      },
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'repair-panel',
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
        children: [
          {
            path: '',
            element: <CodingHomePage />
          },
          {
            path: 'coding',
            element: <Coding />
          },
          {
            path: 'access',
            element: <CodingAccess />
          }
        ]
      },
      {
        path: 'usermanagement',
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
      },
      {
        path: 'status',
        children: [
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
  }
];

export default function AppRoutes() {
  return useRoutes(routes);
}
