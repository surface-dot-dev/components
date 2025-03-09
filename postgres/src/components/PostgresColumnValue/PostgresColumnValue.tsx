import { PostgresValue } from '../PostgresValue';

export type PostgresColumnValueProps = {
  dataType: string;
  columnName: string;
  children: React.ReactNode;
};

const ctx = (dataType: string, columnName: string) =>
  `the value of column "${columnName}" with data type "${dataType}"`;

export const PostgresColumnValue = ({
  dataType,
  columnName,
  children,
}: PostgresColumnValueProps) => {
  return (
    <PostgresValue dataType={dataType} context={ctx(dataType, columnName)}>
      {children}
    </PostgresValue>
  );
};
