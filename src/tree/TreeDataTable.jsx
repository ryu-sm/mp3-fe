import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Collapse,
  Paper,
  Button,
  Stack,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

const TreeRowComponent = ({ row, columns, level = 0, expandedNodes, toggleNode }) => {
  const hasChildren = row.children && row.children.length > 0;
  const isOpen = expandedNodes.has(row.id);

  return (
    <>
      <TableRow>
        {columns.map((col, index) => (
          <TableCell
            key={col.key}
            style={{ paddingLeft: index === 0 ? level * 24 : undefined, border: '1px solid red' }}
          >
            {index === 0 && hasChildren && (
              <IconButton size="small" onClick={() => toggleNode(row.id)}>
                {isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              </IconButton>
            )}
            {index === 0 && !hasChildren ? <span style={{ marginLeft: 32 }} /> : null}
            {row[col.key]}
          </TableCell>
        ))}
      </TableRow>
      {hasChildren && (
        <TableRow>
          <TableCell
            style={{ paddingBottom: 0, paddingTop: 0, border: '1px solid red' }}
            colSpan={columns.length}
          >
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
              <Table size="small">
                <TableBody>
                  {row.children.map((child) => (
                    <TreeRowComponent
                      key={child.id}
                      row={child}
                      columns={columns}
                      level={level + 1}
                      expandedNodes={expandedNodes}
                      toggleNode={toggleNode}
                    />
                  ))}
                </TableBody>
              </Table>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

const collectAllNodeIds = (data) => {
  const ids = new Set();
  const traverse = (rows) => {
    rows.forEach((row) => {
      if (row.children) {
        ids.add(row.id);
        traverse(row.children);
      }
    });
  };
  traverse(data);
  return ids;
};

const TreeDataTable = ({ data, columns }) => {
  const [expandedNodes, setExpandedNodes] = useState(new Set());

  const toggleNode = (id) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const expandAll = () => setExpandedNodes(collectAllNodeIds(data));
  const collapseAll = () => setExpandedNodes(new Set());

  return (
    <TableContainer component={Paper}>
      <Stack direction="row" spacing={2} p={2}>
        <Button variant="outlined" onClick={expandAll}>
          展开全部
        </Button>
        <Button variant="outlined" onClick={collapseAll}>
          折叠全部
        </Button>
      </Stack>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.key}>{col.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TreeRowComponent
              key={row.id}
              row={row}
              columns={columns}
              expandedNodes={expandedNodes}
              toggleNode={toggleNode}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TreeDataTable;
