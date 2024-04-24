import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Card } from 'react-native-elements';
import axios from 'axios';

interface TProduct {
  productId: number;
  quantity: number;
}

interface ProductCardProps {
  product: TProduct;
  onProduct: (id: number) => void;
}

const Product: React.FC<ProductCardProps> = ({ product, onProduct }: any) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [cartProduct, setCartProduct] = useState<any>({});

  useEffect(() => {
    fetchCarts();
  }, []);

  const fetchCarts = async () => {
    try {
      const response = await axios.get(`https://fakestoreapi.com/products/${product.productId}`);
      setCartProduct(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <Card containerStyle={styles.cardContainer}>
      <TouchableOpacity onPress={() => onProduct(cartProduct.id)}>
        <View style={{ flexDirection: 'row' }}>
          <Image source={{ uri: cartProduct.image }} style={styles.image} />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.title}>{cartProduct.title}</Text>
            <Text style={styles.price}>${cartProduct.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    marginHorizontal: 10,
  },
  container: {
    flexDirection: 'row',
  },
  image: {
    width: 50,
    resizeMode: 'contain',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
    width: 220,
  },
  price: {
    fontSize: 16,
    marginBottom: 5,
    color: '#000',
  },
});

export default Product;
