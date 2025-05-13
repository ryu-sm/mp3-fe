import { REGEX, YUP_MESSAGES } from 'src/constant';
import { yup } from 'src/libs';

export const validationSchema = yup.object({
  password: yup
    .string()
    .required()
    .min(8, YUP_MESSAGES.PASSWORD_MIN)
    .max(20, YUP_MESSAGES.PASSWORD_MAX)
    .matches(REGEX.PASSWORD, YUP_MESSAGES.PASSWORD_MATCHES)
    .label('パスワード'),
  confirm_password: yup
    .string()
    .when('password', (password, field) =>
      password
        ? field.required().oneOf([yup.ref('password')], YUP_MESSAGES.PASSWORD_CONFIRM)
        : field
    )
    .label('新しいパスワード（確認用）'),
});
