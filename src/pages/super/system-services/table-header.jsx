import { Stack } from '@mui/material';

import { CustomStackTabelHeaderCell } from 'src/components';

export const HeaderRow = () => {
  const headers = [
    {
      id: 'service_name',
      label: 'サービス名',
      width: 220,
      minWidth: 220,
      maxWidth: 220,
      style: { position: 'sticky', left: 0, zIndex: 1001 },
      borderLeft: false,
      borderRight: true,
    },
    {
      id: 'count',
      label: 'コンポーネント数',
      width: 180,
      minWidth: 180,
      maxWidth: 180,
      style: { position: 'sticky', left: 220, zIndex: 1001 },
      borderLeft: false,
      borderRight: true,
    },
    {
      id: 'component_name',
      label: 'コンポーネント名',
      width: 180,
      minWidth: 180,
      maxWidth: 180,
      borderLeft: false,
      borderRight: true,
    },
    {
      id: 'url',
      label: 'URL',
      width: 1,
      borderLeft: false,
      borderRight: true,
    },
    {
      id: 'status',
      label: 'ステータス',
      width: 120,
      minWidth: 120,
      maxWidth: 120,
      borderLeft: false,
      borderRight: false,
    },
    {
      id: 'operation',
      label: '操作',
      width: 60,
      minWidth: 60,
      maxWidth: 60,
      style: { position: 'sticky', right: 0, zIndex: 1001 },
      borderLeft: true,
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
        zIndex: 1000,
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
