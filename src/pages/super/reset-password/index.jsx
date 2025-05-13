import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormikProvider, useFormik } from 'formik';
import { Stack, Typography } from '@mui/material';

import { InputPassWord, PrimaryButton } from 'src/components';
import { PublicLayout } from 'src/layouts';
import { MainLog } from 'src/assets';
import { publicPaths } from 'src/routes/paths';
import { APIS } from 'src/apis';
import { useCurrSearchParams } from 'src/hooks';

import { validationSchema } from './validationSchema';

export default function SuperResetPasswordPage() {
  const navigate = useNavigate();
  const token = useCurrSearchParams().get('token');
  const [warningText, setWarningText] = useState('');
  const formik = useFormik({
    initialValues: { password: '', confirm_password: '' },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await APIS.updateSuperAdminPassword({
          password: values.password,
          token: token,
        });
        navigate(publicPaths.superLogin);
      } catch (error) {
        if ([400].includes(error?.status)) {
          setWarningText(error?.data?.message);
        }
      }
    },
  });
  return (
    <PublicLayout>
      <FormikProvider value={formik}>
        <Stack
          direction="row"
          sx={{
            width: 1000,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <MainLog sx={{ width: 400, height: 296 }} />
          <Stack
            direction="column"
            spacing={6}
            sx={{
              width: 360,
              borderRadius: '10px',
              background: (theme) => theme.palette.background.public_paper,
              justifyContent: 'center',
              alignItems: 'center',
              p: 6,
            }}
          >
            <Typography variant="h6_bold_ja">パスワードリセット</Typography>
            <Typography
              variant="small_regular_ja"
              sx={{ color: (theme) => theme.palette.error.main, whiteSpace: 'break-spaces' }}
            >
              {warningText}
            </Typography>
            <InputPassWord
              name="password"
              label="パスワード"
              placeholder="パスワードを入力してください"
              showPwdPower
              onFocus={() => setWarningText('')}
            />
            <InputPassWord
              name="confirm_password"
              label="パスワード（確認用）"
              placeholder="パスワードを入力してください"
              onFocus={() => setWarningText('')}
            />
            <PrimaryButton
              width={160}
              onClick={formik.handleSubmit}
              disabled={formik.isSubmitting || !(formik.isValid && formik.dirty)}
            >
              パスワード設定
            </PrimaryButton>
          </Stack>
        </Stack>
      </FormikProvider>
    </PublicLayout>
  );
}
