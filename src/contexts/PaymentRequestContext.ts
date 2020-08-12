import * as React from "react";

export const defaultContext = Object.freeze({
  uri: undefined,
  requestPayment: () => Promise.reject(new Error("You may have forgotten to wrap your application within a <PaymentRequestProvider />.")),
});

const PaymentRequestContext = React.createContext(defaultContext);

PaymentRequestContext.defaultContext = defaultContext;

export default PaymentRequestContext;
