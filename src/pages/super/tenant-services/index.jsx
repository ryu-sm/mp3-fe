import { useEffect, useState } from 'react';
import { FormikProvider, useFormik } from 'formik';
import { Stack, Typography } from '@mui/material';

import { APIS } from 'src/apis';
import { MainLayout } from 'src/layouts';
import { normalizeString } from 'src/utils';
import { Export } from 'src/assets';
import { ActionButton, NoData, SearchInputText } from 'src/components';

import { HeaderRow } from './table-header';
import { TenantServiceTableRow } from './table-row';
import { validationSchema } from './validationSchema';

export default function TenantServicePage() {
  const [tenantServicesData, setTenantServicesData] = useState([]);
  const [filterTenantServicesData, setFilterTenantServicesData] = useState([]);

  const formik = useFormik({
    initialValues: { tenant_name: '' },
    validationSchema: validationSchema,
  });

  const autoFilter = (data) => {
    let temp = [...data];
    if (formik.values?.tenant_name) {
      temp = temp.filter((item) =>
        normalizeString(item?.tenant_name)?.includes(normalizeString(formik.values?.tenant_name))
      );
    }
    return temp;
  };

  useEffect(() => {
    setFilterTenantServicesData(autoFilter(tenantServicesData));
  }, [formik.values]);

  const fetchTenantServices = async () => {
    try {
      const res = await APIS.tenantServices();
      setTenantServicesData(res?.data);
      setFilterTenantServicesData(autoFilter(res?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTenantServices();
  }, []);

  return (
    <FormikProvider value={formik}>
      <MainLayout pageTitle="テナントサービス情報">
        <Stack
          direction="column"
          sx={{
            width: 1,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}
        >
          <Typography variant="body_regular_ja">検索条件</Typography>
          <Stack
            direction="row"
            spacing="20px"
            sx={{
              height: 86,
              width: 1,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <SearchInputText
              name="tenant_name"
              label="テナント名"
              placeholder="入力してください"
              width={320}
            />
          </Stack>
        </Stack>

        <Stack
          direction="row"
          spacing={2}
          sx={{
            height: 52,
            minHeight: 52,
            width: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <ActionButton startIcon={<Export sx={{ height: 16, width: 16 }} />}>CSV出力</ActionButton>
        </Stack>

        <Stack
          component="div"
          sx={{
            width: 1,
            overflow: 'overlay',
            scrollbarGutter: 'stable overlay',
            borderRadius: '8px',
            border: (theme) => `1px solid ${theme.palette.border.one}`,
            maxHeight: `calc(100dvh - 190px)`,
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: (theme) =>
                `linear-gradient(to bottom, ${theme.palette.primary.light} 0%, ${theme.palette.primary.light} 50%, white 50%, white 100%)`,
              borderTopRightRadius: '8px',
              borderBottomRightRadius: '8px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#CCC',
              borderRadius: '3px',
            },
          }}
        >
          <HeaderRow />
          {filterTenantServicesData?.map((row, index) => (
            <TenantServiceTableRow
              key={`${row?.tenant_id}&${row?.updated_at}`}
              row={row}
              isLastrow={index + 1 === filterTenantServicesData?.length}
              fetchTenantServices={fetchTenantServices}
            />
          ))}
          {filterTenantServicesData?.length === 0 && <NoData />}
        </Stack>
      </MainLayout>
    </FormikProvider>
  );
}
