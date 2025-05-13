import { TableHead, TableRow } from '@mui/material';

import { CustomTabelHeaderCell } from 'src/components';

export const HeaderRow = ({ sortBy, sortOrder, handleSort }) => {
  const headers = [
    {
      id: 'no',
      label: 'No.',
      width: 60,
      minWidth: 60,
      maxWidth: 60,
      style: { position: 'sticky', left: 0, zIndex: 1001 },
      borderLeft: false,
      borderRight: true,
    },
    {
      id: 'name',
      label: 'テナント名',
      width: 180,
      minWidth: 180,
      maxWidth: 180,
      style: { position: 'sticky', left: 60, zIndex: 1001 },
      borderLeft: false,
      borderRight: true,
    },
    {
      id: 'manager_name',
      label: '担当者名前',
      width: 160,
      minWidth: 160,
      maxWidth: 160,
      borderLeft: false,
      borderRight: true,
    },
    {
      id: 'manager_email',
      label: '担当者Eメール',
      width: 200,
      minWidth: 200,
      maxWidth: 200,
      borderLeft: false,
      borderRight: true,
    },
    {
      id: 'phone_number',
      label: '電話番号',
      width: 160,
      minWidth: 160,
      maxWidth: 160,
      borderLeft: false,
      borderRight: true,
    },
    {
      id: 'address',
      label: '住所',
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
    <TableHead>
      <TableRow>
        {headers.map((header) => (
          <CustomTabelHeaderCell
            key={header?.id}
            width={header?.width}
            minWidth={header?.minWidth}
            maxWidth={header?.maxWidth}
            field={header?.id}
            style={header?.style}
            borderLeft={header?.borderLeft}
            borderRight={header?.borderRight}
            sortBy={sortBy}
            sortOrder={sortOrder}
            handleSort={handleSort}
          >
            {header.label}
          </CustomTabelHeaderCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
