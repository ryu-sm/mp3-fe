import { IconButton, Stack, TableCell, Typography } from '@mui/material';
import { useMemo } from 'react';

import { Sort } from 'src/assets';

export const CustomTabelHeaderCell = ({
  children,
  width,
  minWidth,
  maxWidth,
  field,
  sortBy,
  sortOrder,
  handleSort,
  style,
  borderLeft,
  borderRight,
  withSort = true,
}) => {
  const status = useMemo(() => {
    if (field === sortBy) {
      return sortOrder;
    }
    return 'none';
  }, [field, sortBy, sortOrder]);

  return (
    <TableCell
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

        {!['no', 'operation'].includes(field) && withSort && (
          <Stack
            sx={{ cursor: 'pointer', width: 16, height: 16 }}
            onClick={() => handleSort(field)}
          >
            {field && <Sort sx={{ width: 16, height: 16 }} status={status} />}
          </Stack>
        )}
      </Stack>
    </TableCell>
  );
};
