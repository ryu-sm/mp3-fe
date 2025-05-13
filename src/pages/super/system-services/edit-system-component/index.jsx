import { toast } from 'react-toastify';
import { FormikProvider, useFormik } from 'formik';

import { APIS } from 'src/apis';
import { FormModal, FormInputText } from 'src/components';

import { validationSchema } from './validationSchema';

export function EditSystemComponent({ row, component, open, handleClose, fetchSystemServices }) {
  const formik = useFormik({
    initialValues: {
      name: row?.service_name,
      component_name: component?.component_name,
      url: component?.url,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setFieldError }) => {
      try {
        await APIS.updateSystemComponent(component?.component_id, {
          service_id: row?.service_id,
          component_name: values.component_name,
          url: values.url,
        });
        toast.success('コンポーネントを更新しました。');
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
      title="コンポーネント編集"
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
