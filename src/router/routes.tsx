import { RouteObject } from 'react-router';
import { Navigate } from 'react-router-dom';
import SidebarLayout from '../layouts/SidebarLayout';
import { Box, Typography } from '@mui/material';

// Import your page components here
import Dashboard from '../pages/Dashboard';
import UserManagement from '../pages/UserManagement';
import Settings from '../pages/Settings';
// ... import other page components

// Placeholder components for panels
const RepairPanel = () => (
  <Box>
    <Typography variant="h2">سامانه تعمیرات</Typography>
  </Box>
);

const JobsPanel = () => (
  <Box>
    <Typography variant="h2">سامانه مشاغل</Typography>
  </Box>
);

const CodingPanel = () => (
  <Box>
    <Typography variant="h2">سامانه کدینگ</Typography>
  </Box>
);

const TrackingPanel = () => (
  <Box>
    <Typography variant="h2">سامانه پیگیری</Typography>
  </Box>
);

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />
  },
  {
    path: '/',
    element: <SidebarLayout />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'usermanagement/*',
        element: <UserManagement />
      },
      {
        path: 'settings',
        element: <Settings />
      },
      {
        path: 'repair-panel/*',
        element: <RepairPanel />
      },
      {
        path: 'jobs-panel/*',
        element: <JobsPanel />
      },
      {
        path: 'coding-panel/*',
        element: <CodingPanel />
      },
      {
        path: 'tracking-panel/*',
        element: <TrackingPanel />
      }
    ]
  }
];

export default routes; 