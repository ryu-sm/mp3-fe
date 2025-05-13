import { useField } from 'formik';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Popover, Stack, Typography } from '@mui/material';

import { Selected, SelectClose, SelectDown } from 'src/assets';

export function FilterSelect({ label, placeholder, options = [], ...props }) {
  const selectRef = useRef(null);
  const [selectWidth, setSelectWidth] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  const handleOpenPopover = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleChange = useCallback(
    async (value) => {
      handleClosePopover();
      await setValue(value);
    },
    [field, props, setValue]
  );

  const handleClear = useCallback(async () => {
    await setValue('');
  }, [field, props, setValue]);

  useEffect(() => {
    if (selectRef.current) {
      setSelectWidth(selectRef.current.offsetWidth);
    }
  }, [selectRef]);

  const openPopover = useMemo(() => Boolean(anchorEl), [anchorEl]);
  return (
    <>
      <Stack
        direction="column"
        spacing={2}
        sx={{
          width: 1,
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        <Typography variant="caption_medium_ja">{label}</Typography>
        <Stack
          ref={selectRef}
          direction="row"
          sx={{
            width: 1,
            height: 40,
            justifyContent: 'space-between',
            alignItems: 'center',
            border: (theme) => `1px solid ${theme.palette.border.three}`,
            borderRadius: '8px',
            px: 4,
          }}
          onClick={(e) => {
            handleOpenPopover(e);
          }}
        >
          <Stack>
            {meta.value?.length > 0 ? (
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  height: 30,
                  maxHeight: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: (theme) => theme.palette.background.bg_100,
                  borderRadius: 4,
                  pl: '16px',
                  pr: '12px',
                }}
              >
                <Typography variant="caption_medium_ja">
                  {meta.value ? options.find((item) => item.value === meta.value)?.label : ''}
                </Typography>
                <SelectClose
                  sx={{ width: 18, height: 18 }}
                  onClick={(e) => {
                    handleClear();
                    e.stopPropagation();
                  }}
                />
              </Stack>
            ) : (
              <Typography
                variant="caption_medium_ja"
                sx={{ color: (theme) => theme.palette.text.disabled, opacity: 0.5 }}
              >
                {placeholder}
              </Typography>
            )}
          </Stack>
          <SelectDown sx={{ width: 18, height: 18 }} />
        </Stack>
      </Stack>
      <Popover
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        sx={{
          '.MuiPopover-paper': {
            width: selectWidth,
            borderRadius: '8px',
            boxShadow: 'none',
            border: (theme) => `1px solid ${theme.palette.border.three}`,
            mt: '38px',
          },
        }}
      >
        <Stack
          direction="column"
          sx={{
            width: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          {options.map((item) => (
            <Stack
              key={item?.value}
              direction="row"
              sx={{
                height: 36,
                width: 1,
                justifyContent: 'space-between',
                alignItems: 'center',
                px: 4,
                '&:hover': {
                  background: (theme) => theme.palette.background.bg_100,
                },
              }}
              onClick={() => handleChange(item?.value)}
            >
              <Typography>{item?.label}</Typography>
              {meta?.value === item?.value && <Selected sx={{ width: 18, height: 18 }} />}
            </Stack>
          ))}
        </Stack>
      </Popover>
    </>
  );
}
