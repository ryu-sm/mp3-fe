import { Button } from '@mui/material';

export function PrimaryButton({ children, width, height, ...props }) {
  return (
    <Button
      sx={{
        backgroundColor: (theme) => theme.palette.primary.main,
        width: width || 120,
        height: height || 36,
        boxShadow: 'none',
        '&.Mui-disabled': {
          backgroundColor: (theme) => theme.palette.background.button_disabled,
          color: (theme) => theme.palette.text.disabled,
        },
        '&:hover': {
          backgroundColor: (theme) => theme.palette.primary.main,
          boxShadow: 'none',
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
