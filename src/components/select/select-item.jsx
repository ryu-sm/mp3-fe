import { useField } from 'formik';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Popover, Stack, Typography } from '@mui/material';

import { Selected, SelectDown } from 'src/assets';

export function SelectItem({ width, label, unit, placeholder, options = [], ...props }) {
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
      props?.onChange && props?.onChange();
    },
    [field, props, setValue]
  );

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
          width: width || 1,
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        {label && <Typography variant="caption_medium_ja">{label}</Typography>}
        <Stack
          ref={selectRef}
          direction="row"
          sx={{
            width: width || 1,
            height: 40,
            justifyContent: 'space-between',
            alignItems: 'center',
            border: (theme) => `1px solid ${theme.palette.border.three}`,
            borderRadius: '8px',
            backgroundColor: (theme) =>
              meta.value?.length > 0 ? theme.palette.background.input_frame_edited : 'none',
            px: 2,
          }}
          onClick={(e) => {
            handleOpenPopover(e);
          }}
        >
          <Stack>
            {meta.value?.length > 0 ? (
              <Typography
                variant="caption_medium_ja"
                sx={{
                  color: (theme) => (meta.value?.length > 0 ? theme.palette.primary.main : 'none'),
                }}
              >
                {meta.value
                  ? `${options.find((item) => item.value === meta.value)?.label}${unit}`
                  : ''}
              </Typography>
            ) : (
              <Typography
                variant="caption_medium_ja"
                sx={{ color: (theme) => theme.palette.text.disabled, opacity: 0.5 }}
              >
                {`${placeholder}${unit || ''}`}
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
                px: 2,
                '&:hover': {
                  background: (theme) => theme.palette.background.bg_100,
                },
                background: (theme) =>
                  meta?.value === item?.value ? theme.palette.background.bg_100 : 'white',
              }}
              onClick={() => handleChange(item?.value)}
            >
              <Typography>{item?.label}</Typography>
            </Stack>
          ))}
        </Stack>
      </Popover>
    </>
  );
}
