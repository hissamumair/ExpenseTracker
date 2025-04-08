// SplashScreen.js
import { Image, StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';

export default function SplashScreen({ navigation }) {
    useEffect(() => {
        const timeout = setTimeout(() => {
          navigation.replace('Onboard1'); // Navigate after 2 seconds
        }, 2000);
    
        return () => clearTimeout(timeout);
      }, []);
    
  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/images/splashlogoo.png')} 
        style={styles.image} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 240,
    height: 240,
    resizeMode: 'contain',
  },
  text: {
    color: 'white',
    marginTop: 20,
    fontSize: 18,
  },
});
