import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validate = () => {
    if (!email || !password) {
      Alert.alert('Validation', 'Please enter email and password');
      return false;
    }
    // basic email pattern
    const re = /\S+@\S+\.\S+/;
    if (!re.test(email)) {
      Alert.alert('Validation', 'Enter a valid email address');
      return false;
    }
    if (password.length < 6) {
      Alert.alert('Validation', 'Password should be at least 6 characters');
      return false;
    }
    return true;
  }

  const onRegister = async () => {
    if (!validate()) return;
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      // onAuthStateChanged in App will route user
    } catch (err) {
      const msg = err.message || 'Registration error';
      Alert.alert('Registration Error', msg);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" autoCapitalize="none" />
      <Text style={styles.label}>Password</Text>
      <TextInput value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
      <Button title="Register" onPress={onRegister} />
      <View style={{ marginTop: 10 }}>
        <Button title="Have an account? Login" onPress={() => navigation.navigate('Login')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex:1, backgroundColor:'#fff' },
  label: { marginTop: 8 },
  input: { borderWidth:1, borderColor:'#ccc', padding:8, borderRadius:6, marginBottom:8 }
});