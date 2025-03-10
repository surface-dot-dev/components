import styled from 'styled-components';
import { TableVirtuoso } from 'react-virtuoso';
import { useCallback } from 'react';
import {
  DataTableColumnType,
  DataTableRowType,
  DataTableHeaderCellType,
  DataTableDataCellType,
} from './types';

const defaultStyle = { height: '100%', width: '100%' };

export type DataTableProps = {
  columns: DataTableColumnType[];
  rows: DataTableRowType[];
  numFixedColumns?: number;
  renderHeaderCell?: (props: DataTableHeaderCellType) => React.ReactNode;
  renderDataCell?: (props: DataTableDataCellType) => React.ReactNode;
  style?: React.CSSProperties;
};

export const DataTable = ({
  columns,
  rows,
  numFixedColumns = 0,
  renderHeaderCell,
  renderDataCell,
  style = {},
}: DataTableProps) => {
  /**
   * -- HEADER ---------
   */
  const renderHeaderRow = useCallback(() => {
    return (
      <tr>
        {columns.map((column, columnIndex) => {
          const headerCellProps = { column, columnIndex };
          return (
            <StyledTableHeaderCell
              key={uniqueColKey(columnIndex, column)}
              $isSticky={columnIndex < numFixedColumns}
            >
              {renderHeaderCell ? renderHeaderCell(headerCellProps) : <span>{column.name}</span>}
            </StyledTableHeaderCell>
          );
        })}
      </tr>
    );
  }, [columns, numFixedColumns, renderHeaderCell]);

  /**
   * -- BODY -----------
   */
  const renderDataRow = useCallback(
    (rowIndex: number, row: DataTableRowType) => {
      return (
        <>
          {columns.map((column, columnIndex) => {
            const value = row[column.name];
            const dataCellProps = { column, columnIndex, row, rowIndex, value };
            return (
              <StyledTableDataCell
                key={uniqueColKey(columnIndex, column)}
                $isSticky={columnIndex < numFixedColumns}
              >
                {renderDataCell ? renderDataCell(dataCellProps) : <span>{value}</span>}
              </StyledTableDataCell>
            );
          })}
        </>
      );
    },
    [columns, numFixedColumns, renderDataCell]
  );

  return (
    <TableVirtuoso
      style={{ ...defaultStyle, ...style }}
      data={rows}
      fixedHeaderContent={renderHeaderRow}
      itemContent={renderDataRow}
    />
  );
};

// ========================
// Helper Functions
// ========================

const uniqueColKey = (index: number, column: DataTableColumnType) => [index, column.name].join('-');

// ========================
// Styled Components
// ========================

const StyledTableHeaderCell = styled.th<{ $isSticky: boolean }>`
  position: ${(props) => (props.$isSticky ? 'sticky' : 'static')};
  left: 0;
  z-index: ${(props) => (props.$isSticky ? 1 : 'auto')};
`;

const StyledTableDataCell = styled.td<{ $isSticky: boolean }>`
  position: ${(props) => (props.$isSticky ? 'sticky' : 'static')};
  left: 0;
  z-index: ${(props) => (props.$isSticky ? 1 : 'auto')};
`;
