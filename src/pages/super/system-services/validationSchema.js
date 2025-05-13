import { yup } from 'src/libs';

export const validationSchema = yup.object({
  service_name: yup.string(),
});
