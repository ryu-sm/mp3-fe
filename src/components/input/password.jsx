import { useField } from 'formik';
import { useCallback, useMemo, useState } from 'react';

import { Box, Stack, TextField, Typography } from '@mui/material';

import { EyeClose, EyeOpen, PwdCheckOn, PwdCheckOff } from 'src/assets';

export function InputPassWord({ label, placeholder, showPwdPower, ...props }) {
  const [field, meta, helpers] = useField(props);
  const { setValue, setTouched } = helpers;
  const isError = useMemo(() => meta.touched && !!meta.error, [meta.touched, meta.error]);
  const isSuccess = useMemo(
    () => !isError && !!meta.value && meta.value !== '',
    [isError, meta.value]
  );
  const isLengthValid = useMemo(
    () => meta.value?.length >= 8 && meta.value?.length <= 20,
    [meta.value]
  );
  const isContentValid = useMemo(
    () => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/.test(meta.value),
    [meta.value]
  );

  const [showPwd, setShowPwd] = useState(false);

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
      spacing={2}
      sx={{
        width: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <Typography variant="caption_medium_ja">{label}</Typography>
      <Box sx={{ display: 'inline-block', position: 'relative', width: 1 }}>
        <TextField
          {...field}
          fullWidth
          type={showPwd ? 'text' : 'password'}
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
        {showPwd ? (
          <EyeOpen
            sx={{
              top: 11,
              right: 16,
              width: 18,
              height: 18,
              position: 'absolute',
              color: (theme) =>
                isError ? theme.palette.secondary.main : theme.palette.primary.main,
            }}
            onClick={() => setShowPwd(false)}
          />
        ) : (
          <EyeClose
            sx={{
              top: 11,
              right: 16,
              width: 18,
              height: 18,
              position: 'absolute',
              color: (theme) =>
                isError ? theme.palette.secondary.main : theme.palette.primary.main,
            }}
            onClick={() => setShowPwd(true)}
          />
        )}
      </Box>

      {isError && (
        <Typography variant="small_regular_ja" sx={{ color: (theme) => theme.palette.error.main }}>
          {meta.error}
        </Typography>
      )}
      {showPwdPower && (
        <Stack
          direction="column"
          spacing={1}
          sx={{
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            {isContentValid ? (
              <PwdCheckOn sx={{ width: 24, height: 24 }} />
            ) : (
              <PwdCheckOff sx={{ width: 24, height: 24 }} />
            )}
            <Typography
              variant="caption_regular_ja"
              sx={{
                color: (theme) =>
                  isContentValid ? theme.palette.text.primary : theme.palette.text.disabled,
              }}
            >
              大文字英字・小文字英字・数字の3種混在
            </Typography>
          </Stack>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            {isLengthValid ? (
              <PwdCheckOn sx={{ width: 24, height: 24 }} />
            ) : (
              <PwdCheckOff sx={{ width: 24, height: 24 }} />
            )}
            <Typography
              variant="caption_regular_ja"
              sx={{
                color: (theme) =>
                  isContentValid ? theme.palette.text.primary : theme.palette.text.disabled,
              }}
            >
              8文字以上20文字以下
            </Typography>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}
