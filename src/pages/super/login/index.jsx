import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormikProvider, useFormik } from 'formik';
import { Stack, Typography } from '@mui/material';

import { InputEmail, InputPassWord, PrimaryButton } from 'src/components';
import { PublicLayout } from 'src/layouts';
import { MainLog } from 'src/assets';
import { superPaths } from 'src/routes/paths';
import { APIS } from 'src/apis';
import { useAuth } from 'src/store';

import { validationSchema } from './validationSchema';

export default function SuperLoginPage() {
  const navigate = useNavigate();
  const [warningText, setWarningText] = useState('');
  const { setAuthWithSuperAdminLogin } = useAuth();
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await APIS.superAdminLogin(values);
        setAuthWithSuperAdminLogin(res?.data?.access_token, res?.data?.refresh_token);
        navigate(superPaths.tenants);
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
            <Typography variant="h6_bold_ja">LOGIN</Typography>
            <Typography
              variant="small_regular_ja"
              sx={{ color: (theme) => theme.palette.error.main, whiteSpace: 'break-spaces' }}
            >
              {warningText}
            </Typography>
            <InputEmail
              name="email"
              label="ID：メールアドレス"
              placeholder="メールアドレスを入力してください"
              onFocus={() => setWarningText('')}
            />
            <InputPassWord
              name="password"
              label="パスワード"
              placeholder="パスワードを入力してください"
              showPwdPower
              onFocus={() => setWarningText('')}
            />
            <PrimaryButton
              onClick={formik.handleSubmit}
              disabled={formik.isSubmitting || !(formik.isValid && formik.dirty)}
            >
              ログイン
            </PrimaryButton>
            {/* <Link
              href={publicPaths.superResetPasswordVerifyEmail}
              underline="none"
              variant="caption_medium_ja"
            >
              パスワードを忘れた方はこちら
            </Link> */}
          </Stack>
        </Stack>
      </FormikProvider>
    </PublicLayout>
  );
}
