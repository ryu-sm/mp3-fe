import { useField } from 'formik';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Popover, Stack, Typography } from '@mui/material';

import { FormWarning, Selected, SelectClose, SelectDown } from 'src/assets';

export function FormSelect({ label, placeholder, options = [], ...props }) {
  const selectRef = useRef(null);
  const [selectWidth, setSelectWidth] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;
  const isError = useMemo(() => meta.touched && !!meta.error, [meta.touched, meta.error]);

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
          {isError && <FormWarning sx={{ height: 18, width: 18 }} />}
        </Stack>
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
      {isError && (
        <Stack
          direction="row"
          sx={{
            width: 430,
            justifyContent: 'flex-start',
            alignItems: 'center',
            pl: '140px',
          }}
        >
          <Typography
            variant="small_regular_ja"
            sx={{ color: (theme) => theme.palette.error.main }}
          >
            {meta.error}
          </Typography>
        </Stack>
      )}
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
    </Stack>
  );
}
