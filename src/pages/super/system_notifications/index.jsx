import { useEffect, useState } from 'react';
import { FormikProvider, useFormik } from 'formik';
import { Stack, Table, TableBody, TableContainer, Typography } from '@mui/material';

import { APIS } from 'src/apis';
import { MainLayout } from 'src/layouts';
import { normalizeString } from 'src/utils';
import { Export, NewAdd } from 'src/assets';
import {
  ActionButton,
  FilterSelect,
  FilterSelectYmd,
  NoData,
  SearchInputText,
} from 'src/components';

import { NewSystemNotification } from './new-system-notification';
import { HeaderRow } from './table-header';
import { SystemNotificationTableRow } from './table-row';
import { validationSchema } from './validationSchema';

export default function SystemNotificationsPage() {
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');
  const [systemNotificationsData, setSystemNotificationsData] = useState([]);
  const [filterSystemNotificationsData, setFilterSystemNotificationsData] = useState([]);
  const [openNewSystemNotification, setOpenNewSystemNotification] = useState(false);
  const formik = useFormik({
    initialValues: { title: '', publication_start_at: '', publication_end_at: '', status: '' },
    validationSchema: validationSchema,
  });

  const autoFilter = (data) => {
    let temp = [...data];
    if (formik.values?.title) {
      temp = temp.filter((item) =>
        normalizeString(item?.title)?.includes(normalizeString(formik.values?.title))
      );
    }
    if (formik.values?.publication_start_at) {
      temp = temp.filter((item) =>
        normalizeString(item?.publication_start_at)?.includes(
          normalizeString(formik.values?.publication_start_at)
        )
      );
    }
    if (formik.values?.publication_end_at) {
      temp = temp.filter((item) =>
        normalizeString(item?.publication_end_at)?.includes(
          normalizeString(formik.values?.publication_end_at)
        )
      );
    }
    if (formik.values?.status) {
      temp = temp.filter((item) =>
        normalizeString(item?.status)?.includes(normalizeString(formik.values?.status))
      );
    }
    return temp;
  };

  const handleSort = (field) => {
    if (field === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  useEffect(() => {
    const sortedData = [...filterSystemNotificationsData].sort((a, b) => {
      const valueA = a[sortBy];
      const valueB = b[sortBy];

      if (sortOrder === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
    setFilterSystemNotificationsData(sortedData);
  }, [sortBy, sortOrder]);

  useEffect(() => {
    setFilterSystemNotificationsData(autoFilter(systemNotificationsData));
  }, [formik.values]);

  const fetchSystemNotifications = async () => {
    try {
      const res = await APIS.systemNotifications();
      setSystemNotificationsData(res?.data);
      setFilterSystemNotificationsData(autoFilter(res?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSystemNotifications();
  }, []);

  return (
    <FormikProvider value={formik}>
      <MainLayout pageTitle="システムお知らせ情報">
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
            <SearchInputText name="title" label="タイトル" placeholder="入力してください" />
            <FilterSelectYmd name="publication_start_at" label="公開開始日" />
            <FilterSelectYmd name="publication_end_at" label="公開終了日" />
            <FilterSelect
              name="status"
              label="ステータス"
              placeholder="選択してください"
              options={[
                { value: '01', label: '公開' },
                { value: '02', label: '非公開' },
                { value: '09', label: '削除済' },
              ]}
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
            onClick={() => setOpenNewSystemNotification(true)}
          >
            新規登録
          </ActionButton>
        </Stack>

        <TableContainer
          component="div"
          sx={{
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
          <Table stickyHeader size="small">
            <HeaderRow sortBy={sortBy} sortOrder={sortOrder} handleSort={handleSort} />
            <TableBody>
              {filterSystemNotificationsData.map((row, index) => (
                <SystemNotificationTableRow
                  key={`${row?.id}&${row?.updated_at}`}
                  no={index + 1}
                  row={row}
                  isLastrow={index + 1 === filterSystemNotificationsData?.length}
                  fetchSystemNotifications={fetchSystemNotifications}
                />
              ))}
            </TableBody>
          </Table>
          {filterSystemNotificationsData?.length === 0 && <NoData />}
        </TableContainer>

        {openNewSystemNotification && (
          <NewSystemNotification
            open={openNewSystemNotification}
            handleClose={() => setOpenNewSystemNotification(false)}
            fetchSystemNotifications={fetchSystemNotifications}
          />
        )}
      </MainLayout>
    </FormikProvider>
  );
}
