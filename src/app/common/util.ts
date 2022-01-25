import { toString, toNumber, split } from 'lodash';

export const countDecimals = ( num: number ) => 
  Math.floor(num) === num ? 0 :
  split(toString(num), '.')[1].length;

export const removeMillisec = ( time: number ) => 
  toNumber(toString(time).slice(0, -3));
