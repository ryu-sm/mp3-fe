import { Button, Stack, Typography } from '@mui/material';

export function ActionButton({ children, startIcon, width, height, ...props }) {
  return (
    <Button
      sx={{
        backgroundColor: 'transparent',
        width: width || 112,
        height: height || 32,
        boxShadow: 'none',
        borderRadius: '8px',
        border: (theme) => `1px solid ${theme.palette.border.three}`,
        color: 'black',
        '&.Mui-disabled': {
          backgroundColor: (theme) => theme.palette.background.button_disabled,
          color: (theme) => theme.palette.text.disabled,
        },
        '&:hover': {
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
        px: 0,
      }}
      {...props}
    >
      <Stack
        direction="row"
        spacing={1}
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {startIcon}
        <Typography variant="caption_regular_ja">{children}</Typography>
      </Stack>
    </Button>
  );
}
