import { useRoute } from '@react-navigation/native';
import lang from 'i18n-js';
import makeColorMoreChill from 'make-color-more-chill';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { darkModeThemeColors } from '../../styles/colors';
import { HoldToAuthorizeButton } from '../buttons';
import { Centered } from '../layout';
import { useTheme } from '@rainbow-me/context';
import { ExchangeModalTypes } from '@rainbow-me/helpers';
import {
  useColorForAsset,
  useGas,
  useSwapCurrencies,
  useSwapIsSufficientBalance,
  useSwapIsSufficientLiquidity,
} from '@rainbow-me/hooks';
import { ETH_ADDRESS } from '@rainbow-me/references';
import Routes from '@rainbow-me/routes';
import { lightModeThemeColors, padding } from '@rainbow-me/styles';

const paddingHorizontal = 19;

const ConfirmButton = styled(HoldToAuthorizeButton).attrs({
  hideInnerBorder: true,
  parentHorizontalPadding: paddingHorizontal,
  theme: 'dark',
})`
  flex: 1;
`;

const Container = styled(Centered)`
  ${padding(5, paddingHorizontal, 0)};
  width: 100%;
`;

export default function ConfirmExchangeButton({
  disabled,
  doneLoadingReserves,
  inputAmount,
  isHighPriceImpact,
  onPressViewDetails,
  onSubmit,
  testID,
  tradeDetails,
  type = ExchangeModalTypes.swap,
  ...props
}) {
  const isSufficientBalance = useSwapIsSufficientBalance(inputAmount);
  const isSufficientLiquidity = useSwapIsSufficientLiquidity(
    doneLoadingReserves,
    tradeDetails
  );
  const { inputCurrency, outputCurrency } = useSwapCurrencies();
  const asset = outputCurrency ?? inputCurrency;
  const { isSufficientGas } = useGas();
  const { name: routeName } = useRoute();

  const isSwapDetailsRoute = routeName === Routes.SWAP_DETAILS_SHEET;
  const shouldOpenSwapDetails =
    tradeDetails && isHighPriceImpact && !isSwapDetailsRoute;

  const { colors, isDarkMode } = useTheme();

  const shadows = useMemo(
    () => ({
      default: [[0, 10, 30, darkModeThemeColors.shadow, 0.4]],
      disabled: [
        [0, 10, 30, colors.shadow, isDarkMode ? 0 : 0.2],
        [
          0,
          5,
          15,
          isDarkMode ? colors.shadow : lightModeThemeColors.blueGreyDark50,
          0.4,
        ],
      ],
    }),
    [colors, isDarkMode]
  );

  const colorForAsset = useColorForAsset(asset, undefined, true, true);

  const { buttonColor, shadowsForAsset } = useMemo(() => {
    const color =
      asset.address === ETH_ADDRESS
        ? colors.appleBlue
        : isSwapDetailsRoute
        ? colorForAsset
        : makeColorMoreChill(
            colorForAsset,
            (isSwapDetailsRoute ? colors : darkModeThemeColors).light
          );

    return {
      buttonColor: color,
      shadowsForAsset: [
        [0, 10, 30, colors.shadow, 0.2],
        [0, 5, 15, isDarkMode ? colors.trueBlack : color, 0.4],
      ],
    };
  }, [asset.address, colorForAsset, colors, isDarkMode, isSwapDetailsRoute]);

  let label = '';
  if (type === ExchangeModalTypes.deposit) {
    label = lang.t('button.confirm_exchange.deposit');
  } else if (type === ExchangeModalTypes.swap) {
    label = lang.t('button.confirm_exchange.swap');
  } else if (type === ExchangeModalTypes.withdrawal) {
    label = lang.t('button.confirm_exchange.withdraw');
  }

  if (!isSufficientBalance) {
    label = lang.t('button.confirm_exchange.insufficient_funds');
  } else if (!isSufficientLiquidity) {
    label = lang.t('button.confirm_exchange.insufficient_liquidity');
  } else if (!isSufficientGas) {
    label = lang.t('button.confirm_exchange.insufficient_eth');
  } else if (isHighPriceImpact) {
    label = isSwapDetailsRoute
      ? lang.t('button.confirm_exchange.swap_anyway')
      : `􀕹 ${lang.t('button.confirm_exchange.view_details')}`;
  } else if (disabled) {
    label = lang.t('button.confirm_exchange.enter_amount');
  } else if (!doneLoadingReserves) {
    label = lang.t('button.confirm_exchange.fetching_details');
  }

  const isDisabled =
    disabled ||
    !doneLoadingReserves ||
    !isSufficientBalance ||
    !isSufficientGas ||
    !isSufficientLiquidity;

  return (
    <Container>
      <ConfirmButton
        backgroundColor={buttonColor}
        disableLongPress={shouldOpenSwapDetails}
        disabled={isDisabled}
        disabledBackgroundColor={
          isSwapDetailsRoute
            ? isDarkMode
              ? darkModeThemeColors.blueGreyDark04
              : lightModeThemeColors.blueGreyDark50
            : darkModeThemeColors.blueGreyDark04
        }
        label={label}
        onLongPress={shouldOpenSwapDetails ? onPressViewDetails : onSubmit}
        shadows={
          isSwapDetailsRoute
            ? isDisabled
              ? shadows.disabled
              : shadowsForAsset
            : shadows.default
        }
        showBiometryIcon={!isDisabled && !isHighPriceImpact}
        testID={testID}
        {...props}
      />
    </Container>
  );
}
