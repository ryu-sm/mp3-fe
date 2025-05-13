import { REGEX, YUP_MESSAGES } from 'src/constant';
import { yup } from 'src/libs';

export const validationSchema = yup.object({
  name: yup.string(),
  email: yup.string(),
  phone_number: yup.string().matches(REGEX.PHONE, YUP_MESSAGES.PHONE),
  status: yup.string(),
});
