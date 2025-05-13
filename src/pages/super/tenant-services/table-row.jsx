import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { FormikProvider, useFormik } from 'formik';
import { IconButton, Stack, Typography } from '@mui/material';

import { APIS } from 'src/apis';
import { formatInt } from 'src/utils';
import { Confirm, DownClose, Edit, RightOpen, EditClose, EditSave } from 'src/assets';
import { BasicCheckbox, CustomStackTabelRowCell, DailogModal } from 'src/components';

export function TenantServiceTableRow({ row, isLastrow, fetchTenantServices }) {
  const [changeData, setChangData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [openUpdateConfirm, setOpenUpdateConfirm] = useState(false);
  const [openComponentNumber, setOpenComponentNumber] = useState(0);

  const onChangeOpenComponentNumber = (number) => {
    setOpenComponentNumber(openComponentNumber + number);
  };
  const handleConfirmUpdate = async () => {
    await APIS.updateTenantServices(row?.tenant_id, { changes: changeData });
    toast.success(`テナント「${row?.tenant_name}」の利用サービスを更新しました。`);
    await fetchTenantServices();
    setOpenUpdateConfirm(false);
    setIsEdit(false);
    setChangData([]);
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
        height={row?.services?.length * 48 + openComponentNumber * 48}
        width={280}
        minWidth={280}
        maxWidth={280}
        style={{ position: 'sticky', left: 0, zIndex: 1000 }}
        borderLeft={false}
        borderRight={true}
        isLastrow={isLastrow}
        isEdit={isEdit}
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
          <Typography variant="caption_regular_ja">{row?.tenant_name}</Typography>
          <Stack
            direction="row"
            spacing={4}
            sx={{
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            {isEdit ? (
              <>
                <IconButton
                  sx={{ borderRadius: 2, height: 24, width: 24 }}
                  onClick={() => {
                    setIsEdit(false);
                    setChangData([]);
                  }}
                >
                  <EditClose sx={{ height: 20, width: 20 }} />
                </IconButton>
                <IconButton
                  sx={{
                    borderRadius: 2,
                    height: 24,
                    width: 24,
                    opacity: changeData?.length === 0 ? 0.5 : 1,
                  }}
                  onClick={() => setOpenUpdateConfirm(true)}
                  disabled={changeData?.length === 0}
                >
                  <EditSave sx={{ height: 22, width: 22 }} />
                </IconButton>
              </>
            ) : (
              <IconButton
                sx={{ borderRadius: 2, height: 24, width: 24 }}
                onClick={() => setIsEdit(true)}
              >
                <Edit sx={{ height: 20, width: 20 }} />
              </IconButton>
            )}
          </Stack>
        </Stack>
      </CustomStackTabelRowCell>
      <Stack
        direction="column"
        sx={{
          width: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {row?.services?.map((service, index) => (
          <ServiceRow
            key={`${service?.service_id}&${service?.updated_at}`}
            row={row}
            service={service}
            isLastrow={isLastrow && index + 1 === row?.services?.length}
            isEdit={isEdit}
            onChangeOpenComponentNumber={onChangeOpenComponentNumber}
            changeData={changeData}
            setChangData={setChangData}
          />
        ))}
      </Stack>

      {openUpdateConfirm && (
        <DailogModal
          open={openUpdateConfirm}
          icon={<Confirm sx={{ height: 60, width: 60 }} />}
          title="テナントサービス更新"
          content={`テナント「${row?.tenant_name}」の利用サービスを更新します。よろしいですか？`}
          confirmText="更新する"
          handleClose={() => setOpenUpdateConfirm(false)}
          handleConfirm={handleConfirmUpdate}
        />
      )}
    </Stack>
  );
}

function ServiceRow({
  row,
  service,
  isLastrow,
  isEdit,
  onChangeOpenComponentNumber,
  changeData,
  setChangData,
}) {
  const [openComponent, setOpenComponent] = useState(false);

  const handleClickComponentDetail = () => {
    const number = service?.components?.length - 1;
    if (openComponent) {
      onChangeOpenComponentNumber(-number);
    } else {
      onChangeOpenComponentNumber(number);
    }
    setOpenComponent(!openComponent);
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
        height={openComponent ? 48 * service?.components?.length : 48}
        width={220}
        minWidth={220}
        maxWidth={220}
        style={{ position: 'sticky', left: 280, zIndex: 1000 }}
        borderLeft={false}
        borderRight={true}
        isLastrow={isLastrow}
        isEdit={isEdit}
        align="start"
      >
        <Typography variant="caption_regular_ja">{service?.service_name}</Typography>
      </CustomStackTabelRowCell>
      <CustomStackTabelRowCell
        height={openComponent ? 48 * service?.components?.length : 48}
        width={220}
        minWidth={220}
        maxWidth={220}
        style={{ position: 'sticky', left: 500, zIndex: 1000 }}
        borderLeft={false}
        borderRight={true}
        isLastrow={isLastrow}
        isEdit={isEdit}
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
          <Typography variant="caption_regular_ja">{formatInt(service?.count, '件')}</Typography>
          <Stack
            direction="row"
            spacing={4}
            sx={{
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <IconButton
              sx={{ borderRadius: 2, height: 24, width: 24 }}
              onClick={handleClickComponentDetail}
              disabled={service?.components?.length === 0}
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
                  disabled={service?.components?.length === 0}
                />
              )}
            </IconButton>
          </Stack>
        </Stack>
      </CustomStackTabelRowCell>

      {service?.components?.length > 0 && openComponent && (
        <Stack
          direction="column"
          sx={{
            width: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          {service?.components?.map((component, index) => (
            <ComponentDetailRow
              key={`${component?.component_id}&${component?.updated_at}${component?.checked_flag}`}
              row={row}
              service={service}
              component={component}
              isLastrow={isLastrow && index + 1 === service?.components?.length}
              isEdit={isEdit}
              changeData={changeData}
              setChangData={setChangData}
            />
          ))}
        </Stack>
      )}
      {!openComponent && <ComponentDetailClose isLastrow={isLastrow} isEdit={isEdit} />}
    </Stack>
  );
}

function ComponentDetailClose({ isLastrow, isEdit }) {
  return (
    <>
      <CustomStackTabelRowCell
        width={1}
        borderLeft={false}
        borderRight={true}
        isLastrow={isLastrow}
        isEdit={isEdit}
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
        isEdit={isEdit}
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

function ComponentDetailRow({
  row,
  service,
  component,
  isLastrow,
  isEdit,
  changeData,
  setChangData,
}) {
  const formik = useFormik({
    initialValues: {
      tenant_id: row?.tenant_id,
      service_id: service?.service_id,
      component_id: component?.component_id,
      component_name: component?.component_name,
      checked_flag: component?.checked_flag,
    },
  });
  const handleClick = (value) => {
    const temp = changeData.filter((item) => item?.component_id !== component?.component_id);
    temp.push({
      tenant_id: row?.tenant_id,
      service_id: service?.service_id,
      component_id: component?.component_id,
      checked_flag: value,
    });
    setChangData(temp);
  };

  useEffect(() => {
    formik.resetForm();
  }, [isEdit]);

  return (
    <FormikProvider value={formik}>
      <Stack
        direction="row"
        sx={{
          width: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <CustomStackTabelRowCell
          width={1}
          borderLeft={false}
          borderRight={true}
          isLastrow={isLastrow}
          isEdit={isEdit}
          align="start"
        >
          <Typography variant="caption_regular_ja">{component?.component_name}</Typography>
        </CustomStackTabelRowCell>
        <CustomStackTabelRowCell
          width={120}
          minWidth={120}
          maxWidth={120}
          borderLeft={false}
          borderRight={false}
          isLastrow={isLastrow}
          isEdit={isEdit}
          align="center"
        >
          <BasicCheckbox name="checked_flag" disabled={!isEdit} onClick={handleClick} />
        </CustomStackTabelRowCell>
      </Stack>
    </FormikProvider>
  );
}
