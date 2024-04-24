import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import { Card } from 'react-native-elements';

const ThankYouScreen = ({ navigation }: any) => {
  const handleBack = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 10,
    }}>
      <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Thank You !</Text>
      <Text style={{ fontSize: 12, fontWeight: 'bold', textAlign: 'center', marginVertical: 20 }}>
        Thank you for visiting Bababos.com website and buy to our products.
        You will received an email message shortly
      </Text> 
      <Icon name="check" type={IconType.FontAwesome} size={100} style={{ color: 'green' }} />
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 10 }}>
        Check your email
      </Text>
      <Text style={{ fontSize: 12, textAlign: 'center', color: 'black', fontWeight: '500', marginVertical: 10, paddingHorizontal: 10 }}>
        If you didn't receive any mail please contact
        <Text style={{ color: 'blue', marginLeft: 10 }}> info.bababos@bababos.com</Text>
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleBack}>
        <Text style={styles.buttonText}>Back to home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default ThankYouScreen;