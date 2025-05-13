import { useCallback, useMemo } from 'react';
import { FormikProvider, useField, useFormik } from 'formik';

import { Stack, Typography } from '@mui/material';

import { yup, dayjs } from 'src/libs';
import { getFullDate } from 'src/utils';
import { Close } from 'src/assets';

import { FilterSelectItem } from './filter-select-item';

export function FilterSelectYmd({ label, ...props }) {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;
  const isError = useMemo(() => meta.touched && !!meta.error, [meta.touched, meta.error]);

  const initialValues = useMemo(() => {
    const [year = '', month = '', day = ''] = meta.value ? meta.value.split('-') : ['', '', ''];
    return { year, month, day };
  }, [meta.value]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: yup.object({
      year: yup.string(),
      month: yup.string(),
      day: yup.string(),
    }),
    enableReinitialize: true,
    onSubmit: async (values, actions) => {
      if (!values.month && !values.year && !values.day) {
        return await setValue('');
      }
      let temp = '';
      if (values.year) {
        temp = `${temp}${values.year}-`;
      }
      if (values.month) {
        temp = `${temp}${values.month}-`;
      }
      if (values.day) {
        temp = `${temp}${values.day}`;
      }
      await setValue(temp);

      actions.setSubmitting(false);
    },
  });
  const yearOptions = [{ value: '', label: '----' }].concat(
    Array.from(Array(5), (_, index) => {
      const year = String(dayjs().year() + index).padStart(2, '0');
      return {
        value: `${year}`,
        label: `${year}`,
      };
    })
  );
  const dayOptions = useMemo(() => {
    return [
      { value: '', label: '--', className: undefined },
      ...getFullDate(formik.values.year, formik.values.month),
    ];
  }, [formik.values.year, formik.values.month]);

  const monthOptions = [{ value: '', label: '--' }].concat(
    Array.from(Array(12), (_, index) => ({
      value: String(index + 1).padStart(2, '0'),
      label: String(index + 1).padStart(2, '0'),
    }))
  );

  const handleClear = useCallback(async () => {
    await setValue('');
  }, [field, props, setValue]);

  return (
    <FormikProvider value={formik}>
      <Stack
        name={field?.name}
        direction="column"
        spacing={1}
        sx={{
          width: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <Stack
          direction="column"
          spacing={2}
          sx={{
            width: 1,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{
              width: 1,
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
              height: 40,
              justifyContent: 'space-between',
              alignItems: 'center',
              border: (theme) => `1px solid ${theme.palette.border.three}`,
              borderRadius: '8px',
              backgroundColor: (theme) =>
                meta.value?.length > 0 ? theme.palette.background.input_frame_edited : 'none',
            }}
          >
            <Stack
              direction="row"
              sx={{
                width: 1,
                height: 40,
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <FilterSelectItem
                name="year"
                unit="年"
                width={90}
                placeholder={'----'}
                options={yearOptions}
                onChange={() => {
                  formik.handleSubmit();
                }}
              />

              <FilterSelectItem
                name="month"
                unit="月"
                width={70}
                placeholder={'--'}
                options={monthOptions}
                onChange={() => {
                  formik.handleSubmit();
                }}
              />
              <FilterSelectItem
                name="day"
                unit="日"
                width={70}
                placeholder={'--'}
                options={dayOptions}
                onChange={() => {
                  formik.handleSubmit();
                }}
              />
            </Stack>
            <Stack
              direction="row"
              sx={{
                width: 32,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {meta.value?.length > 0 && (
                <Close
                  sx={{
                    width: 18,
                    height: 18,
                    color: (theme) => theme.palette.primary.main,
                  }}
                  onClick={handleClear}
                />
              )}
            </Stack>
          </Stack>
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
    </FormikProvider>
  );
}
