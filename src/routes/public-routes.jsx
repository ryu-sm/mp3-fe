import { lazy } from 'react';
import { publicPaths } from 'src/routes/paths';

const SuperLoginPage = lazy(() => import('src/pages/super/login'));
const SuperSetPasswordPage = lazy(() => import('src/pages/super/set-password'));
const SuperResetPasswordPage = lazy(() => import('src/pages/super/reset-password'));

export const publicRoutes = [
  { path: publicPaths.superLogin, Element: SuperLoginPage },
  { path: publicPaths.superSetPassword, Element: SuperSetPasswordPage },
  { path: publicPaths.superResetPassword, Element: SuperResetPasswordPage },
];
