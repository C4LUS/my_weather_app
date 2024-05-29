import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

const App = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);

    const fecthWeather = async () => {
        const apiKey = "039fbaa08ee5bf78e6aefc4c88c1af9d";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.cod === 200) {
              setWeather ({
                temp: data.main.temp,
                condition: data.weather[0].description,
              });
            } else {
              alert('City not found');
            }
        } catch(error) {
          console.log(error);
        }
    };

    return (
      <View style={styles.container}>
          <Text style={styles.title}>My weather app</Text>
          <TextInput 
              style={styles.input}
              placeholder="Enter city name"
              value={city}
              onChangeText={setCity}
          />
          <Button title="Get Weather" onPress={fecthWeather} />
          {weather && (
            <View style={styles.weatherInfo}>
                <Text>Temperature: {weather.temp}°C</Text>
                <Text>Condition: {weather.condition}</Text>
            </View>
          )}
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    width: '100%',
    marginBottom: 20,
  },
  weatherInfo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  }
});

export default App;