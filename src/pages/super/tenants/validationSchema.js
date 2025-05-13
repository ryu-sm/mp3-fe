import { yup } from 'src/libs';

export const validationSchema = yup.object({
  name: yup.string(),
  email: yup.string(),
  phone_number: yup.string(),
  status: yup.string(),
});
