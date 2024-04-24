import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Card } from 'react-native-elements';

interface TCheckout {
  id: number;
  title: string;
  price: number;
  qty: number;
  image: string;
}

interface ProductCardProps {
  cart: TCheckout;
}

const CartCheckout: React.FC<ProductCardProps> = ({ cart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Card containerStyle={styles.cardContainer}>
      <View style={{ flexDirection: 'row' }}>
        <Image source={{ uri: cart.image }} style={styles.image} />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.title}>{cart.title}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
            <TouchableOpacity onPress={handleDecrement} style={{ paddingHorizontal: 5, borderWidth: 1 }}>
              <Text>-</Text>
            </TouchableOpacity>
            <Text style={{ marginHorizontal: 10 }}>{quantity}</Text>
            <TouchableOpacity onPress={handleIncrement} style={{ paddingHorizontal: 5, borderWidth: 1 }}>
              <Text>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.price}>${cart.price}</Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    width: '95%',
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
    marginVertical: 5,
    color: '#000',
  },
});

export default CartCheckout;
