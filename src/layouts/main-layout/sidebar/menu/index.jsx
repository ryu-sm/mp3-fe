import { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Collapse, Stack, Typography } from '@mui/material';

import { Down, Up } from 'src/assets';

import { useAuth } from 'src/store';

export function Menu() {
  const { menuData } = useAuth();
  const { pathname } = useLocation();

  const activeIds = useMemo(() => {
    const ids = [];
    menuData.forEach((item) => {
      if (item?.link === pathname) {
        ids.push(item?.id);
      }
      if (item?.children?.length > 0) {
        item?.children?.forEach((subItem) => {
          if (subItem?.link === pathname) {
            ids.push(item?.id);
            ids.push(subItem?.id);
          }
        });
      }
    });
    return ids;
  }, [pathname, menuData]);

  return (
    <Stack
      direction="column"
      spacing={1}
      sx={{
        width: 210,
        height: 'calc(100dvh - 204px)',
        py: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      {menuData.map((item, index) => (
        <MenuItem key={index} item={item} activeIds={activeIds} pathname={pathname} />
      ))}
    </Stack>
  );
}

function MenuItem({ item, activeIds, pathname }) {
  const navigate = useNavigate();
  const [collapseOpen, setCollapseOpen] = useState(true);

  const handleClick = () => {
    if (item?.children?.length === 0 && item?.link !== pathname) {
      navigate(item?.link);
    }
    if (item?.children?.length > 0) {
      setCollapseOpen(!collapseOpen);
    }
  };

  return (
    <Stack
      direction="column"
      spacing={1}
      sx={{
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
      }}
    >
      <Button
        sx={{
          height: 36,
          width: 204,
          boxShadow: 'none',
          color: 'white',
          background: (theme) =>
            activeIds.includes(item?.id)
              ? theme.palette.sidebar.selected_background
              : 'transparent',
          '&:hover': {
            background: (theme) => theme.palette.sidebar.selected_background,
          },
          px: '10px',
        }}
        onClick={handleClick}
      >
        <Stack
          direction="row"
          spacing="10px"
          sx={{
            width: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Stack
            direction="row"
            spacing="10px"
            sx={{
              width: 1,
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            {item?.children?.length > 0 && (
              <img src={`/icons/${item?.lable}.svg`} style={{ height: 16, width: 16 }} />
            )}
            <Typography variant="small_regular_ja">{item.lable}</Typography>
          </Stack>
          {item?.children?.length > 0 && <MenuRightIcon collapseOpen={collapseOpen} />}
        </Stack>
      </Button>
      {item?.children?.length > 0 && (
        <SubMenuItem
          children={item?.children}
          collapseOpen={collapseOpen}
          activeIds={activeIds}
          pathname={pathname}
        />
      )}
    </Stack>
  );
}

function SubMenuItem({ children, collapseOpen, activeIds, pathname }) {
  const navigate = useNavigate();
  const handleClick = (item) => {
    if (item?.link !== pathname) {
      navigate(item?.link);
    }
  };

  return (
    <Collapse in={collapseOpen}>
      <Stack
        direction="column"
        spacing={1}
        sx={{
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
        }}
      >
        {children.map((item, index) => (
          <Button
            key={index}
            sx={{
              height: 36,
              width: 178,
              boxShadow: 'none',
              color: 'white',
              background: (theme) =>
                activeIds.includes(item?.id)
                  ? theme.palette.sidebar.selected_background
                  : 'transparent',
              '&:hover': {
                background: (theme) => theme.palette.sidebar.selected_background,
              },
              px: '10px',
            }}
            onClick={() => handleClick(item)}
          >
            <Stack
              direction="row"
              spacing="10px"
              sx={{
                width: 1,
                pl: 1,
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <Typography variant="small_regular_ja">{item.lable}</Typography>
            </Stack>
          </Button>
        ))}
      </Stack>
    </Collapse>
  );
}

function MenuRightIcon({ collapseOpen }) {
  if (collapseOpen) {
    return <Up sx={{ height: 16, width: 16 }} />;
  } else {
    return <Down sx={{ height: 16, width: 16 }} />;
  }
}
