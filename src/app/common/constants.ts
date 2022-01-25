import { PriceFormat } from 'lightweight-charts';

export const CandleFields = [
  'close',
  'open',
  'high',
  'low',
  'volume',
  'quoteAssetVolume',
  'baseAssetBuyVolume',
  'quoteAssetBuyVolume'
];

export const DefualtScannerColumns = ['symbol', 'lastPrice', 'lowPrice', 'highPrice'];

export const DollarPriceFormat: PriceFormat = {
  type: 'price',
  precision: 2,
  minMove: 0.01
};
