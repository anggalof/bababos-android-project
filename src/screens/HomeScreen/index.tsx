import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import CardItem from './components/card-item';

const HomeScreen: React.FC = ({ navigation }: any) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    checkLoginStatus();
    fetchProducts();
  }, []);

  const checkLoginStatus = async () => {
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
      navigation.navigate('Login');
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products/');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProduct = async (id: number) => {
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
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Product List</Text>
      <Text style={{ fontSize: 16, color: '#000000', marginTop: 8 }}>Hard to choose right products for your need?</Text>
      <Text style={{ fontSize: 12, color: '#002A48', marginBottom: 8 }}>Take a look at some of our products</Text>
      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CardItem product={item} onProduct={handleProduct} />}
      />
      <View style={{
        borderWidth: 1,
        flexDirection: 'row',
        borderRadius: 15,
        borderColor: '#000',
        marginTop: 10,
        marginHorizontal: 10,
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
      }}>
        <Text style={{ marginRight: 5, color: "#000" }}>View more</Text>
        <Icon name="chevron-right" type={IconType.FontAwesome5} color="#000" size={14} />
      </View>
    </View>
  );
};

export default HomeScreen;
