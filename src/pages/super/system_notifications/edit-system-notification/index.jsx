import { toast } from 'react-toastify';
import { FormikProvider, useFormik } from 'formik';

import { APIS } from 'src/apis';
import {
  FormModal,
  FormInputText,
  SwitchButton,
  FormSelectYmdhm,
  FormInputTextMuitiline,
} from 'src/components';

import { validationSchema } from './validationSchema';

export function EditSystemNotification({ row, open, handleClose, fetchSystemNotifications }) {
  const formik = useFormik({
    initialValues: {
      title: row?.title,
      content: row?.content,
      publication_start_at: row?.publication_start_at,
      publication_end_at: row?.publication_end_at || '',
      public_flag: `${row?.public_flag}`,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setFieldError }) => {
      try {
        await APIS.updateSystemNotification(row?.id, values);
        toast.success('システムお知らせを更新しました。');
        await fetchSystemNotifications();
        handleClose();
      } catch (error) {
        if ([400].includes(error?.status)) {
          setFieldError('title', error?.data?.message);
        }
      }
    },
  });

  console.log('errors', formik.errors);
  console.log('values', formik.values);

  return (
    <FormModal
      open={open}
      width={580}
      title="システムお知らせ編集"
      confirmText="保存"
      confirmDisabled={formik.isSubmitting || !(formik.isValid && formik.dirty) || !formik.dirty}
      handleClose={handleClose}
      handleConfirm={formik.handleSubmit}
    >
      <FormikProvider value={formik}>
        <FormInputText name="title" label="タイトル" placeholder="入力してください" />
        <FormInputTextMuitiline name="content" label="内容" placeholder="入力してください" />
        <FormSelectYmdhm name="publication_start_at" label="公開開始日時" />
        <FormSelectYmdhm name="publication_end_at" label="公開終了日時" />
        <SwitchButton
          name="public_flag"
          label="ステータス"
          options={[
            { value: '1', label: '公開' },
            { value: '0', label: '非公開' },
          ]}
        />
      </FormikProvider>
    </FormModal>
  );
}
