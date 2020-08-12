import { useContext } from "react";

import { PaymentRequestContext } from "../contexts";

export default function usePaymentRequest() {
  return useContext(PaymentRequestContext);
}
