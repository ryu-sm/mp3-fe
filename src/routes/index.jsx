import { Route, Routes } from 'react-router-dom';

import { ScrollToTop } from 'src/components';
import { GroupRoute } from 'src/routes/group-route';
import { publicRoutes } from 'src/routes/public-routes';
import { superRoutes } from 'src/routes/super-routes';

export function RootRoutes() {
  return (
    <ScrollToTop>
      <Routes>
        <Route element={<GroupRoute groupName="public" />}>
          {publicRoutes.map((item, index) => (
            <Route key={index} path={item?.path} element={<item.Element />} />
          ))}
        </Route>
        <Route element={<GroupRoute groupName="super" />}>
          {superRoutes.map((item, index) => (
            <Route key={index} path={item?.path} element={<item.Element />} />
          ))}
        </Route>
      </Routes>
    </ScrollToTop>
  );
}
