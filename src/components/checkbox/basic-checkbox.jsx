import { useField } from 'formik';
import { useCallback } from 'react';

import { IconButton, Stack } from '@mui/material';
import { Uncheck, Checked } from 'src/assets';

export function BasicCheckbox({ disabled = false, ...props }) {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  const onClick = useCallback(
    async (value) => {
      props.onClick && props.onClick(value);
      await setValue(value);
    },
    [field, props, setValue]
  );
  return (
    <Stack name={field?.name}>
      {meta.value === 0 ? (
        <IconButton
          disabled={disabled}
          sx={{ borderRadius: 2, height: 24, width: 24 }}
          onClick={() => onClick(1)}
        >
          <Uncheck sx={{ height: 20, width: 20 }} />
        </IconButton>
      ) : (
        <IconButton
          disabled={disabled}
          sx={{ borderRadius: 2, height: 24, width: 24 }}
          onClick={() => onClick(0)}
        >
          <Checked sx={{ height: 20, width: 20 }} />
        </IconButton>
      )}
    </Stack>
  );
}
