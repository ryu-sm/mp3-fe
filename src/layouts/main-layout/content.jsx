import { Container, Stack, Typography } from '@mui/material';

export function Content({ children, pageTitle }) {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        width: `calc(100vw - 200px)`,
        height: '100dvh',
        maxHeight: '100dvh',
        px: 6,
        pb: 6,
      }}
    >
      <Stack
        direction="row"
        sx={{
          height: 64,
          width: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          px: 3,
        }}
      >
        <Typography variant="h6_medium_ja">{pageTitle}</Typography>
      </Stack>
      <Stack
        direction="column"
        sx={{
          width: 1,
          height: 'calc(100dvh - 88px)',
          minHeight: 'calc(100dvh - 88px)',
          borderRadius: 2,
          justifyContent: 'flex-start',
          alignItems: 'center',
          background: (theme) => theme.palette.common.white,
          p: '16px',
        }}
      >
        {children}
      </Stack>
    </Container>
  );
}
