import { toast } from 'react-toastify';
import { useMemo, useState } from 'react';

import { TableRow, Typography } from '@mui/material';

import { APIS } from 'src/apis';
import { Confirm, Warning } from 'src/assets';
import { ActionMenu, CustomTabelRowCell, DailogModal, Status } from 'src/components';

import { EditSuperAdmin } from './edit-super-admin';

export function SuperUserTableRow({ no, row, isLastrow, fetchUsers }) {
  const [openEditSuperUser, setOpenEditSuperUser] = useState(false);
  const [openDeleteSuperUser, setOpenDeleteSuperUser] = useState(false);
  const [openEnableSuperUser, setOpenEnableSuperUser] = useState(false);
  const [openSendSuperUserResetPassword, setOpenSendSuperUserResetPassword] = useState(false);

  const actionConfig = useMemo(() => {
    const temp = [{ label: '編集', handleClick: () => setOpenEditSuperUser(true) }];
    if (row?.deleted_flag === 0) {
      temp.push({ label: '削除', handleClick: () => setOpenDeleteSuperUser(true) });
    } else {
      temp.push({ label: '有効化', handleClick: () => setOpenEnableSuperUser(true) });
    }
    if (row?.verified_flag === 1) {
      temp.push({
        label: 'パスワードリセット',
        handleClick: () => setOpenSendSuperUserResetPassword(true),
      });
    }

    return temp;
  }, [row?.deleted_flag, row?.verified_flag]);

  const handleConfirmDelete = async () => {
    await APIS.deleteSuperAdmin(row?.id, row?.verified_flag === 1);
    toast.success(`スーパーユーザーを${row?.verified_flag === 0 ? '削除' : '理論削除'}しました。`);
    await fetchUsers();
    setOpenDeleteSuperUser(false);
  };

  const handleConfirmEnable = async () => {
    await APIS.enableSuperAdmin(row?.id);
    toast.success('スーパーユーザーを有効化しました。');
    await fetchUsers();
    setOpenEnableSuperUser(false);
  };

  const handleSendEmail = async () => {
    await APIS.sendSuperAdminResetPassword(row?.email);
    toast.success('スーパーユーザーにパスワードリセットメールを送信しました。');
    await fetchUsers();
    setOpenSendSuperUserResetPassword(false);
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
        width={200}
        minWidth={200}
        maxWidth={200}
        borderLeft={false}
        borderRight={true}
        isLastrow={isLastrow}
        align="start"
      >
        <Typography variant="caption_regular_ja">{row?.email}</Typography>
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
      {openEditSuperUser && (
        <EditSuperAdmin
          open={openEditSuperUser}
          row={row}
          handleClose={() => setOpenEditSuperUser(false)}
          fetchUsers={fetchUsers}
        />
      )}
      {openDeleteSuperUser && (
        <DailogModal
          open={openDeleteSuperUser}
          icon={<Warning sx={{ height: 60, width: 60 }} />}
          color="error"
          title="スーパーユーザー削除"
          content={`スーパーユーザー「${row?.name}」を${row?.verified_flag === 0 ? '削除' : '理論削除'}します。よろしいですか？`}
          confirmText="削除する"
          handleClose={() => setOpenDeleteSuperUser(false)}
          handleConfirm={handleConfirmDelete}
        />
      )}
      {openEnableSuperUser && (
        <DailogModal
          open={openEnableSuperUser}
          icon={<Confirm sx={{ height: 60, width: 60 }} />}
          title="スーパーユーザー有効化"
          content={`スーパーユーザー「${row?.name}」を有効化します。よろしいですか？`}
          confirmText="有効化する"
          handleClose={() => setOpenEnableSuperUser(false)}
          handleConfirm={handleConfirmEnable}
        />
      )}
      {openSendSuperUserResetPassword && (
        <DailogModal
          open={openSendSuperUserResetPassword}
          icon={<Confirm sx={{ height: 60, width: 60 }} />}
          title="パスワードリセット"
          content={`スーパーユーザー「${row?.name}」にパスワードリセットメールを送信します。よろしいですか？`}
          confirmText="送信する"
          handleClose={() => setOpenSendSuperUserResetPassword(false)}
          handleConfirm={handleSendEmail}
        />
      )}
    </TableRow>
  );
}
