export enum PrismaErrorCode {
  RecordNotFound = 'P2025',
  UniqueConstraintFailed = 'P2002',
  ForeignKeyConstraintFailed = 'P2003',
  ConstraintFailed = 'P2004',
  QueryInterpretationError = 'P2005',
  ValueTooLong = 'P2000',
  RecordUsedElseWhere = 'P2007',
  ConnectionError = 'P1001',
  TimeoutError = 'P1008',
}
