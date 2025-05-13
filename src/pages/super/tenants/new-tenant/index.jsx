import { toast } from 'react-toastify';
import { FormikProvider, useFormik } from 'formik';

import { APIS } from 'src/apis';
import { FormModal, FormInputText } from 'src/components';

import { validationSchema } from './validationSchema';

export function NewTenant({ open, handleClose, fetchTenants }) {
  const formik = useFormik({
    initialValues: { name: '', manager_name: '', manager_email: '', phone_number: '', address: '' },
    validationSchema: validationSchema,
    onSubmit: async (values, { setFieldError }) => {
      try {
        await APIS.newTenant(values);
        toast.success('テナントを新規登録しました。');
        await fetchTenants();
        handleClose();
      } catch (error) {
        if ([400].includes(error?.status)) {
          setFieldError('manager_email', error?.data?.message);
        }
      }
    },
  });

  return (
    <FormModal
      open={open}
      title="テナント新規登録"
      confirmText="保存"
      confirmDisabled={formik.isSubmitting || !(formik.isValid && formik.dirty)}
      handleClose={handleClose}
      handleConfirm={formik.handleSubmit}
    >
      <FormikProvider value={formik}>
        <FormInputText name="name" label="テナント名" placeholder="入力してください" />
        <FormInputText name="manager_name" label="担当者名前" placeholder="入力してください" />
        <FormInputText
          name="manager_email"
          label="担当者Eメール"
          placeholder="exsample@gmail.com"
        />
        <FormInputText name="phone_number" label="電話番号" placeholder="例）090-1234-5678" />
        <FormInputText name="address" label="住所" placeholder="入力してください" />
      </FormikProvider>
    </FormModal>
  );
}
