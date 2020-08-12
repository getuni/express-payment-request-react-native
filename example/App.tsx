import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
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

export default function App() {
  return (
    <PaymentRequestProvider uri="https://www.cawfree.com/payment">
      <View style={styles.container}>
        <Button />
        <StatusBar style="auto" />
      </View>
    </PaymentRequestProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});