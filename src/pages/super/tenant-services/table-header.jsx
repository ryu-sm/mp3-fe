import { Stack } from '@mui/material';

import { CustomStackTabelHeaderCell } from 'src/components';

export const HeaderRow = () => {
  const headers = [
    {
      id: 'tenant_name',
      label: 'テナント名',
      width: 280,
      minWidth: 280,
      maxWidth: 280,
      style: { position: 'sticky', left: 0, zIndex: 1001 },
      borderLeft: false,
      borderRight: true,
    },
    {
      id: 'service_name',
      label: 'サービス名',
      width: 220,
      minWidth: 220,
      maxWidth: 220,
      style: { position: 'sticky', left: 280, zIndex: 1001 },
      borderLeft: false,
      borderRight: true,
    },
    {
      id: 'count',
      label: 'コンポーネント数',
      width: 220,
      minWidth: 220,
      maxWidth: 220,
      style: { position: 'sticky', left: 500, zIndex: 1001 },
      borderLeft: false,
      borderRight: true,
    },
    {
      id: 'component_name',
      label: 'コンポーネント名',
      width: 1,
      borderLeft: false,
      borderRight: true,
    },
    {
      id: 'used_flag',
      label: '利用フラグ',
      width: 120,
      minWidth: 120,
      maxWidth: 120,
      borderLeft: false,
      borderRight: false,
    },
  ];

  return (
    <Stack
      direction="row"
      sx={{
        width: 1,
        position: 'sticky',
        top: 0,
        zIndex: 1001,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {headers.map((header) => (
        <CustomStackTabelHeaderCell
          key={header?.id}
          width={header?.width}
          minWidth={header?.minWidth}
          maxWidth={header?.maxWidth}
          style={header?.style}
          borderLeft={header?.borderLeft}
          borderRight={header?.borderRight}
        >
          {header.label}
        </CustomStackTabelHeaderCell>
      ))}
    </Stack>
  );
};
