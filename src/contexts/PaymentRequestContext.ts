import * as React from "react";

const defaultErrorThunk = () => () => Promise.reject(new Error("You may have forgotten to wrap your application within a <PaymentRequestProvider />."));

export const defaultContext = Object.freeze({
  uri: undefined,
  requestPayment: defaultErrorThunk(),
  clearPaymentRequest: defaultErrorThunk(),
});

const PaymentRequestContext = React.createContext(defaultContext);

PaymentRequestContext.defaultContext = defaultContext;

export default PaymentRequestContext;
