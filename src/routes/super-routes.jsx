import { lazy } from 'react';
import { superPaths } from 'src/routes/paths';

const TenantsPage = lazy(() => import('src/pages/super/tenants'));
const SuperAdminsPage = lazy(() => import('src/pages/super/super-admins'));
const SystemServicesPage = lazy(() => import('src/pages/super/system-services'));
const TenantServicesPage = lazy(() => import('src/pages/super/tenant-services'));
const SystemNotificationsPage = lazy(() => import('src/pages/super/system_notifications'));

export const superRoutes = [
  { path: superPaths.tenants, Element: TenantsPage },
  { path: superPaths.superAdmins, Element: SuperAdminsPage },
  { path: superPaths.systemServices, Element: SystemServicesPage },
  { path: superPaths.tenantServices, Element: TenantServicesPage },
  { path: superPaths.systemNotifications, Element: SystemNotificationsPage },
];
