import styled from 'styled-components';
import { useState, useCallback, useMemo } from 'react';
import { DataTable } from '@surface.dev/core';
import { PostgresColumnName } from '../PostgresColumnName';
import { PostgresColumnValue } from '../PostgresColumnValue';
import {
  PostgresDataTableColumnType,
  PostgresDataTableRowType,
  PostgresDataTableHeaderCellType,
  PostgresDataTableDataCellType,
} from '../../types';

export type PostgresDataTableProps =
  // Option #1: Given a query, columns & rows populate based on query results.
  | {
      query: string;
      columns?: never;
      rows?: never;
    }

  // Option #2: Columns & rows are explicitly given, upfront.
  | {
      query?: never;
      columns: PostgresDataTableColumnType[];
      rows: PostgresDataTableRowType[];
    };

export const PostgresDataTable = ({ query, ...props }: PostgresDataTableProps) => {
  const [columns, setColumns] = useState<PostgresDataTableColumnType[]>(props.columns || []);
  const [rows, setRows] = useState<PostgresDataTableRowType[]>(props.rows || []);
  const numFixedColumns = useMemo(() => columns.filter((c) => c.inPrimaryKey).length, [columns]);

  const renderHeaderCell = useCallback(
    ({ column }: PostgresDataTableHeaderCellType) => (
      <PostgresColumnName dataType={column.dataType}>{column.name}</PostgresColumnName>
    ),
    []
  );

  const renderDataCell = useCallback(
    ({ column, value }: PostgresDataTableDataCellType) => (
      <PostgresColumnValue dataType={column.dataType} columnName={column.name}>
        {value}
      </PostgresColumnValue>
    ),
    []
  );

  return (
    <DataTable
      columns={columns}
      rows={rows}
      numFixedColumns={numFixedColumns}
      renderHeaderCell={(props) => renderHeaderCell(props as PostgresDataTableHeaderCellType)}
      renderDataCell={(props) => renderDataCell(props as PostgresDataTableDataCellType)}
    />
  );
};
