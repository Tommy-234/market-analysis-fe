import { BinanceAnalysis } from '@tommy_234/live-data';

export * from './useActions';
export * from './user';

export const binanceInit = ( binanceAnalysis: BinanceAnalysis) => ({
  type: 'BINANCE_ANLAYSIS_CREATE',
  binanceAnalysis
});

export const tableDataUpdate = ( data: Record<string, unknown>[]) => ({
  type: 'TABLE_DATA_UPDATE',
  data
});

