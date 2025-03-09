export type PostgresColumnNameProps = {
  dataType: string;
  children: string;
};

const ctx = (dataType: string) => `the name of a column with data type "${dataType}"`;

export const PostgresColumnName = ({ dataType, children }: PostgresColumnNameProps) => {
  return <span data-context={ctx(dataType)}>{children}</span>;
};
