import { Stack, TableCell } from '@mui/material';
import { useMemo } from 'react';

export const CustomTabelRowCell = ({
  children,
  width,
  minWidth,
  maxWidth,
  style,
  borderLeft,
  borderRight,
  isLastrow,
  align = 'center',
}) => {
  const justifyContent = useMemo(() => {
    if (align === 'center') {
      return align;
    }
    return `flex-${align}`;
  }, [align]);

  return (
    <TableCell
      sx={{
        backgroundColor: 'white',
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
    </TableCell>
  );
};
