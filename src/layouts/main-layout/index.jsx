import { Container } from '@mui/material';

import { Sidebar } from 'src/layouts/main-layout/sidebar';
import { Content } from 'src/layouts/main-layout/content';

export function MainLayout({ children, pageTitle }) {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        width: 1,
        height: '100dvh',
        maxHeight: '100dvh',
        background: (theme) => theme.palette.background.container,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
      }}
    >
      <Sidebar />
      <Content pageTitle={pageTitle}>{children}</Content>
    </Container>
  );
}
