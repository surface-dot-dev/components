import styled from 'styled-components';
import { getResolvedDataType, dataTypes as dt } from '../../utils/dataTypes';

export type PostgresValueProps = {
  value: any;
  type: string;
};

const StyledNumber = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-family: monospace;
`;

const StyledBoolean = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

const StyledDateTime = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

const StyledJson = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

const StyledText = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-family: Regular;
`;

export const PostgresValue = ({ value, type }: PostgresValueProps) => {
  const resolvedType = getResolvedDataType(type);

  switch (resolvedType) {
    // Integers
    case dt.INT2:
    case dt.INT4:
    case dt.INT8:
      return <StyledNumber>{value}</StyledNumber>;

    // Floats
    case dt.NUMERIC:
    case dt.FLOAT4:
    case dt.FLOAT8:
      return <StyledNumber>{value}</StyledNumber>;

    // Booleans
    case dt.BOOLEAN:
      return <StyledBoolean>{value}</StyledBoolean>;

    // Date/Time
    case dt.DATE:
    case dt.TIMESTAMPTZ:
    case dt.TIMESTAMP:
    case dt.TIMETZ:
    case dt.TIME:
      return <StyledDateTime>{value}</StyledDateTime>;

    // JSON
    case dt.JSON_TYPE:
    case dt.JSONB:
      return <StyledJson>{value}</StyledJson>;

    // Text / Fallback
    default:
      return <StyledText>{value}</StyledText>;
  }
};
