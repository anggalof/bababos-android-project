import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import { Card } from 'react-native-elements';

interface TProduct {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  rating: TRating;

}

interface TRating {
  rate: number;
  count: number;
}

interface ProductCardProps {
  product: TProduct;
  onProduct: (id: number) => void;
}

const CardItem: React.FC<ProductCardProps> = ({ product, onProduct }) => {
  return (
    <Card containerStyle={styles.cardContainer}>
      <TouchableOpacity onPress={() => onProduct(product.id)}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <View style={styles.content}>
          <Text numberOfLines={3} style={styles.title}>{product.title}</Text>
          <View style={{ alignSelf: 'flex-start' }}>
            <Text style={styles.category}>{product.category}</Text>
          </View>
          <Text style={styles.price}>${product.price}</Text>
          <View style={styles.container}>
            <View style={styles.container}>
              <Image source={require('../../../../../assets/icons/location.png')} style={{ width: 15, height: 15 }} />
              <Text style={styles.location}>Jakarta</Text>
            </View>
            <View style={{ marginHorizontal: 10, flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="circle" type={IconType.FontAwesome5} size={5} />
            </View>
            <View style={styles.container}>
              <Icon name="star-o" type={IconType.FontAwesome} color="#FFC300" size={14} />
              <Text style={styles.rating}>{product.rating.rate}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    marginHorizontal: 5,
    width: '47%',
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

export default CardItem;
