import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button, Alert } from 'react-native';
import { auth, db } from '../firebase';
import { ref, set, onValue, update } from 'firebase/database';
import { saveLocalCart, loadLocalCart } from '../utils/storage';

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params;
  const [cart, setCart] = useState({}); // object keyed by productId
  const user = auth.currentUser;

  useEffect(() => {
    // load cart from realtime db and fallback to local
    if (!user) return;
    const cartRef = ref(db, `carts/${user.uid}`);
    const unsub = onValue(cartRef, async (snapshot) => {
      const val = snapshot.val();
      if (val) {
        setCart(val);
        await saveLocalCart(user.uid, val);
      } else {
        // try local
        const local = await loadLocalCart(user.uid);
        if (local) setCart(local);
      }
    }, (err) => {
      console.warn('db cart read error', err);
    });

    return () => unsub();
  }, []);

  const addToCart = async () => {
    if (!user) {
      Alert.alert('Not logged in', 'Please login to add items to cart.');
      return;
    }
    try {
      const productId = String(product.id);
      const existing = cart[productId] || { ...product, quantity: 0 };
      const updated = { ...cart, [productId]: { ...existing, quantity: (existing.quantity || 0) + 1 } };

      // update Realtime DB
      await set(ref(db, `carts/${user.uid}`), updated);
      // local saved through listener or persist separately
      await saveLocalCart(user.uid, updated);
      Alert.alert('Added', `${product.title} added to cart`);
    } catch (err) {
      Alert.alert('Error', 'Failed to add to cart');
      console.warn(err);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      <Text style={styles.desc}>{product.description}</Text>
      <Button title="Add to Cart" onPress={addToCart} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding:16, flex:1, backgroundColor:'#fff' },
  image: { width: '100%', height: 300, marginBottom: 12 },
  title: { fontSize:18, fontWeight:'700', marginBottom:8 },
  price: { fontSize:16, marginBottom:8 },
  desc: { marginBottom:16 }
});