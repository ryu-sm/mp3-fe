import { toast } from 'react-toastify';
import { FormikProvider, useFormik } from 'formik';

import { APIS } from 'src/apis';
import { FormModal, FormInputText } from 'src/components';

import { validationSchema } from './validationSchema';

export function NewSuperAdmin({ open, handleClose, fetchUsers }) {
  const formik = useFormik({
    initialValues: { name: '', email: '', phone_number: '' },
    validationSchema: validationSchema,
    onSubmit: async (values, { setFieldError }) => {
      try {
        await APIS.newSuperAdmin(values);
        toast.success('スーパーユーザーを新規登録しました。');
        await fetchUsers();
        handleClose();
      } catch (error) {
        if ([400].includes(error?.status)) {
          setFieldError('email', error?.data?.message);
        }
      }
    },
  });

  return (
    <FormModal
      open={open}
      title="スーパーユーザー新規登録"
      confirmText="保存"
      confirmDisabled={formik.isSubmitting || !(formik.isValid && formik.dirty)}
      handleClose={handleClose}
      handleConfirm={formik.handleSubmit}
    >
      <FormikProvider value={formik}>
        <FormInputText name="name" label="名前" placeholder="入力してください" />
        <FormInputText name="email" label="Eメール" placeholder="exsample@gmail.com" />
        <FormInputText name="phone_number" label="電話番号" placeholder="例）090-1234-5678" />
      </FormikProvider>
    </FormModal>
  );
}
