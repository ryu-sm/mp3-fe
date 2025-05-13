import { yup } from 'src/libs';

export const validationSchema = yup.object({
  tenant_name: yup.string(),
});
