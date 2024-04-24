import React, { useState, useEffect } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      navigation.navigate('Home');
    }
  };

  const handleLogin = async () => {
    if (username === 'admin' && password === 'password') {
      const isLoggedIn = "true";
      await AsyncStorage.setItem("isLoggedIn", isLoggedIn);
      navigation.navigate('Home');
    } else {
      console.log('Login failed because invalid username & password');
    }
  };

  const handleForgetPassword = () => {
    console.log('Forget password!');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/bababos-logo.png')}
        style={{ width: 200, height: 200 }}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={text => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleForgetPassword}>
        <Text style={styles.forgetPassword}>Forget Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#22A9E2',
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgetPassword: {
    marginTop: 10,
    color: '#007bff',
    textDecorationLine: 'none',
  },
});

export default LoginScreen;