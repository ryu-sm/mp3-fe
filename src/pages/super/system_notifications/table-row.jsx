import { toast } from 'react-toastify';
import { useMemo, useState } from 'react';

import { TableRow, Typography } from '@mui/material';

import { APIS } from 'src/apis';
import { Confirm, Warning } from 'src/assets';
import {
  ActionMenu,
  CustomTabelRowCell,
  DailogModal,
  PreviewContent,
  Status,
} from 'src/components';

import { EditSystemNotification } from './edit-system-notification';

export function SystemNotificationTableRow({ no, row, isLastrow, fetchSystemNotifications }) {
  const [openEditSystemNotification, setOpenEditSystemNotification] = useState(false);
  const [openDeleteSystemNotification, setOpenDeleteSystemNotification] = useState(false);
  const [openEnableSystemNotification, setOpenEnableSystemNotification] = useState(false);

  const actionConfig = useMemo(() => {
    const temp = [{ label: '編集', handleClick: () => setOpenEditSystemNotification(true) }];
    if (row?.deleted_flag === 0) {
      temp.push({ label: '削除', handleClick: () => setOpenDeleteSystemNotification(true) });
    } else {
      temp.push({ label: '有効化', handleClick: () => setOpenEnableSystemNotification(true) });
    }

    return temp;
  }, [row?.deleted_flag]);

  const handleConfirmDelete = async () => {
    await APIS.deleteSystemNotification(row?.id, row?.public_flag === 1);
    toast.success(`システムお知らを${row?.public_flag === 0 ? '削除' : '理論削除'}しました。`);
    await fetchSystemNotifications();
    setOpenDeleteSystemNotification(false);
  };

  const handleConfirmEnable = async () => {
    await APIS.enableSystemNotification(row?.id);
    toast.success('システムお知らを有効化しました。');
    await fetchSystemNotifications();
    setOpenEnableSystemNotification(false);
  };

  const options = [
    { value: '01', label: '公開' },
    { value: '02', label: '非公開' },
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
        width={1}
        style={{ position: 'sticky', left: 60, zIndex: 1000 }}
        borderLeft={false}
        borderRight={true}
        isLastrow={isLastrow}
        align="start"
      >
        {/* <Typography variant="caption_regular_ja">{row?.title}</Typography> */}
        <PreviewContent label="お知らせプレビュー" title={row?.title} content={row?.content} />
      </CustomTabelRowCell>
      <CustomTabelRowCell
        width={180}
        minWidth={180}
        maxWidth={180}
        borderLeft={false}
        borderRight={true}
        isLastrow={isLastrow}
        align="start"
      >
        <Typography variant="caption_regular_ja">{row?.publication_start_at}</Typography>
      </CustomTabelRowCell>
      <CustomTabelRowCell
        width={180}
        minWidth={180}
        maxWidth={180}
        borderLeft={false}
        borderRight={true}
        isLastrow={isLastrow}
        align="start"
      >
        <Typography variant="caption_regular_ja">{row?.publication_end_at || '--'}</Typography>
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
      {openEditSystemNotification && (
        <EditSystemNotification
          open={openEditSystemNotification}
          row={row}
          handleClose={() => setOpenEditSystemNotification(false)}
          fetchSystemNotifications={fetchSystemNotifications}
        />
      )}
      {openDeleteSystemNotification && (
        <DailogModal
          open={openDeleteSystemNotification}
          icon={<Warning sx={{ height: 60, width: 60 }} />}
          color="error"
          title="システムお知ら削除"
          content={`システムお知ら「${row?.title}」を${row?.public_flag === 0 ? '削除' : '理論削除'}します。よろしいですか？`}
          confirmText="削除する"
          handleClose={() => setOpenDeleteSystemNotification(false)}
          handleConfirm={handleConfirmDelete}
        />
      )}
      {openEnableSystemNotification && (
        <DailogModal
          open={openEnableSystemNotification}
          icon={<Confirm sx={{ height: 60, width: 60 }} />}
          title="システムお知ら有効化"
          content={`システムお知ら「${row?.title}」を有効化します。よろしいですか？`}
          confirmText="有効化する"
          handleClose={() => setOpenEnableSystemNotification(false)}
          handleConfirm={handleConfirmEnable}
        />
      )}
    </TableRow>
  );
}
