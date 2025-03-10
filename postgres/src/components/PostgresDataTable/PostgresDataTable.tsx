import { useState, useCallback } from 'react';
import { DataTable } from '@surface.dev/core';
import { PostgresDataColumnType, PostgresDataRowType } from '../../types';
import { PostgresColumnName } from '../PostgresColumnName';
import { PostgresColumnValue } from '../PostgresColumnValue';
import { trimDict } from '../../utils/typeTransforms';

export type PostgresDataTableProps =
  // Query provided, which will be used to determine columns and rows.
  | {
      query: string;
      columns?: never;
      rows?: never;
    }
  // Columns and rows explicitly provided and known upfront.
  | {
      query?: never;
      columns: PostgresDataColumnType[];
      rows: PostgresDataRowType[];
    };

/*
  TODO:
    - Table height and width
    - Context descriptions
    - Make context descriptions even briefer in other components...
    - styled-components for styling
    - useQuery hook
    - SQL query parser and schema introspection / mappings to known tables/views/etc.
    - loading state
    - fallback components for DataTable
*/

const uniqueColKey = (index: number, column: PostgresDataColumnType) =>
  [index, column.name].join('-');

export const PostgresDataTable = ({ query, ...props }: PostgresDataTableProps) => {
  const [columns, setColumns] = useState<PostgresDataColumnType[]>(props.columns || []);
  const [rows, setRows] = useState<PostgresDataRowType[]>(props.rows || []);

  /**
   * -- TABLE HEADER ---------------
   */

  const renderHeaderCell = useCallback((column: PostgresDataColumnType, columnIndex: number) => {
    // TODO: style sticky if in primary key
    return (
      <th key={uniqueColKey(columnIndex, column)}>
        <PostgresColumnName dataType={column.dataType}>{column.name}</PostgresColumnName>
      </th>
    );
  }, []);

  const renderHeaderRow = useCallback(
    () => <tr>{columns.map(renderHeaderCell)}</tr>,
    [columns, renderHeaderCell]
  );

  /**
   * -- TABLE BODY ---------------
   */

  const renderDataCell = useCallback(
    (column: PostgresDataColumnType, columnIndex: number, rowData: PostgresDataRowType) => {
      // TODO: style sticky if in primary key
      const value = rowData[column.name];

      return (
        <td key={uniqueColKey(columnIndex, column)}>
          <PostgresColumnValue dataType={column.dataType} columnName={column.name}>
            {value}
          </PostgresColumnValue>
        </td>
      );
    },
    []
  );

  const renderDataRow = useCallback(
    (props: any) => {
      const rowData = props.item || {};
      const passThruProps = trimDict(props, ['item']);
      return (
        <tr {...passThruProps}>
          {columns.map((column, columnIndex) => renderDataCell(column, columnIndex, rowData))}
        </tr>
      );
    },
    [columns, renderDataCell]
  );

  return (
    <DataTable
      columns={columns}
      rows={rows}
      renderHeaderRow={renderHeaderRow}
      renderDataRow={renderDataRow}
    />
  );
};
