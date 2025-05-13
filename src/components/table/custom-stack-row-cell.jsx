import { Stack } from '@mui/material';
import { useMemo } from 'react';

export const CustomStackTabelRowCell = ({
  children,
  width,
  height,
  minWidth,
  maxWidth,
  style,
  borderLeft,
  borderRight,
  isLastrow,
  isEdit = false,
  align = 'center',
}) => {
  const justifyContent = useMemo(() => {
    if (align === 'center') {
      return align;
    }
    return `flex-${align}`;
  }, [align]);

  return (
    <Stack
      sx={{
        height: height || 48,
        backgroundColor: (theme) => (isEdit ? theme.palette.success.light : 'white'),
        borderLeft: (theme) => (borderLeft ? `1px solid ${theme.palette.border.one}` : 'none'),
        borderRight: (theme) => (borderRight ? `1px solid ${theme.palette.border.one}` : 'none'),
        borderBottom: (theme) => (isLastrow ? 'none' : `1px solid ${theme.palette.border.one}`),
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
          justifyContent: justifyContent,
          alignItems: 'center',
          px: '12px',
        }}
      >
        {children}
      </Stack>
    </Stack>
  );
};
