import { toast } from 'react-toastify';
import { FormikProvider, useFormik } from 'formik';

import { APIS } from 'src/apis';
import { FormModal, FormInputText } from 'src/components';

import { validationSchema } from './validationSchema';

export function NewSystemService({ open, handleClose, fetchSystemServices }) {
  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: validationSchema,
    onSubmit: async (values, { setFieldError }) => {
      try {
        await APIS.newSystemService(values);
        toast.success('サービスを新規登録しました。');
        await fetchSystemServices();
        handleClose();
      } catch (error) {
        if ([400].includes(error?.status)) {
          setFieldError('name', error?.data?.message);
        }
      }
    },
  });

  return (
    <FormModal
      open={open}
      title="サービス新規登録"
      confirmText="保存"
      confirmDisabled={formik.isSubmitting || !(formik.isValid && formik.dirty)}
      handleClose={handleClose}
      handleConfirm={formik.handleSubmit}
    >
      <FormikProvider value={formik}>
        <FormInputText name="name" label="サービス名" placeholder="入力してください" />
      </FormikProvider>
    </FormModal>
  );
}
