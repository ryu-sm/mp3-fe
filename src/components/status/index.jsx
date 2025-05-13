import { Stack, Typography } from '@mui/material';

export function Status({ label, isDisable }) {
  return (
    <Stack
      direction="row"
      sx={{
        height: 22,
        borderRadius: 3,
        backgroundColor: (theme) =>
          isDisable ? theme.palette.text.disabled : theme.palette.success.main,
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
      }}
    >
      <Typography variant="small_regular_ja" color="white">
        {label}
      </Typography>
    </Stack>
  );
}
