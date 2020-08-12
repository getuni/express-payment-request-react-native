# express-payment-request-react-native
💸 The companion React Native (iOS/Android/Web) frontend for express-payment-request. This allows you to accept payments via services such as  [**Apple Pay**](https://www.apple.com/uk/apple-pay/) without linking.

## 🚀 Getting Started

Using [`yarn`](https://yarnpkg.com):

```bash
yarn add express-payment-request-react-native
```

## ✍️ Example

Below, we show that a the client can define the amount to pay via the [`usePaymentRequest`](./src/hooks/usePaymentRequest.ts) hook. This requires that your app is wrapped within a [**PaymentRequestProvider**](./src/providers/PaymentRequestProvider.ts).

```javascript
import React from "react";
import { TouchableOpacity, Text } from "react-native";
import PaymentRequestProvider, { usePaymentRequest } from "express-payment-request-react-native";

function Button() {
  const { requestPayment } = usePaymentRequest();
  return (
    <TouchableOpacity
      onPress={() =>
        requestPayment({
          displayItems: [
            {
              label: "A client driven amount!",
              amount: { currency: "USD", value: "0.02" },
            },
          ],
          total: {
            label: "Total due",
            amount: { currency: "USD", value: "0.02" },
          },
        })
      }
    >
      <Text children="Request Payment of $0.02" />
    </TouchableOpacity>
  );
}

function App() {
  return (
    <PaymentRequestProvider uri="https://localhost:3000/payment">
      <Button />
    </PaymentRequestProvider>
  );
}
```

## ✌️ License
[**MIT**](./LICENSE)
