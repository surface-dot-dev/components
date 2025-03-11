export type PostgresColumnNameProps = {
  dataType: string;
  children: string;
  context?: string;
};

const ctx = (dataType: string) => `column name (type "${dataType}")`;

export const PostgresColumnName = ({ dataType, children, ...props }: PostgresColumnNameProps) => {
  const context = props.context || ctx(dataType);
  return <span data-context={context}>{children}</span>;
};
