import { yup } from 'src/libs';

export const validationSchema = yup.object({
  name: yup.string().required(),
  component_name: yup.string().required(),
  url: yup.string().required(),
});
