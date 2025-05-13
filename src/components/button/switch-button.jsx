import { useField } from 'formik';
import { useCallback } from 'react';

import { Stack, Button, Typography } from '@mui/material';

export function SwitchButton({ label, options = [], ...props }) {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  const handleChange = useCallback(
    async (value) => {
      await setValue(value);
    },
    [field, props, setValue]
  );

  return (
    <Stack
      direction="column"
      spacing={1}
      sx={{
        width: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <Stack
        direction="row"
        sx={{
          width: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{
            width: 140,
            minWidth: 140,
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <Typography variant="caption_regular_ja">{label}</Typography>
        </Stack>
        <Stack
          direction="row"
          sx={{
            width: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <Stack
            direction="row"
            sx={{
              height: 40,
              justifyContent: 'flex-start',
              alignItems: 'center',
              background: 'rgba(35, 78, 160, 0.08)',
              borderRadius: '8px',
              px: '4px',
            }}
          >
            {options.map((item, index) => (
              <Button
                key={index}
                onClick={() => handleChange(item?.value)}
                sx={{
                  height: 32,
                  minHeight: 32,
                  width: 100,
                  boxShadow: 'none',
                  borderRadius: '8px',
                  backgroundColor: item?.value === meta?.value ? 'white' : 'transparent',
                  color: (theme) =>
                    item?.value === meta?.value
                      ? theme.palette.primary.main
                      : theme.palette.text.disabled,
                  '&:hover': {
                    backgroundColor: item?.value === meta?.value ? 'white' : 'transparent',
                    color: (theme) =>
                      item?.value === meta?.value
                        ? theme.palette.primary.main
                        : theme.palette.text.disabled,
                    boxShadow: 'none',
                  },
                }}
              >
                <Typography variant="caption_regular_ja">{item?.label}</Typography>
              </Button>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
