import { toast } from 'react-toastify';
import { FormikProvider, useFormik } from 'formik';

import { APIS } from 'src/apis';
import { FormModal, FormInputText } from 'src/components';

import { validationSchema } from './validationSchema';

export function EditTenant({ open, row, handleClose, fetchTenants }) {
  const formik = useFormik({
    initialValues: {
      name: row?.name,
      manager_name: row?.manager_name,
      manager_email: row?.manager_email,
      phone_number: row?.phone_number,
      address: row?.address,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await APIS.updateTenant(row?.id, values);
        toast.success('テナントを更新しました。');
        await fetchTenants();
        handleClose();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <FormModal
      open={open}
      title="テナント編集"
      confirmText="保存"
      confirmDisabled={formik.isSubmitting || !(formik.isValid && formik.dirty) || !formik.dirty}
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
          disabled={true}
        />
        <FormInputText name="phone_number" label="電話番号" placeholder="例）090-1234-5678" />
        <FormInputText name="address" label="住所" placeholder="入力してください" />
      </FormikProvider>
    </FormModal>
  );
}
