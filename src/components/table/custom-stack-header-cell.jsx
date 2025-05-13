import { Stack, Typography } from '@mui/material';

export const CustomStackTabelHeaderCell = ({
  children,
  width,
  minWidth,
  maxWidth,
  style,
  borderLeft,
  borderRight,
}) => {
  return (
    <Stack
      sx={{
        backgroundColor: (theme) => theme.palette.primary.light,
        borderLeft: (theme) => (borderLeft ? `1px solid ${theme.palette.border.one}` : 'none'),
        borderRight: (theme) => (borderRight ? `1px solid ${theme.palette.border.one}` : 'none'),
        borderBottom: (theme) => `1px solid ${theme.palette.border.one}`,
        width: width,
        maxWidth: maxWidth,
        minWidth: minWidth,
        p: 0,
      }}
      style={{ ...style }}
    >
      <Stack
        direction="row"
        spacing={1}
        sx={{
          height: 48,
          width: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="caption_regular_ja">{children}</Typography>
      </Stack>
    </Stack>
  );
};
