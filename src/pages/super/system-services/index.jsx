import { useEffect, useState } from 'react';
import { FormikProvider, useFormik } from 'formik';
import { Stack, Table, TableBody, TableContainer, Typography } from '@mui/material';

import { APIS } from 'src/apis';
import { MainLayout } from 'src/layouts';
import { normalizeString } from 'src/utils';
import { Export, NewAdd } from 'src/assets';
import { ActionButton, FilterSelect, NoData, SearchInputText } from 'src/components';

import { HeaderRow } from './table-header';
import { SystemServiceTableRow } from './table-row';
import { validationSchema } from './validationSchema';
import { NewSystemService } from './new-system-service';

export default function SystemServicePage() {
  const [systemServicesData, setSystemServicesData] = useState([]);
  const [filterSystemServicesData, setFilterSystemServicesData] = useState([]);
  const [openNewService, setOpenNewService] = useState(false);
  const formik = useFormik({
    initialValues: { service_name: '' },
    validationSchema: validationSchema,
  });

  const autoFilter = (data) => {
    let temp = [...data];
    if (formik.values?.service_name) {
      temp = temp.filter((item) =>
        normalizeString(item?.service_name)?.includes(normalizeString(formik.values?.service_name))
      );
    }
    return temp;
  };

  useEffect(() => {
    setFilterSystemServicesData(autoFilter(systemServicesData));
  }, [formik.values]);

  const fetchSystemServices = async () => {
    try {
      const res = await APIS.systemServices();
      setSystemServicesData(res?.data);
      setFilterSystemServicesData(autoFilter(res?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSystemServices();
  }, []);

  return (
    <FormikProvider value={formik}>
      <MainLayout pageTitle="システムサービス情報">
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
              name="service_name"
              label="サービス名"
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
          <ActionButton
            startIcon={<NewAdd sx={{ height: 16, width: 16 }} />}
            onClick={() => setOpenNewService(true)}
          >
            新規登録
          </ActionButton>
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
          {filterSystemServicesData?.map((row, index) => (
            <SystemServiceTableRow
              key={`${row?.service_id}&${row?.updated_at}`}
              row={row}
              isLastrow={index + 1 === filterSystemServicesData?.length}
              fetchSystemServices={fetchSystemServices}
            />
          ))}
          {filterSystemServicesData?.length === 0 && <NoData />}
        </Stack>
        {openNewService && (
          <NewSystemService
            open={openNewService}
            handleClose={() => setOpenNewService(false)}
            fetchSystemServices={fetchSystemServices}
          />
        )}
      </MainLayout>
    </FormikProvider>
  );
}
