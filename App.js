// App.js
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { ActivityIndicator, View } from 'react-native';

export default function App() {
  const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState(null);

      useEffect(() => {
          const unsubscribe = onAuthStateChanged(auth, (u) => {
                setUser(u);
                      if (initializing) setInitializing(false);
                          });
                              return unsubscribe;
                                }, []);

                                  if (initializing) {
                                      return (
                                            <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
                                                    <ActivityIndicator size="large" />
                                                          </View>
                                                              );
                                                                }

                                                                  return (
                                                                      <NavigationContainer>
                                                                            <AppNavigator user={user} />
                                                                                </NavigationContainer>
                                                                                  );
                                                                                  }