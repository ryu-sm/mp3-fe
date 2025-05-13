import { toast } from 'react-toastify';
import { useMemo, useState } from 'react';
import { ButtonBase, Stack, Typography } from '@mui/material';

import { APIS } from 'src/apis';
import { formatInt } from 'src/utils';
import { Confirm, Delete, DownClose, Edit, RightOpen, PlusNew, Warning } from 'src/assets';
import { ActionMenu, CustomStackTabelRowCell, DailogModal, Status } from 'src/components';

import { EditSystemService } from './edit-system-service';
import { NewSystemComponent } from './new-system-component';
import { EditSystemComponent } from './edit-system-component';

export function SystemServiceTableRow({ row, isLastrow, fetchSystemServices }) {
  const [openEditService, setOpenEditService] = useState(false);
  const [openDeleteService, setOpenDeleteService] = useState(false);
  const [openComponent, setOpenComponent] = useState(false);
  const [openNewComponent, setOpenNewComponent] = useState(false);

  const handleClickComponentDetail = () => {
    setOpenComponent(!openComponent);
  };

  const handleConfirmDelete = async () => {
    await APIS.deleteSystemService(row?.service_id);
    toast.success('サービスを削除しました。');
    await fetchSystemServices();
    setOpenDeleteService(false);
  };

  return (
    <Stack
      direction="row"
      sx={{
        width: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <CustomStackTabelRowCell
        height={openComponent ? 48 * row?.components?.length : 48}
        width={220}
        minWidth={220}
        maxWidth={220}
        style={{ position: 'sticky', left: 0, zIndex: 1000 }}
        borderLeft={false}
        borderRight={true}
        isLastrow={isLastrow}
        align="start"
      >
        <Stack
          direction="row"
          sx={{
            width: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="caption_regular_ja">{row?.service_name}</Typography>
          <Stack
            direction="row"
            spacing={4}
            sx={{
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <ButtonBase sx={{ borderRadius: 2 }} onClick={() => setOpenEditService(true)}>
              <Edit sx={{ height: 20, width: 20 }} />
            </ButtonBase>

            <ButtonBase
              sx={{ borderRadius: 2, opacity: row?.components?.length === 0 ? 0.5 : 1 }}
              onClick={() => setOpenDeleteService(true)}
              disabled={row?.components?.length > 0}
            >
              <Delete sx={{ height: 20, width: 20, cursor: 'pointer' }} />
            </ButtonBase>
          </Stack>
        </Stack>
      </CustomStackTabelRowCell>
      <CustomStackTabelRowCell
        height={openComponent ? 48 * row?.components?.length : 48}
        width={180}
        minWidth={180}
        maxWidth={180}
        style={{ position: 'sticky', left: 220, zIndex: 1000 }}
        borderLeft={false}
        borderRight={true}
        isLastrow={isLastrow}
        align="start"
      >
        <Stack
          direction="row"
          sx={{
            width: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="caption_regular_ja">{formatInt(row?.count, '件')}</Typography>
          <Stack
            direction="row"
            spacing={4}
            sx={{
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <ButtonBase sx={{ borderRadius: 2 }} onClick={() => setOpenNewComponent(true)}>
              <PlusNew sx={{ height: 20, width: 20 }} />
            </ButtonBase>

            <ButtonBase
              sx={{ borderRadius: 2 }}
              onClick={handleClickComponentDetail}
              disabled={row?.components?.length === 0}
            >
              {openComponent ? (
                <DownClose sx={{ height: 20, width: 20, cursor: 'pointer' }} />
              ) : (
                <RightOpen
                  sx={{
                    height: 20,
                    width: 20,
                    cursor: 'pointer',
                  }}
                  disabled={row?.components?.length === 0}
                />
              )}
            </ButtonBase>
          </Stack>
        </Stack>
      </CustomStackTabelRowCell>

      {row?.components?.length > 0 && openComponent && (
        <Stack
          direction="column"
          sx={{
            width: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          {row?.components?.map((component, index) => (
            <ComponentDetailRow
              key={`${component?.component_id}&${component?.updated_at}`}
              row={row}
              component={component}
              isLastrow={isLastrow && index + 1 === row?.components?.length}
              fetchSystemServices={fetchSystemServices}
            />
          ))}
        </Stack>
      )}
      {!openComponent && <ComponentDetailClose isLastrow={isLastrow} />}

      {openNewComponent && (
        <NewSystemComponent
          row={row}
          open={openNewComponent}
          handleClose={() => setOpenNewComponent(false)}
          fetchSystemServices={fetchSystemServices}
        />
      )}

      {openEditService && (
        <EditSystemService
          row={row}
          open={openEditService}
          handleClose={() => setOpenEditService(false)}
          fetchSystemServices={fetchSystemServices}
        />
      )}
      {openDeleteService && (
        <DailogModal
          open={openDeleteService}
          icon={<Warning sx={{ height: 60, width: 60 }} />}
          color="error"
          title="サービス削除"
          content={`サービス「${row?.service_name}」を削除します。よろしいですか？`}
          confirmText="削除する"
          handleClose={() => setOpenDeleteService(false)}
          handleConfirm={handleConfirmDelete}
        />
      )}
    </Stack>
  );
}

function ComponentDetailClose({ isLastrow }) {
  return (
    <>
      <CustomStackTabelRowCell
        width={180}
        minWidth={180}
        maxWidth={180}
        borderLeft={false}
        borderRight={true}
        isLastrow={isLastrow}
        align="start"
      >
        <Typography
          variant="caption_regular_ja"
          sx={{ color: (theme) => theme.palette.text.disabled }}
        >{`--`}</Typography>
      </CustomStackTabelRowCell>
      <CustomStackTabelRowCell
        width={1}
        borderLeft={false}
        borderRight={true}
        isLastrow={isLastrow}
        align="start"
      >
        <Typography
          variant="caption_regular_ja"
          sx={{ color: (theme) => theme.palette.text.disabled }}
        >{`--`}</Typography>
      </CustomStackTabelRowCell>
      <CustomStackTabelRowCell
        width={120}
        minWidth={120}
        maxWidth={120}
        borderLeft={false}
        borderRight={false}
        isLastrow={isLastrow}
        align="center"
      >
        <Typography
          variant="caption_regular_ja"
          sx={{ color: (theme) => theme.palette.text.disabled }}
        >{`--`}</Typography>
      </CustomStackTabelRowCell>
      <CustomStackTabelRowCell
        width={60}
        minWidth={60}
        maxWidth={60}
        style={{ position: 'sticky', right: 0, zIndex: 1000 }}
        borderLeft={true}
        borderRight={false}
        isLastrow={isLastrow}
        align="center"
      >
        <Typography
          variant="caption_regular_ja"
          sx={{ color: (theme) => theme.palette.text.disabled }}
        >{`--`}</Typography>
      </CustomStackTabelRowCell>
    </>
  );
}

function ComponentDetailRow({ row, component, isLastrow, fetchSystemServices }) {
  const [openEditComponent, setOpenEditComponent] = useState(false);
  const [openDeleteComponent, setOpenDeleteComponent] = useState(false);
  const [openEnableComponent, setOpenEnableComponent] = useState(false);

  const actionConfig = useMemo(() => {
    const temp = [{ label: '編集', handleClick: () => setOpenEditComponent(true) }];
    if (component?.deleted_flag === 0) {
      temp.push({ label: '削除', handleClick: () => setOpenDeleteComponent(true) });
    } else {
      temp.push({ label: '有効化', handleClick: () => setOpenEnableComponent(true) });
    }

    return temp;
  }, [component?.deleted_flag]);

  const handleConfirmDelete = async () => {
    await APIS.deleteSystemComponent(component?.component_id, component?.used_flag === 1);
    toast.success(`コンポーネントを${component?.used_flag === 0 ? '削除' : '理論削除'}しました。`);
    await fetchSystemServices();
    setOpenDeleteComponent(false);
  };

  const handleConfirmEnable = async () => {
    await APIS.enableSystemComponent(component?.component_id);
    toast.success('コンポーネントを有効化しました。');
    await fetchSystemServices();
    setOpenEnableComponent(false);
  };
  const options = [
    { value: '01', label: '使用中' },
    { value: '02', label: '未使用' },
    { value: '09', label: '削除済' },
  ];
  return (
    <Stack
      direction="row"
      sx={{
        width: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <CustomStackTabelRowCell
        width={180}
        minWidth={180}
        maxWidth={180}
        borderLeft={false}
        borderRight={true}
        isLastrow={isLastrow}
        align="start"
      >
        <Typography variant="caption_regular_ja">{component?.component_name}</Typography>
      </CustomStackTabelRowCell>
      <CustomStackTabelRowCell
        width={1}
        borderLeft={false}
        borderRight={true}
        isLastrow={isLastrow}
        align="start"
      >
        <Typography variant="caption_regular_ja">{component?.url}</Typography>
      </CustomStackTabelRowCell>
      <CustomStackTabelRowCell
        width={120}
        minWidth={120}
        maxWidth={120}
        borderLeft={false}
        borderRight={false}
        isLastrow={isLastrow}
        align="center"
      >
        <Status
          label={options.find((item) => item?.value === component?.status)?.label}
          isDisable={component?.status !== '01'}
        />
      </CustomStackTabelRowCell>
      <CustomStackTabelRowCell
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
      </CustomStackTabelRowCell>
      {openEditComponent && (
        <EditSystemComponent
          open={openEditComponent}
          row={row}
          component={component}
          handleClose={() => setOpenEditComponent(false)}
          fetchSystemServices={fetchSystemServices}
        />
      )}
      {openDeleteComponent && (
        <DailogModal
          open={openDeleteComponent}
          icon={<Warning sx={{ height: 60, width: 60 }} />}
          color="error"
          title="コンポーネント削除"
          content={`コンポーネント「${component?.component_name}」を${component?.used_flag === 0 ? '削除' : '理論削除'}します。よろしいですか？`}
          confirmText="削除する"
          handleClose={() => setOpenDeleteComponent(false)}
          handleConfirm={handleConfirmDelete}
        />
      )}
      {openEnableComponent && (
        <DailogModal
          open={openEnableComponent}
          icon={<Confirm sx={{ height: 60, width: 60 }} />}
          title="コンポーネント有効化"
          content={`コンポーネント「${component?.component_name}」を有効化します。よろしいですか？`}
          confirmText="有効化する"
          handleClose={() => setOpenEnableComponent(false)}
          handleConfirm={handleConfirmEnable}
        />
      )}
    </Stack>
  );
}
