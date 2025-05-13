import { Stack, Typography } from '@mui/material';

import { Nodata } from 'src/assets';

export function NoData() {
  return (
    <Stack
      direction="column"
      sx={{
        width: 1,
        justifyContent: 'center',
        alignItems: 'center',
        py: 10,
      }}
    >
      <Nodata
        sx={{
          width: 42,
          height: 42,
          color: (theme) => theme.palette.text.disabled,
        }}
      />
      <Typography
        variant="caption_medium_ja"
        sx={{ color: (theme) => theme.palette.text.disabled, textAlign: 'center' }}
      >
        データがありません
      </Typography>
    </Stack>
  );
}
