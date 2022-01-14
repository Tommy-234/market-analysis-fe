import { IndicatorType, IntervalType, Operator } from '@tommy_234/live-data';
import { map } from 'lodash';

export const IndicatorOptions =
  map(Object.keys(IndicatorType), (indicator: IndicatorType) =>
    <option value={IndicatorType[indicator]}>
      {IndicatorType[indicator]}
    </option>
  ).concat(<option value=''>Select Indicator...</option>);

export const IntervalOptions =
  map(Object.keys(IntervalType), (interval: IntervalType) =>
    <option value={IntervalType[interval]}>
      {IntervalType[interval]}
    </option>
  )
  .concat(<option value=''>Select Interval...</option>);

export const OperatorOptions = 
  map(Object.keys(Operator), (operator: Operator) =>
    <option value={Operator[operator]}>
      {Operator[operator]}
    </option>
  )
  .concat(<option value=''>Select Operator...</option>);
