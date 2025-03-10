import { DataColumnType, DataRowType } from '@surface.dev/core';

export type PostgresDataColumnType = DataColumnType & {
  dataType: string;
  inPrimaryKey?: boolean;
};

export type PostgresDataRowType = DataRowType;
