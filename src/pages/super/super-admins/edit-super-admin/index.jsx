import { toast } from 'react-toastify';
import { FormikProvider, useFormik } from 'formik';

import { APIS } from 'src/apis';
import { FormModal, FormInputText } from 'src/components';

import { validationSchema } from './validationSchema';

export function EditSuperAdmin({ open, row, handleClose, fetchUsers }) {
  const formik = useFormik({
    initialValues: { name: row?.name, email: row?.email, phone_number: row?.phone_number },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await APIS.updateSuperAdmin(row?.id, values);
        toast.success('スーパーユーザーを更新しました。');
        await fetchUsers();
        handleClose();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <FormModal
      open={open}
      title="スーパーユーザー編集"
      confirmText="保存"
      confirmDisabled={formik.isSubmitting || !(formik.isValid && formik.dirty) || !formik.dirty}
      handleClose={handleClose}
      handleConfirm={formik.handleSubmit}
    >
      <FormikProvider value={formik}>
        <FormInputText name="name" label="名前" placeholder="入力してください" />
        <FormInputText
          name="email"
          label="Eメール"
          placeholder="exsample@gmail.com"
          disabled={true}
        />
        <FormInputText name="phone_number" label="電話番号" placeholder="例）090-1234-5678" />
      </FormikProvider>
    </FormModal>
  );
}
