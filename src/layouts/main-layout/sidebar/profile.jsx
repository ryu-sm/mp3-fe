import { Avatar, Container, Stack, Typography } from '@mui/material';

import { useAuth } from 'src/store';

export function Profile() {
  const { name, email } = useAuth();
  return (
    <Stack
      direction="column"
      sx={{
        height: 94,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container
        disableGutters
        maxWidth={false}
        sx={{
          width: 204,
          height: 64,
          borderRadius: 2,
          border: (theme) => `1px solid ${theme.palette.sidebar.profile_background}`,
          background:
            'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.05) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0.00) 29.62%, rgba(255, 255, 255, 0.04) 64.81%, rgba(0, 0, 0, 0.00) 100%), linear-gradient(91deg, rgba(0, 0, 0, 0.00) 0%, rgba(255, 255, 255, 0.04) 26.97%, rgba(0, 0, 0, 0.00) 53.94%), rgba(255, 255, 255, 0.01)',
          boxShadow: '0px 0px 12px 0px rgba(255, 255, 255, 0.08) inset',
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{
            width: 1,
            height: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            px: 3,
          }}
        >
          <Avatar sx={{ height: 32, width: 32 }}>{email.charAt(0).toUpperCase()}</Avatar>
          <Typography variant="body_regular_ja" color="white">
            {name}
          </Typography>
        </Stack>
      </Container>
    </Stack>
  );
}
