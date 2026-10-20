import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MyFAB from './components/FAB';
import * as React from 'react';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function App() {
  const [cities, setCities] = React.useState([])
  const [loaded, setLoaded] = React.useState(false)

  const INITIAL_REGION = {
    latitude: 65,
    longitude: 26,
    latitudeDelta: 12,
    longitudeDelta: 14,
  }
  // load on appstart
  React.useEffect(() => {
    const loadSavedCities = async () => {
      try { 
        const saved = await AsyncStorage.getItem('cities')
        if (saved !== null) {
          const parsedCities = JSON.parse(saved)
          console.log("Loaded saved cities:", parsedCities)
          setCities(parsedCities)
        }
      } catch (error) {
        console.log("Error loading cities:", error)
      } finally {
        setLoaded(true)
      }
    }
    loadSavedCities()
  }, [])

  // save to asyncstorage when list changes
  React.useEffect(() => {
    if (!loaded) return
    const savedCities = async () => {
      try {
        await AsyncStorage.setItem('cities', JSON.stringify(cities))
        console.log("Saved cities:", cities)
      } catch (error) {
        console.log("Error savins cities:", error)
      }
    }
    savedCities()
  }, [cities, loaded])

  async function handleAddItem(city) {
    if (!city.trim()) return
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          city: city,
          format: 'json',
          limit: 1
        },
        headers: {
          'User-Agent': 'MyApp/1.0' // Nominatim requires a User-Agent
        }
      });

      if (response.data.length === 0) {
        console.log('City not found')
        return;
      }

      const { lat, lon, display_name } = response.data[0]
      setCities(prev => [...prev, { name: city, lat: parseFloat(lat), lon: parseFloat(lon) }])
      //setText("")
    } catch (error) {
      console.error('Failed to fetch coordinates:', error)
    }
  }

  return (
    <View style={styles.container}>
      <MapView 
        key="finland-map"
        style={styles.map} 
        region={INITIAL_REGION}
      >
        {cities.map((city, index) => (
          <Marker
          key={index}
          coordinate={{ latitude: city.lat, longitude: city.lon}}
          title={city.name}
          />
        ))}
      </MapView>
      <MyFAB onAddCity={handleAddItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%'
  }
});
