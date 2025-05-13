import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Stack, Typography } from '@mui/material';

import { Logout01, Confirm } from 'src/assets';
import { DailogModal } from 'src/components';

import { useAuth } from 'src/store';
import { publicPaths } from 'src/routes/paths';

export function Logout() {
  const navigate = useNavigate();
  const { resetAuth } = useAuth();
  const [openLogout, setOpenLogout] = useState(false);

  const handleLogout = async () => {
    // TODO:
    resetAuth();
    setOpenLogout(false);
    navigate(publicPaths.superLogin, { replace: true });
  };
  return (
    <Stack
      direction="column"
      sx={{
        height: 64,
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <Stack
        direction="column"
        sx={{
          height: 64,
          width: 204,
          borderTop: (theme) => `0.5px solid ${theme.palette.sidebar.sub_text}`,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          sx={{
            height: 36,
            width: 204,
            boxShadow: 'none',
            color: 'white',
            px: '10px',
            background: 'transparent',
            '&:hover': {
              background: (theme) => theme.palette.sidebar.selected_background,
            },
          }}
          onClick={() => setOpenLogout(true)}
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
            <Logout01 sx={{ height: 18, width: 18 }} />
            <Typography variant="small_regular_ja">ログアウト</Typography>
          </Stack>
        </Button>
      </Stack>
      {openLogout && (
        <DailogModal
          open={openLogout}
          icon={<Confirm sx={{ height: 60, width: 60 }} />}
          title="ログアウト"
          content="アカウントをログアウトします。よろしいですか？"
          confirmText="ログアウトする"
          handleClose={() => setOpenLogout(false)}
          handleConfirm={handleLogout}
        />
      )}
    </Stack>
  );
}
