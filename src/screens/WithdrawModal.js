import React from 'react';
import useStatusBarManaging from '../navigation/useStatusBarManaging';
import ExchangeModal from './ExchangeModal';
import { ExchangeModalTypes } from '@rainbow-me/entities';
import {
  createWithdrawFromCompoundRap,
  estimateWithdrawFromCompound,
} from '@rainbow-me/raps';

const WithdrawModal = ({ route, navigation, ...props }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  android && useStatusBarManaging();
  const cTokenBalance = route.params?.cTokenBalance;
  const defaultInputAsset = route.params?.defaultInputAsset;
  const underlyingPrice = route.params?.underlyingPrice;
  const supplyBalanceUnderlying = route.params?.supplyBalanceUnderlying;

  return (
    <ExchangeModal
      cTokenBalance={cTokenBalance}
      createRap={createWithdrawFromCompoundRap}
      defaultInputAsset={defaultInputAsset}
      estimateRap={estimateWithdrawFromCompound}
      inputHeaderTitle={`Withdraw ${defaultInputAsset.symbol}`}
      navigation={navigation}
      showOutputField={false}
      supplyBalanceUnderlying={supplyBalanceUnderlying}
      type={ExchangeModalTypes.withdrawCompound}
      underlyingPrice={underlyingPrice}
      {...props}
    />
  );
};

export default WithdrawModal;
