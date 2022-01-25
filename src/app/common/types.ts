import { UTCTimestamp } from "lightweight-charts";

export type ChartCandle = {
  time: UTCTimestamp;
  open: number;
  high: number;
  low: number;
  close: number;
};
