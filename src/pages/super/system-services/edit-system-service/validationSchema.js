import { yup } from 'src/libs';

export const validationSchema = yup.object({
  name: yup.string().required(),
});
