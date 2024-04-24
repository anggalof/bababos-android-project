import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import { Card } from 'react-native-elements';
import Product from './product';

interface TProduct {
  id: 1;
  date: string;
  products: TProducts[];
}

interface TProducts {
  productId: number;
  quantity: number;
}

interface ProductCardProps {
  cart: TProduct;
  onProduct: (id: number) => void;
}

const CartItem: React.FC<ProductCardProps> = ({ cart, onProduct }) => {
  return (
    <Card containerStyle={styles.cardContainer}>
      <FlatList
        data={cart.products}
        keyExtractor={(item) => item.productId.toString()}
        renderItem={({ item }) => <Product product={item} onProduct={onProduct} />}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    marginHorizontal: 13,
    width: '65%',
  },
  image: {
    height: 120,
    resizeMode: 'contain',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  content: {
    paddingVertical: 12,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
    height: 50,
  },
  category: {
    fontSize: 10,
    marginBottom: 10,
    backgroundColor: '#F0F8FF',
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 5,
    textAlign: 'center',
  },
  price: {
    fontSize: 16,
    marginBottom: 5,
    color: '#000',
  },
  container: {
    flexDirection: 'row',
  },
  location: {
    fontSize: 12,
    marginLeft: 2,
  },
  rating: {
    fontSize: 12,
    marginBottom: 5,
    marginLeft: 5,
  },
});

export default CartItem;
