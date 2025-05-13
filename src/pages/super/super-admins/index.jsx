import { useEffect, useState } from 'react';
import { FormikProvider, useFormik } from 'formik';
import { Stack, Table, TableBody, TableContainer, Typography } from '@mui/material';

import { APIS } from 'src/apis';
import { MainLayout } from 'src/layouts';
import { normalizeString } from 'src/utils';
import { Export, NewAdd } from 'src/assets';
import { ActionButton, FilterSelect, NoData, SearchInputText } from 'src/components';

import { HeaderRow } from './table-header';
import { SuperUserTableRow } from './table-row';
import { NewSuperAdmin } from './new-super-admin';
import { validationSchema } from './validationSchema';

export default function SuperAdminsPage() {
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');
  const [usersData, setUsersData] = useState([]);
  const [filterUsersData, setFilterUsersData] = useState([]);
  const [openNewUser, setOpenNewUser] = useState(false);
  const formik = useFormik({
    initialValues: { name: '', email: '', phone_number: '', status: '' },
    validationSchema: validationSchema,
  });

  const autoFilter = (data) => {
    let temp = [...data];
    if (formik.values?.name) {
      temp = temp.filter((item) =>
        normalizeString(item?.name)?.includes(normalizeString(formik.values?.name))
      );
    }
    if (formik.values?.email) {
      temp = temp.filter((item) =>
        normalizeString(item?.email)?.includes(normalizeString(formik.values?.email))
      );
    }
    if (formik.values?.phone_number) {
      temp = temp.filter((item) =>
        normalizeString(item?.phone_number)?.includes(normalizeString(formik.values?.phone_number))
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
    const sortedData = [...filterUsersData].sort((a, b) => {
      const valueA = a[sortBy];
      const valueB = b[sortBy];

      if (sortOrder === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
    setFilterUsersData(sortedData);
  }, [sortBy, sortOrder]);

  useEffect(() => {
    setFilterUsersData(autoFilter(usersData));
  }, [formik.values]);

  const fetchUsers = async () => {
    try {
      const res = await APIS.superAdmins();
      setUsersData(res?.data);
      setFilterUsersData(autoFilter(res?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <FormikProvider value={formik}>
      <MainLayout pageTitle="スーパーユーザー情報">
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
            <SearchInputText name="name" label="名前" placeholder="入力してください" />
            <SearchInputText name="email" label="Eメール" placeholder="exsample@gmail.com" />
            <SearchInputText name="phone_number" label="電話番号" placeholder="例）090-1234-5678" />
            <FilterSelect
              name="status"
              label="ステータス"
              placeholder="選択してください"
              options={[
                { value: '01', label: '認証済' },
                { value: '02', label: '認証未済' },
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
            onClick={() => setOpenNewUser(true)}
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
              {filterUsersData.map((row, index) => (
                <SuperUserTableRow
                  key={`${row?.id}&${row?.updated_at}`}
                  no={index + 1}
                  row={row}
                  isLastrow={index + 1 === filterUsersData?.length}
                  fetchUsers={fetchUsers}
                />
              ))}
            </TableBody>
          </Table>
          {filterUsersData?.length === 0 && <NoData />}
        </TableContainer>

        {openNewUser && (
          <NewSuperAdmin
            open={openNewUser}
            handleClose={() => setOpenNewUser(false)}
            fetchUsers={fetchUsers}
          />
        )}
      </MainLayout>
    </FormikProvider>
  );
}
