import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { auth, db } from '../firebase';
import { ref, onValue, set } from 'firebase/database';
import { saveLocalCart, loadLocalCart } from '../utils/storage';
import { Ionicons } from '@expo/vector-icons';

export default function CartScreen() {
  const user = auth.currentUser;
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const cartRef = ref(db, `carts/${user.uid}`);
    const unsub = onValue(cartRef, async (snapshot) => {
      const val = snapshot.val();
      if (val) {
        setCart(val);
        await saveLocalCart(user.uid, val);
      } else {
        const local = await loadLocalCart(user.uid);
        if (local) setCart(local);
      }
      setLoading(false);
    }, (err) => {
      console.warn('cart read err', err);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const items = Object.values(cart || {});
  const total = items.reduce((s, it) => s + (it.price * (it.quantity || 0)), 0);

  const updateQuantity = async (productId, delta) => {
    const current = cart[productId] || null;
    if (!current) return;
    const newQty = (current.quantity || 0) + delta;
    if (newQty <= 0) {
      // remove
      const copy = { ...cart };
      delete copy[productId];
      await set(ref(db, `carts/${user.uid}`), copy);
      await saveLocalCart(user.uid, copy);
      return;
    }
    const updated = { ...cart, [productId]: { ...current, quantity: newQty } };
    await set(ref(db, `carts/${user.uid}`), updated);
    await saveLocalCart(user.uid, updated);
  };

  const renderItem = ({ item }) => {
    const productId = String(item.id || item.productId || item.id);
    return (
      <View style={styles.row}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={{ flex:1 }}>
          <Text numberOfLines={2} style={styles.title}>{item.title}</Text>
          <Text>Price: ${item.price.toFixed(2)}</Text>
          <Text>Subtotal: ${(item.price * item.quantity).toFixed(2)}</Text>
        </View>
        <View style={styles.controls}>
          <TouchableOpacity onPress={() => updateQuantity(productId, 1)} style={styles.qbtn}><Ionicons name="add" size={20} /></TouchableOpacity>
          <Text style={{ marginVertical:4 }}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => updateQuantity(productId, -1)} style={styles.qbtn}><Ionicons name="remove" size={20} /></TouchableOpacity>
        </View>
      </View>
    );
  };

  if (loading) return <View style={{flex:1, justifyContent:'center', alignItems:'center'}}><Text>Loading...</Text></View>;

  return (
    <View style={{ flex:1, padding:12 }}>
      {items.length === 0 ? (
        <View style={{ alignItems:'center', marginTop:40 }}>
          <Text>Your cart is empty</Text>
        </View>
      ) : (
        <>
          <FlatList data={items} keyExtractor={(i, idx) => String(i.id || idx)} renderItem={renderItem} />
          <View style={styles.total}>
            <Text style={{ fontSize:18, fontWeight:'700' }}>Total: ${total.toFixed(2)}</Text>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection:'row', marginBottom:12, padding:8, borderWidth:1, borderColor:'#eee', borderRadius:8, alignItems:'center' },
  image: { width:80, height:80, marginRight:10 },
  title: { fontWeight:'700' },
  controls: { alignItems:'center', justifyContent:'center', width:60 },
  qbtn: { padding:6, borderRadius:6, borderWidth:1, borderColor:'#ccc' },
  total: { padding:12, alignItems:'flex-end' }
});