import { REGEX, YUP_MESSAGES } from 'src/constant';
import { yup } from 'src/libs';

export const validationSchema = yup.object({
  name: yup.string().required(),
  manager_name: yup.string().required(),
  manager_email: yup.string().matches(REGEX.EMAIL, YUP_MESSAGES.EMAIL_ADE).required(),
  phone_number: yup.string().matches(REGEX.PHONE, YUP_MESSAGES.PHONE),
  address: yup.string(),
});
