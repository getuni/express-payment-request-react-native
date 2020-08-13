import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Platform, Linking } from "react-native";
import * as WebBrowser from "expo-web-browser";
import {parse as params} from "query-string";
import parse from "url-parse";
import {encode as btoa} from "base-64";

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
  const [paymentResult, setPaymentResult] = useState(null);
  const maybeFetchPaymentResult = useCallback(
    url => Promise
      .resolve()
      .then(
        () => {
          if (url) {
            return Promise
              .resolve()
              .then(() => parse(url))
              .then(({query}) => params(query))
              .then(({paymentResult}) => {
                if (!!paymentResult) {
                  /* close prompt */
                  if (Platform.OS === "ios") {
                    WebBrowser.dismissBrowser();
                  }
                  return Promise
                    .resolve()
                    .then(() => JSON.parse(atob(paymentResult)))
                    .then(setPaymentResult);
                }
              });
          }
          return undefined;
        },
      )
      .catch(error => updateState(() => ({ data: null, error }))),
    [setPaymentResult],
  );

  useEffect(
    () => {
      /* initial url */
      Linking.getInitialURL()
        .then(url => maybeFetchPaymentResult(url));

      const e = ({url}) => maybeFetchPaymentResult(url);
      /* mid-session url */
      Linking.addEventListener("url", e);

      return () => Linking.removeEventListener("url", e);
    },
    [maybeFetchPaymentResult],
  );

  const requestPayment = useCallback(
    (deepLinkUri: string, paymentData: PaymentData) => {
      const details = btoa(JSON.stringify(paymentData));
      const url = `${uri}?details=${details}&deepLinkUri=${btoa(deepLinkUri)}`;
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
        // TODO: needs a clear result too
        paymentResult,
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
