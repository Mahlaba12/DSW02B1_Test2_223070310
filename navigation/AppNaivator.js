// navigation/AppNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator({ user }) {
  return (
      <Stack.Navigator>
            {user ? (
                    <>
                              <Stack.Screen
                                          name="Products"
                                                      component={ProductListScreen}
                                                                  options={{ title: 'ShopEZ Products' }}
                                                                              initialParams={{ user }}
                                                                                        />
                                                                                                  <Stack.Screen
                                                                                                              name="ProductDetail"
                                                                                                                          component={ProductDetailScreen}
                                                                                                                                      options={{ title: 'Product Details' }}
                                                                                                                                                />
                                                                                                                                                          <Stack.Screen
                                                                                                                                                                      name="Cart"
                                                                                                                                                                                  component={CartScreen}
                                                                                                                                                                                              options={{ title: 'Your Cart' }}
                                                                                                                                                                                                        />
                                                                                                                                                                                                                </>
                                                                                                                                                                                                                      ) : (
                                                                                                                                                                                                                              <>
                                                                                                                                                                                                                                        <Stack.Screen
                                                                                                                                                                                                                                                    name="Login"
                                                                                                                                                                                                                                                                component={LoginScreen}
                                                                                                                                                                                                                                                                            options={{ title: 'Login to ShopEZ' }}
                                                                                                                                                                                                                                                                                      />
                                                                                                                                                                                                                                                                                                <Stack.Screen
                                                                                                                                                                                                                                                                                                            name="Register"
                                                                                                                                                                                                                                                                                                                        component={RegisterScreen}
                                                                                                                                                                                                                                                                                                                                    options={{ title: 'Register' }}
                                                                                                                                                                                                                                                                                                                                              />
                                                                                                                                                                                                                                                                                                                                                      </>
                                                                                                                                                                                                                                                                                                                                                            )}
                                                                                                                                                                                                                                                                                                                                                                </Stack.Navigator>
                                                                                                                                                                                                                                                                                                                                                                  );
                                                                                                                                                                                                                                                                                                                                                                  }