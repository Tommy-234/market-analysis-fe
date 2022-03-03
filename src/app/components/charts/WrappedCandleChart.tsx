import { FC, useState, useEffect } from 'react';
import { isEmpty } from 'lodash';
import { BinanceApiClient, IntervalType } from '@tommy_234/live-data';
import { CandleChart } from './CandleChart';
import { BinanceConfig, IntervalOptions } from '../../common';

export type WrappedCandleChartProps = {
  symbol: string;
  initialInterval?: IntervalType;
};

export const WrappedCandleChart: FC<WrappedCandleChartProps> = ({
  symbol,
  initialInterval
}) => {
  const [data, setData] = useState([]);
  const [apiClient, setApiClient] = useState(null);
  const [interval, setInterval] = useState(
    !isEmpty(initialInterval) ? initialInterval : IntervalType.Day1
  );

  useEffect(() => {
    setApiClient(new BinanceApiClient(BinanceConfig.apiConfig));
  }, [])

  useEffect( () => {
    !isEmpty(apiClient) && apiClient.historicData({ interval, symbol, limit: 200 })
      .then( (data) => setData(data))
      .catch( error => console.log('HistoryWrapper - apiClient error: ', error));
  }, [ interval, apiClient ]);

  return (
    <>
      <div className='form-row'>
        <label className="col-form-label">Interval</label>
        <div className="input-row">
          <select
            className="form-control mb-2"
            id='modalInterval'
            value={interval}
            disabled={!isEmpty(initialInterval)}
            onChange={ (e) => setInterval(e.target.value as IntervalType) }
          >
            {IntervalOptions}
          </select>
        </div>
      </div>
      {!isEmpty(data) ? (
        <>
          <CandleChart
            symbol={symbol}
            data={data}
            lineSeries={[{
              count: 50,
              options: {
                color: 'blue',
                lineWidth: 1
              }
            }]}
            volume={true}
          />
        </>
      ) : (
        <div>...Loading...</div>
      )}
    </>
  );
};
