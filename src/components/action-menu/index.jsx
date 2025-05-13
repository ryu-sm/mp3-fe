import { useMemo, useState } from 'react';
import { Menu, MenuItem, Stack, Typography } from '@mui/material';

import { Operation } from 'src/assets';

export function ActionMenu({ actionConfig }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = useMemo(() => Boolean(anchorEl), [anchorEl]);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Stack>
      <Operation sx={{ height: 16, width: 16, cursor: 'pointer' }} onClick={handleOpenMenu} />

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        onClick={handleCloseMenu}
        disableAutoFocusItem
        MenuListProps={{ disablePadding: true }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              mt: 2,
              ml: 3,
              width: 190,
              overflow: 'visible',
              boxShadow:
                '0px 4px 6px -1px rgba(0, 0, 0, 0.10), 0px 2px 4px -2px rgba(0, 0, 0, 0.10)',
              border: (theme) => `1px solid ${theme.palette.border.one}`,
              borderRadius: '10px',

              '& .MuiMenuItem-root:first-of-type': {
                borderTopLeftRadius: '10px',
                borderTopRightRadius: '10px',
              },
              '& .MuiMenuItem-root:last-of-type': {
                borderBottomLeftRadius: '10px',
                borderBottomRightRadius: '10px',
                borderBottom: 'none',
              },
            },
          },
        }}
      >
        {actionConfig.map((item) => (
          <MenuItem
            autoFocus={false}
            key={item?.label}
            sx={{
              height: 42,
              borderBottom: (theme) => `1px solid ${theme.palette.border.one}`,
            }}
            onClick={item?.handleClick}
          >
            <Typography variant="caption_regular_ja">{item?.label}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Stack>
  );
}
