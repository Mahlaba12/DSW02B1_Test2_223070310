
import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveLocalCart = async (uid, cart) => {
  try {
      await AsyncStorage.setItem(`cart_${uid}`, JSON.stringify(cart));
        } catch (err) {
            console.warn("Error saving local cart:", err);
              }
              };

              export const loadLocalCart = async (uid) => {
                try {
                    const json = await AsyncStorage.getItem(`cart_${uid}`);
                        return json ? JSON.parse(json) : null;
                          } catch (err) {
                              console.warn("Error loading local cart:", err);
                                  return null;
                                    }
                                    };

                                    export const clearLocalCart = async (uid) => {
                                      try {
                                          await AsyncStorage.removeItem(`cart_${uid}`);
                                            } catch (err) {
                                                console.warn("Error clearing local cart:", err);
                                                  }
                                                  };