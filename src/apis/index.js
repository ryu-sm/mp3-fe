import { commonApis } from './common';
import { tenantApis } from './tenant';
import { superAdminApis } from './super-admin';
import { systemServiceApis } from './system-service';
import { tenantServiceApis } from './tenant-service';
import { systemNotificationApis } from './system_notification';

export const APIS = {
  ...commonApis,
  ...superAdminApis,
  ...tenantApis,
  ...systemServiceApis,
  ...tenantServiceApis,
  ...systemNotificationApis,
};
