import { TableVirtuoso } from 'react-virtuoso';
import { DataColumnType, DataRowType } from './types';

export type DataTableProps = {
  columns: DataColumnType[];
  rows: DataRowType[];
  renderHeaderRow?: () => React.ReactNode;
  renderDataRow?: (props: any) => React.ReactNode;
};

export const DataTable = ({ columns, rows, renderHeaderRow, renderDataRow }: DataTableProps) => {
  return (
    <TableVirtuoso
      data={rows}
      components={{ TableRow: renderDataRow }}
      fixedHeaderContent={() => (renderHeaderRow ? renderHeaderRow() : null)} // TODO: Add fallback comp
    />
  );
};
