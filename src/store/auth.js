import { jwtDecode } from 'jwt-decode';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { superPaths } from 'src/routes/paths';

const authInitialValues = {
  isLogined: false,
  isSuperAdmin: true,
  id: null,
  name: null,
  email: null,
  menuData: null,
};

const superAdminMenuData = [
  {
    id: 1,
    lable: 'テナント管理',
    children: [
      { id: 2, lable: 'テナント情報', link: superPaths.tenants },
      { id: 3, lable: 'テナントサービス情報', link: superPaths.tenantServices },
    ],
  },
  {
    id: 4,
    lable: 'システム管理',
    children: [
      { id: 5, lable: 'スーパーユーザー情報', link: superPaths.superAdmins },
      { id: 6, lable: 'システムサービス情報', link: superPaths.systemServices },
      { id: 7, lable: 'システムお知らせ情報', link: superPaths.systemNotifications },
    ],
  },
];

export const useAuth = create(
  persist(
    (set) => ({
      ...authInitialValues,
      setAuthWithSuperAdminLogin: (access_token, refresh_token) => {
        localStorage.setItem('accessToken', access_token);
        localStorage.setItem('refreshToken', refresh_token);
        const payload = jwtDecode(access_token);
        set({
          ...authInitialValues,
          isLogined: true,
          isSuperAdmin: payload?.is_super_admin,
          id: payload?.id,
          name: payload?.name,
          email: payload?.email,
          menuData: superAdminMenuData,
        });
      },

      resetAuth: () => {
        set(authInitialValues);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      },
    }),
    { name: 'authInfo', storage: createJSONStorage(() => localStorage) }
  )
);
