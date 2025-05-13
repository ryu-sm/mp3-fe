import { useField } from 'formik';
import { useCallback, useMemo } from 'react';

import { Stack, styled, TextareaAutosize, TextField, Typography } from '@mui/material';

import { FormWarning } from 'src/assets';

const CustomTextarea = styled(TextareaAutosize, {
  shouldForwardProp: (prop) => prop !== 'error' && prop !== 'success',
})(({ theme, error, success }) => ({
  width: '100%',
  padding: '12px',
  paddingTop: '8px',
  paddingBottom: '8px',
  lineHeight: 1.5,
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.fontWeightMedium,
  border: error
    ? `1px solid ${theme.palette.error.main}`
    : `1px solid ${theme.palette.border.three}`,
  color: theme.palette.primary.main,
  borderRadius: '8px',
  fontSize: 14,
  resize: 'none',
  backgroundColor: error
    ? theme.palette.error.light
    : success
      ? theme.palette.background.input_frame_edited
      : 'white',
  '&:focus': {
    outline: 'none',
    backgroundColor: theme.palette.background.input_frame_edited,
  },
  '&::placeholder': {
    color: error ? theme.palette.error.main : theme.palette.text.disabled,
    opacity: error ? 1 : 0.5,
  },
}));

export function FormInputTextMuitiline({ label, placeholder, disabled = false, ...props }) {
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
        <CustomTextarea
          {...field}
          fullWidth
          multiline
          minRows={3}
          autoComplete="off"
          placeholder={placeholder}
          value={meta.value}
          error={isError}
          success={isSuccess}
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
