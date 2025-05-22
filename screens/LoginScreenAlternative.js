import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Alternative approach without BlurView
const LoginScreen = ({ navigation, setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (email === 'test@example.com' && password === '123456') {
      await AsyncStorage.setItem('loggedIn', 'true');
      setIsLoggedIn(true);
    } else {
      Alert.alert('Login Failed', 'Incorrect email or password');
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#084c61', '#177e89']} style={StyleSheet.absoluteFill} />
      <View style={styles.glassBox}>
        <Text style={styles.title}>Login</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Email" 
          placeholderTextColor="#ddd"
          onChangeText={setEmail} 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Password" 
          placeholderTextColor="#ddd"
          secureTextEntry 
          onChangeText={setPassword} 
        />
        <Button title="Login" onPress={handleLogin} color="#177e89" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  glassBox: {
    width: '85%',
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: { fontSize: 24, color: '#fff', marginBottom: 20, fontWeight: 'bold' },
  input: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    padding: 15,
    marginBottom: 15,
    color: '#fff',
    borderRadius: 10,
    borderColor: 'rgba(255,255,255,0.3)',
    borderWidth: 1,
  },
});

export default LoginScreen;
