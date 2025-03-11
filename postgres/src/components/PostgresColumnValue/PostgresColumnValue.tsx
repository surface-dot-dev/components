import { PostgresValue } from '../PostgresValue';

export type PostgresColumnValueProps = {
  dataType: string;
  columnName: string;
  children: React.ReactNode;
  context?: string;
};

const ctx = (dataType: string, columnName: string) =>
  `"${columnName}" column value (type "${dataType}")`;

export const PostgresColumnValue = ({
  dataType,
  columnName,
  children,
  ...props
}: PostgresColumnValueProps) => {
  const context = props.context || ctx(dataType, columnName);
  return (
    <PostgresValue dataType={dataType} context={context}>
      {children}
    </PostgresValue>
  );
};
