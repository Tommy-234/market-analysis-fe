export const binanceAnalysis = ( state = {}, action ) => {
  switch(action.type) {
    case 'BINANCE_ANLAYSIS_CREATE':
      return action.binanceAnalysis;
    default:
      return state;
  }
}
