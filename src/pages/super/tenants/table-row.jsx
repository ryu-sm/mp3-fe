import { toast } from 'react-toastify';
import { useMemo, useState } from 'react';

import { TableRow, Typography } from '@mui/material';

import { APIS } from 'src/apis';
import { Confirm, Warning } from 'src/assets';
import { ActionMenu, CustomTabelRowCell, DailogModal, Status } from 'src/components';

import { EditTenant } from './edit-tenant';

export function TenantTableRow({ no, row, isLastrow, fetchTenants }) {
  const [openEditTenant, setOpenEditTenant] = useState(false);
  const [openDeleteTenant, setOpenDeleteTenant] = useState(false);
  const [openEnableTenant, setOpenEnableTenant] = useState(false);
  const [openVerifyTenant, setOpenVerifyTenant] = useState(false);
  const actionConfig = useMemo(() => {
    const temp = [{ label: '編集', handleClick: () => setOpenEditTenant(true) }];
    if (row?.deleted_flag === 0) {
      temp.push({ label: '削除', handleClick: () => setOpenDeleteTenant(true) });
    } else {
      temp.push({ label: '有効化', handleClick: () => setOpenEnableTenant(true) });
    }

    if (row?.verified_flag === 0) {
      temp.push({ label: '認証メール送信', handleClick: () => setOpenVerifyTenant(true) });
    }

    return temp;
  }, [row?.deleted_flag, row?.verified_flag]);

  const handleConfirmDelete = async () => {
    await APIS.deleteTenant(row?.id, row?.verified_flag === 1);
    toast.success(`テナントを${row?.verified_flag === 0 ? '削除' : '理論削除'}しました。`);
    await fetchTenants();
    setOpenDeleteTenant(false);
  };

  const handleConfirmEnable = async () => {
    await APIS.enableTenant(row?.id);
    toast.success('テナントを有効化しました。');
    await fetchTenants();
    setOpenEnableTenant(false);
  };

  const options = [
    { value: '01', label: '認証済' },
    { value: '02', label: '認証未済' },
    { value: '09', label: '削除済' },
  ];

  return (
    <TableRow>
      <CustomTabelRowCell
        width={60}
        minWidth={60}
        maxWidth={60}
        style={{ position: 'sticky', left: 0, zIndex: 1000 }}
        borderLeft={false}
        borderRight={true}
        isLastrow={isLastrow}
        align="start"
      >
        <Typography variant="caption_regular_ja">{no}</Typography>
      </CustomTabelRowCell>
      <CustomTabelRowCell
        width={180}
        minWidth={180}
        maxWidth={180}
        style={{ position: 'sticky', left: 60, zIndex: 1000 }}
        borderLeft={false}
        borderRight={true}
        isLastrow={isLastrow}
        align="start"
      >
        <Typography variant="caption_regular_ja">{row?.name}</Typography>
      </CustomTabelRowCell>
      <CustomTabelRowCell
        width={160}
        minWidth={160}
        maxWidth={160}
        borderLeft={false}
        borderRight={true}
        isLastrow={isLastrow}
        align="start"
      >
        <Typography variant="caption_regular_ja">{row?.manager_name}</Typography>
      </CustomTabelRowCell>
      <CustomTabelRowCell
        width={200}
        minWidth={200}
        maxWidth={200}
        borderLeft={false}
        borderRight={true}
        isLastrow={isLastrow}
        align="start"
      >
        <Typography variant="caption_regular_ja">{row?.manager_email}</Typography>
      </CustomTabelRowCell>
      <CustomTabelRowCell
        width={160}
        minWidth={160}
        maxWidth={160}
        borderLeft={false}
        borderRight={true}
        isLastrow={isLastrow}
        align="start"
      >
        <Typography variant="caption_regular_ja">{row?.phone_number}</Typography>
      </CustomTabelRowCell>
      <CustomTabelRowCell
        width={1}
        minWidth={200}
        borderLeft={false}
        borderRight={true}
        isLastrow={isLastrow}
        align="start"
      >
        <Typography variant="caption_regular_ja">{row?.address}</Typography>
      </CustomTabelRowCell>
      <CustomTabelRowCell
        width={120}
        minWidth={120}
        maxWidth={120}
        borderLeft={false}
        borderRight={false}
        isLastrow={isLastrow}
        align="center"
      >
        <Status
          label={options.find((item) => item?.value === row?.status)?.label}
          isDisable={row?.status !== '01'}
        />
      </CustomTabelRowCell>
      <CustomTabelRowCell
        width={60}
        minWidth={60}
        maxWidth={60}
        style={{ position: 'sticky', right: 0, zIndex: 1000 }}
        borderLeft={true}
        borderRight={false}
        isLastrow={isLastrow}
        align="center"
      >
        <ActionMenu actionConfig={actionConfig} />
      </CustomTabelRowCell>
      {openEditTenant && (
        <EditTenant
          open={openEditTenant}
          row={row}
          handleClose={() => setOpenEditTenant(false)}
          fetchTenants={fetchTenants}
        />
      )}
      {openDeleteTenant && (
        <DailogModal
          open={openDeleteTenant}
          icon={<Warning sx={{ height: 60, width: 60 }} />}
          color="error"
          title="テナント削除"
          content={`テナント「${row?.name}」を${row?.verified_flag === 0 ? '削除' : '理論削除'}します。よろしいですか？`}
          confirmText="削除する"
          handleClose={() => setOpenDeleteTenant(false)}
          handleConfirm={handleConfirmDelete}
        />
      )}
      {openEnableTenant && (
        <DailogModal
          open={openEnableTenant}
          icon={<Confirm sx={{ height: 60, width: 60 }} />}
          title="テナント有効化"
          content={`テナント「${row?.name}」を有効化します。よろしいですか？`}
          confirmText="有効化する"
          handleClose={() => setOpenEnableTenant(false)}
          handleConfirm={handleConfirmEnable}
        />
      )}
      {openVerifyTenant && (
        <DailogModal
          open={openVerifyTenant}
          icon={<Confirm sx={{ height: 60, width: 60 }} />}
          title="認証メール送信"
          content={`テナント「${row?.name}」に認証メールを送信します。よろしいですか？`}
          confirmText="送信する"
          handleClose={() => setOpenVerifyTenant(false)}
          handleConfirm={() => setOpenVerifyTenant(false)}
        />
      )}
    </TableRow>
  );
}
