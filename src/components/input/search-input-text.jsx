import { useField } from 'formik';
import { useCallback, useMemo } from 'react';

import { Box, Stack, TextField, Typography } from '@mui/material';

import { Close } from 'src/assets';

export function SearchInputText({ label, placeholder, width = 1, ...props }) {
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

  const handleClear = useCallback(async () => {
    await setValue('');
  }, [field, props, setValue]);

  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{
        width: width,
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <Typography variant="caption_medium_ja">{label}</Typography>
      <Box sx={{ display: 'inline-block', position: 'relative', width: 1 }}>
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
              '&&&& fieldset': { color: (theme) => theme.palette.primary.main },
            }),
          }}
          onBlur={handelBlue}
          onFocus={handleFocus}
          onChange={handleChange}
        />
        {!!meta.value && (
          <Close
            sx={{
              top: 11,
              right: 16,
              width: 18,
              height: 18,
              position: 'absolute',
              color: (theme) =>
                isError ? theme.palette.secondary.main : theme.palette.primary.main,
            }}
            onClick={handleClear}
          />
        )}
      </Box>
      {isError && (
        <Typography variant="small_regular_ja" sx={{ color: (theme) => theme.palette.error.main }}>
          {meta.error}
        </Typography>
      )}
    </Stack>
  );
}
