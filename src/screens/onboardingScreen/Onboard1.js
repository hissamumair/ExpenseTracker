import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

const { width, height } = Dimensions.get('window');

// You would replace these with your actual local image paths
// Example: require('./assets/images/expense_image.png')
const OnboardingScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const slides = [
    {
      id: '1',
      title: 'Note Down Expenses',
      description: 'Daily note your expenses to help manage money',
      image: require('../../assets/images/onboardlogo1.png'), // Replace with actual path
    },
    {
      id: '2',
      title: 'Simple Money Management',
      description: 'Get your notifications or alert when you do the over expenses',
      image: require('../../assets/images/onboardlogo1.png'), // Replace with actual path
    },
    {
      id: '3',
      title: 'Easy to Track and Analize',
      description: 'Tracking your expense help make sure you don\'t overspend',
      image: require('../../assets/images/onboardlogo1.png'), // Replace with actual path
    },
  ];

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const scrollToNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      // Navigate to the main app
      // Replace 'Home' with your actual home screen name
      navigation.replace('Home');
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0F1A" />
      
      {/* Logo */}
      <View style={styles.logoContainer}>
        <View style={styles.logoIconContainer}>
          <Image 
            source={require('../../assets/images/onboardlogo1.png')} // Replace with actual logo icon
            style={styles.logoIcon} 
          />
        </View>
        <Text style={styles.logoText}>monex</Text>
      </View>
      
      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      
      {/* Pagination dots */}
      <View style={styles.pagination}>
        {slides.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === currentIndex ? styles.activeDot : styles.inactiveDot
            ]}
          />
        ))}
      </View>
      
      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={scrollToNext}>
        <Text style={styles.buttonText}>LET'S GO</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F1A',
    paddingTop: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  logoIconContainer: {
    marginRight: 10,
  },
  logoIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  logoText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  slide: {
    width,
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  image: {
    width: width * 0.7,
    height: height * 0.4,
    resizeMode: 'contain',
    marginVertical: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#8C8C8C',
    textAlign: 'center',
    lineHeight: 24,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  activeDot: {
    width: 25,
    backgroundColor: '#2E5BFF',
  },
  inactiveDot: {
    backgroundColor: '#555555',
  },
  button: {
    backgroundColor: '#2E5BFF',
    marginHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OnboardingScreen;