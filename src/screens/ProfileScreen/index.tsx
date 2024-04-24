import React, { useState, useEffect } from 'react';
import { View, Image, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sections } from "../../service/sections";

interface TProfile {
  image_url: string,
  company_name: string,
  address: string,
  company_information: string
}

const ProfileScreen = ({ navigation }: any) => {
  const [profile, setProfile] = useState<TProfile>({
    image_url: "",
    company_name: "",
    address: "",
    company_information: ""
  });

  useEffect(() => {
    setProfile(sections?.data?.profile);
  }, [sections]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("isLoggedIn");
    navigation.navigate('Login');
  };

  if (Object.keys(profile).length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Image
        source={require('../../../assets/bababos-logo.png')}
        style={{ width: 150, height: 80 }}
      />
      <Card containerStyle={styles.cardContainer}>
        <Image source={require("../../../assets/office.png")} style={styles.image} />
        <Text style={styles.title}>{profile.company_name}</Text>
        <Text style={styles.line} />
        <Text style={styles.infoTitle}>Address</Text>
        <Text style={styles.infoDesc}>{profile.address}</Text>
        <Text style={styles.line} />
        <Text style={styles.infoTitle}>Company Information</Text>
        <Text style={styles.infoDesc}>{profile.company_information}</Text>
      </Card>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
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
    marginTop: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    height: 120,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 15,
    textAlign: 'center'
  },
  line: { backgroundColor: '#ccc', height: 1, marginHorizontal: 8, marginVertical: 20 },
  infoTitle: { fontSize: 18, marginBottom: 8 },
  infoDesc: { fontSize: 14 },
  button: {
    backgroundColor: '#22A9E2',
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

export default ProfileScreen;