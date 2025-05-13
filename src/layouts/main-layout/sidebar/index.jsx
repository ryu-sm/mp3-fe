import { Container, Stack } from '@mui/material';

import { Profile } from 'src/layouts/main-layout/sidebar/profile';
import { Search } from 'src/layouts/main-layout/sidebar/search';
import { Menu } from 'src/layouts/main-layout/sidebar/menu';
import { Logout } from 'src/layouts/main-layout/sidebar/logout';

export function Sidebar() {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        width: 220,
        height: '100dvh',
        minHeight: '100dvh',
        background: (theme) => theme.palette.sidebar.background,
        px: 2,
      }}
    >
      <Stack
        direction="column"
        spacing={0}
        sx={{
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <Profile />
        <Search />
        <Menu />
        <Logout />
      </Stack>
    </Container>
  );
}
