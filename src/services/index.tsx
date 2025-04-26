export * from './userService';
export * from './baseInfoPanel';
export * from './jobsPanel';
export * from './codingPanel';
export * from './repairPanel';
export * from './common';
export { fetchJobsList, removeJob } from './jobsPanel/jobsPanelService';

// Import and export role management functions directly
import { roleManagementService } from './userManagement/roleManagementService';
export const { getSystemRoles, storeNewRole, storeNewSystem, removeRole, removeSystem } = roleManagementService;
