import { REGEX } from 'src/constant';
import { yup } from 'src/libs';

export const validationSchema = yup.object({
  title: yup.string().required(),
  content: yup.string().required(),
  publication_start_at: yup
    .string()
    .matches(REGEX.YMDHMS, '有効な公開開始日時を入力してください。')
    .required(),
  publication_end_at: yup.string().matches(REGEX.YMDHMS, '有効な公開終了日時を入力してください。'),
  public_flag: yup.string(),
});
