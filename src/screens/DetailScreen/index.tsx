import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import { Card } from 'react-native-elements';
import axios from 'axios';

interface TProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: TRating;
}

interface TRating {
  rate: number;
  count: number;
}

interface DetailScreenProps {}

const DetailScreen: React.FC<DetailScreenProps> = ({ navigation, route }: any) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [productDetail, setProductDetail] = useState<TProduct>({
    id: 0, title: "", price: 0, description: "", category: "", image: "", rating: {
      rate: 0,
      count: 0,
    }
  });
  const { id } = route.params;

  useEffect(() => {
    fetchProductDetail();
  }, []);

  const fetchProductDetail = async () => {
    try {
      const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
      setProductDetail(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    navigation.navigate('Checkout');
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View>
      <Card containerStyle={styles.cardContainer}>
        <ScrollView style={{ height: 550 }}>
          <Image source={{ uri: productDetail.image }} style={styles.image} />
          <View style={styles.content}>
            <Text numberOfLines={3} style={styles.title}>{productDetail.title}</Text>
            <Text style={styles.price}>${productDetail.price}</Text>
            <Text style={styles.tab}>Information</Text>
            <View style={styles.contentInfo}>
              <Image source={require('../../../assets/icons/icon-verified.png')} style={{ width: 14, height: 14 }} />
              <Text style={{ fontSize: 12, fontWeight: 'bold', marginLeft: 3, marginBottom: 10 }}>
                Safe and Reliable Transactions at Bababos
              </Text>
            </View>
            <View style={{ alignSelf: 'flex-start' }}>
              <Text style={styles.category}>{productDetail.category}</Text>
            </View>
            <View style={styles.contentInfo}>
              <Text style={{ fontSize: 12, fontWeight: 'bold', width: 65 }}>Condition</Text>
              <Text style={{ fontSize: 12, fontWeight: 'bold' }}>: New</Text>
            </View>
            <View style={styles.contentInfo}>
              <Text style={{ fontSize: 12, fontWeight: 'bold', width: 65 }}>Warranty</Text>
              <Text style={{ fontSize: 12 }}>: Claims are available if there is an unboxing video</Text>
            </View>
            <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.contentInfo}>
                <Image source={require('../../../assets/icons/location.png')} style={{ width: 15, height: 15 }} />
                <Text style={styles.location}>Jakarta</Text>
              </View>
              <View style={{ marginHorizontal: 10 }}>
                <Icon name="circle" type={IconType.FontAwesome5} size={5} />
              </View>
              <View style={styles.contentInfo}>
                <Icon name="star-o" type={IconType.FontAwesome} color="#FFC300" size={16} />
                <Text style={styles.rating}>{productDetail.rating.rate}</Text>
              </View>
            </View>
            <Text style={styles.line} />
            <Text style={styles.description}>{productDetail.description}</Text>
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
          <Icon name="shopping-basket" type={IconType.FontAwesome} color="#FFC300" size={16} />
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    marginHorizontal: 10,
    width: '95%',
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  content: {
    paddingVertical: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    height: 50,
  },
  price: {
    fontSize: 28,
    color: '#000',
  },
  tab: {
    fontSize: 14,
    fontWeight: "bold",
    color: '#087198',
    borderBottomColor: "#087198",
    borderBottomWidth: 1,
    marginVertical: 20,
  },
  contentInfo: {
    flexDirection: 'row',
  }, 
  category: {
    fontSize: 12,
    marginBottom: 10,
    backgroundColor: '#F0F8FF',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    textAlign: 'center',
  },
  line: { backgroundColor: '#ccc', height: 1, marginHorizontal: 8, marginVertical: 20 },
  description: {
    fontSize: 12,
  },
  location: {
    fontSize: 12,
    marginLeft: 2,
    paddingBottom: 5,
  },
  rating: {
    fontSize: 12,
    marginBottom: 5,
    marginLeft: 5,
  },
  button: {
    backgroundColor: '#22A9E2',
    flexDirection: 'row',
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default DetailScreen;
