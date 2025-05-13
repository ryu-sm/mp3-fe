import { useField } from 'formik';
import { useCallback, useMemo } from 'react';

import { Stack, TextField, Typography } from '@mui/material';

import { FormWarning } from 'src/assets';

export function FormInputText({ label, placeholder, disabled = false, ...props }) {
  const [field, meta, helpers] = useField(props);
  const { setValue, setTouched } = helpers;
  const isError = useMemo(() => meta.touched && !!meta.error, [meta.touched, meta.error]);
  const isSuccess = useMemo(
    () => !isError && !!meta.value && meta.value !== '',
    [isError, meta.value]
  );

  const handelBlue = useCallback(
    (e) => {
      field.onBlur(e);
      props.onBlur && props.onBlur(e);
    },
    [field, props]
  );

  const handleFocus = useCallback(
    async (e) => {
      props.onFocus && props.onFocus(e);
      await setTouched(false);
    },
    [props, setTouched]
  );

  const handleChange = useCallback(
    async (e) => {
      field.onChange(e);
      props.onChange && props.onChange(e);
      await setValue(e.target.value);
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
          {isError && <FormWarning sx={{ height: 18, width: 18 }} />}
        </Stack>
        <TextField
          {...field}
          fullWidth
          autoComplete="off"
          placeholder={placeholder}
          value={meta.value}
          error={isError}
          sx={{
            ...(isSuccess && {
              '.MuiInputBase-input': {
                backgroundColor: (theme) => theme.palette.background.input_frame_edited,
                boxShadow: 'none',
              },
            }),
          }}
          onBlur={handelBlue}
          onFocus={handleFocus}
          onChange={handleChange}
          disabled={disabled}
        />
      </Stack>
      {isError && (
        <Stack
          direction="row"
          sx={{
            width: 1,
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
    </Stack>
  );
}
