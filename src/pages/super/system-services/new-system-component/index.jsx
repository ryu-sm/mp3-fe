import { toast } from 'react-toastify';
import { FormikProvider, useFormik } from 'formik';

import { APIS } from 'src/apis';
import { FormModal, FormInputText } from 'src/components';

import { validationSchema } from './validationSchema';

export function NewSystemComponent({ row, open, handleClose, fetchSystemServices }) {
  const formik = useFormik({
    initialValues: {
      service_id: row?.service_id,
      name: row?.service_name,
      component_name: '',
      url: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setFieldError }) => {
      try {
        await APIS.newSystemComponent({
          service_id: values.service_id,
          component_name: values.component_name,
          url: values.url,
        });
        toast.success('コンポーネントを新規登録しました。');
        await fetchSystemServices();
        handleClose();
      } catch (error) {
        console.log(error);
        if ([400].includes(error?.status)) {
          setFieldError('component_name', error?.data?.message);
        }
      }
    },
  });

  return (
    <FormModal
      open={open}
      title="コンポーネント新規登録"
      confirmText="保存"
      confirmDisabled={formik.isSubmitting || !(formik.isValid && formik.dirty)}
      handleClose={handleClose}
      handleConfirm={formik.handleSubmit}
    >
      <FormikProvider value={formik}>
        <FormInputText name="name" label="サービス名" placeholder="入力してください" disabled />
        <FormInputText
          name="component_name"
          label="コンポーネント名"
          placeholder="入力してください"
        />
        <FormInputText name="url" label="URL" placeholder="入力してください" />
      </FormikProvider>
    </FormModal>
  );
}
