import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function ProductItem({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(item)}>
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
      <View style={styles.info}>
        <Text numberOfLines={2} style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderColor:'#eee', alignItems:'center'
  },
  image: { width: 80, height: 80, marginRight: 10 },
  info: { flex:1 },
  title: { fontSize: 14, marginBottom:6 },
  price: { fontWeight:'700' }
});