import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { Platform, Linking } from "react-native";
import { encode as btoa } from "base-64";
import * as WebBrowser from "expo-web-browser";

import { PaymentRequestContext } from "../contexts";

export type PaymentRequestProviderProps = {
  uri: string;
};

export type PaymentAmount = {
  currency: string;
  value: string;
};

export type PaymentItem = {
  label: string;
  amount: PaymentAmount;
};

export type PaymentData = {
  displayItems: PaymentItem[];
  total: PaymentItem;
};

function PaymentRequestProvider({
  uri,
  ...extras
}: PaymentRequestProviderProps) {
  const requestPayment = useCallback(
    (paymentData: PaymentData) => {
      const details = btoa(JSON.stringify(paymentData));
      const url = `${uri}?details=${details}`;
      if (Platform.OS === "web") {
        return Linking.openURL(url);
      }
      return WebBrowser.openBrowserAsync(url);
    },
    [uri]
  );
  return (
    <PaymentRequestContext.Provider
      value={{
        ...PaymentRequestContext.defaultContext,
        uri,
        requestPayment,
      }}
      {...extras}
    />
  );
}

PaymentRequestProvider.displayName = "PaymentRequestProvider";

PaymentRequestProvider.propTypes = {
  uri: PropTypes.string,
};

PaymentRequestProvider.defaultProps = {
  uri: "https://localhost:3000/payment",
};

export default PaymentRequestProvider;
