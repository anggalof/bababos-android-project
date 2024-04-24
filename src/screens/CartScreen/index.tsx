import React, { useState, useEffect } from 'react';
import { View, Image, Text, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import CartItem from './components/cart-item';

const CartScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [carts, setCarts] = useState<any[]>([]);

  useEffect(() => {
    fetchCarts();
  }, []);

  const fetchCarts = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/carts/');
      setCarts(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProduct = async (id: number) => {
    console.log('id', id);
    navigation.navigate('Detail', { id });
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20, paddingBottom: 20 }}>
      <Text style={{ fontSize: 20, marginTop: 20, marginBottom: 10, fontWeight: 'bold' }}>My Cart</Text>
      <FlatList
        data={carts}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CartItem cart={item} onProduct={handleProduct} />}
      />
    </View>
  );
};

export default CartScreen;