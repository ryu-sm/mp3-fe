import React from 'react';
import TreeDataTable from './TreeDataTable';

const data = [
  {
    id: '1',
    label: 'Parent 1',
    value: '100',
    children: [
      { id: '1-1', label: 'Child 1-1', value: '50' },
      { id: '1-2', label: 'Child 1-2', value: '50' },
    ],
  },
  {
    id: '2',
    label: 'Parent 2',
    value: '200',
    children: [
      {
        id: '2-1',
        label: 'Child 2-1',
        value: '100',
        children: [{ id: '2-1-1', label: 'Subchild 2-1-1', value: '50' }],
      },
    ],
  },
];

const columns = [
  { key: 'label', label: '名称' },
  { key: 'value', label: '数值' },
];

function App() {
  return (
    <div style={{ padding: 20 }}>
      <TreeDataTable data={data} columns={columns} />
    </div>
  );
}

export default App;
