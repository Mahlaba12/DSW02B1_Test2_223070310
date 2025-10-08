import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validate = () => {
    if (!email || !password) {
      Alert.alert('Validation', 'Please enter email and password');
      return false;
    }
    return true;
  }

  const onLogin = async () => {
    if (!validate()) return;
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      // onAuthStateChanged will navigate
    } catch (err) {
      Alert.alert('Login Error', err.message || 'Error logging in');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" style={styles.input} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <Button title="Login" onPress={onLogin} />
      <View style={{ marginTop: 10 }}>
        <Button title="Register" onPress={() => navigation.navigate('Register')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex:1, justifyContent:'center', backgroundColor:'#fff' },
  input: { borderWidth:1, borderColor:'#ccc', padding:8, borderRadius:6, marginBottom:12 }
});