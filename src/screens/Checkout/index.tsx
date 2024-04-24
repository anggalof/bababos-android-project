import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import CartCheckout from './components/cart-checkout';
import { sections } from "../../service/sections";

interface TCheckout {
  id: number;
  title: string;
  price: number;
  qty: number;
  image: string;
}

const Checkout = ({ navigation }: any) => {
  const [checkout, setCheckout] = useState<TCheckout[]>([]);

  useEffect(() => {
    setCheckout(sections?.data?.checkout);
  }, [sections]);

  const handlePay = async () => {
    navigation.navigate('ThankYou');
  };

  if (checkout.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View style={{ width: '95%', justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
      <FlatList
        data={checkout}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CartCheckout cart={item} />}
      />
      <TouchableOpacity style={styles.button} onPress={handlePay}>
        <Text style={styles.buttonText}>Pay</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#E41B17',
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Checkout;
