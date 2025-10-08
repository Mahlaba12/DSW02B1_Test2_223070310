import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button, Alert } from 'react-native';
import axios from 'axios';
import ProductItem from '../components/ProductItem';
import Loader from '../components/Loader';
import { Ionicons } from '@expo/vector-icons';
import { auth, db } from '../firebase';
import { ref, onValue, set } from 'firebase/database';
import { signOut } from 'firebase/auth';

export default function ProductListScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection:'row' }}>
          <TouchableOpacity style={{ marginRight: 12 }} onPress={() => navigation.navigate('Cart')}>
            <Ionicons name="cart-outline" size={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            signOut(auth).catch(err => Alert.alert('Logout failed', err.message));
          }}>
            <Ionicons name="log-out-outline" size={24} style={{ marginRight: 8 }} />
          </TouchableOpacity>
        </View>
      )
    });
  }, [navigation]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const [pRes, cRes] = await Promise.all([
          axios.get('https://fakestoreapi.com/products'),
          axios.get('https://fakestoreapi.com/products/categories')
        ]);
        setProducts(pRes.data);
        setAllProducts(pRes.data);
        setCategories(['All', ...cRes.data]);
      } catch (err) {
        Alert.alert('Error', 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const onSelectProduct = (item) => {
    navigation.navigate('ProductDetail', { product: item });
  };

  const filterBy = (cat) => {
    if (cat === 'All') setProducts(allProducts);
    else setProducts(allProducts.filter(p => p.category === cat));
  };

  if (loading) return <Loader />;

  return (
    <View style={{ flex:1 }}>
      <View style={styles.categories}>
        <FlatList
          horizontal
          data={categories}
          keyExtractor={(i) => i}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.catBtn} onPress={() => filterBy(item)}>
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <FlatList
        data={products}
        keyExtractor={(i) => String(i.id)}
        renderItem={({ item }) => <ProductItem item={item} onPress={onSelectProduct} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  categories: { paddingVertical: 8, borderBottomWidth:1, borderColor:'#eee', backgroundColor:'#fafafa' },
  catBtn: { paddingHorizontal:12, paddingVertical:8, marginHorizontal:6, backgroundColor:'#fff', borderRadius:20, borderWidth:1, borderColor:'#ddd' }
});