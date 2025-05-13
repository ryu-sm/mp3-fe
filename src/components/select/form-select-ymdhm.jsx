import { useMemo } from 'react';
import { FormikProvider, useField, useFormik } from 'formik';

import { Stack, Typography } from '@mui/material';

import { yup, dayjs } from 'src/libs';
import { getFullDate } from 'src/utils';
import { FormWarning } from 'src/assets';

import { SelectItem } from './select-item';

export function FormSelectYmdhm({ label, ...props }) {
  const [field, meta, helpers] = useField(props);
  const { setValue, setTouched } = helpers;
  const isError = useMemo(() => meta.touched && !!meta.error, [meta.touched, meta.error]);

  const initialValues = useMemo(() => {
    const [ymd, hms] = meta.value ? meta.value.split(' ') : ['', ''];

    const [year = '', month = '', day = ''] = ymd ? ymd.split('-') : ['', '', ''];
    const [h = '', m = '', s = ''] = hms ? hms.split(':') : ['', '', '00'];
    return { year, month, day, h, m, s };
  }, [meta.value]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: yup.object({
      year: yup.string(),
      month: yup.string(),
      day: yup.string(),
      h: yup.string(),
      m: yup.string(),
    }),
    enableReinitialize: true,
    onSubmit: async (values, actions) => {
      await setTouched(true);
      if (!values.month && !values.year && !values.day && !values.h && !values.m && !values.s) {
        return await setValue('');
      }
      await setValue(
        `${values.year}-${values.month}-${values.day} ${values.h}:${values.m}:${values.s}`
      );
      await setTouched(false);
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
  const hOptions = [{ value: '', label: '--' }].concat(
    Array.from(Array(25), (_, index) => ({
      value: String(index).padStart(2, '0'),
      label: String(index).padStart(2, '0'),
    }))
  );
  const mOptions = [{ value: '', label: '--' }].concat(
    Array.from(Array(61), (_, index) => ({
      value: String(index).padStart(2, '0'),
      label: String(index).padStart(2, '0'),
    }))
  );

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
            direction="row"
            sx={{
              width: 1,
              height: 40,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <SelectItem
              name="year"
              unit="年"
              width={90}
              placeholder={'----'}
              options={yearOptions}
              onChange={() => {
                formik.handleSubmit();
              }}
            />

            <SelectItem
              name="month"
              unit="月"
              width={70}
              placeholder={'--'}
              options={monthOptions}
              onChange={() => {
                formik.handleSubmit();
              }}
            />
            <SelectItem
              name="day"
              unit="日"
              width={70}
              placeholder={'--'}
              options={dayOptions}
              onChange={() => {
                formik.handleSubmit();
              }}
            />
            <SelectItem
              name="h"
              unit="時"
              width={70}
              placeholder={'--'}
              options={hOptions}
              onChange={() => {
                formik.handleSubmit();
              }}
            />
            <SelectItem
              name="m"
              unit="分"
              width={70}
              placeholder={'--'}
              options={mOptions}
              onChange={() => {
                formik.handleSubmit();
              }}
            />
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
