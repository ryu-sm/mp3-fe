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
      id: 'title',
      label: 'タイトル',
      width: 1,
      style: { position: 'sticky', left: 60, zIndex: 1001 },
      borderLeft: false,
      borderRight: true,
    },
    {
      id: 'publication_start_at',
      label: '公開開始日時',
      width: 180,
      minWidth: 180,
      maxWidth: 180,
      borderLeft: false,
      borderRight: true,
    },
    {
      id: 'publication_end_at',
      label: '公開終了日時',
      width: 180,
      minWidth: 180,
      maxWidth: 180,
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
