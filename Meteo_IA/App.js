import { StyleSheet, View, Image, StatusBar } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import ChoisirVille from './components/ChoisirVille';
import MeteoDuJour from './components/MeteoDuJour';
import React, { useState, useEffect } from 'react';
import logo from './assets/favicon.png';


const {REACT_APP_API_KEY, REACT_APP_API_CALL_GEOCODING} = process.env

export default function App() {
  const [isMeteoDuJourLoading, setIsMeteoDuJourLoading] = useState(true);
  const [isMeteoCinqJourLoading, setIsMeteoCinqJourLoading ] = useState(true);

  function toggleLoading (component = '', trueFalse) {
    if (component == '' || component == 'MeteoDuJour') setIsMeteoDuJourLoading(trueFalse);
    if (component == '' || component == 'MeteoCinqJour') setIsMeteoCinqJourLoading(trueFalse);
  }

  const [userLocation, setUserLocation] = useState({
    latitude: 45.750000,
    longitude: 4.850000
  });

  useEffect(()=> {
    getUserLocation();
  }, []);

  function getUserLocation () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          console.log(userLocation);
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    }
    else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  function setCoordinatesByInput (town) {
    let url = REACT_APP_API_CALL_GEOCODING
      .replace('{city_name}', town)
      .replace('{API_key}', REACT_APP_API_KEY);
    console.log(url);
    let response = axios.get(url)
      .then(res => {
          const result = new Object(res.data);
          setUserLocation({
            latitude: result[0].lat,
            longitude: result[0].lon
          })
          console.log(userLocation);
      })
      .catch(e => {
          alert(`On n'a pas trouvé cette ville: ${town}, veuillez re essayer`);
      });
  }

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <View style={styles.container}>
        <View style={ styles.headerContainer }>
          <View style={ styles.appHeader }>
            <Image source={logo} style={ styles.appLogo }/>
            <Text style={ styles.headerText }>
                Prévision météo
            </Text>
          </View>
        </View>
        <ChoisirVille
          setCoordinatesByInput={setCoordinatesByInput}
          getUserLocation={getUserLocation}
          setLoading={toggleLoading}/>
        <MeteoDuJour
          coordinates={userLocation}
          setLoading={toggleLoading}
          isMeteoDuJourLoading={isMeteoDuJourLoading}/>
      </View>
    </ApplicationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  headerContainer: {
    flexDirection: 'row',
    height: '10%'
  },
  appHeader: {
    flex: 1,
    backgroundColor: '#AAD7D9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: 'rgb(54, 9, 93)'
  },
  appLogo: {
    height: '80%',
    pointerEvents: 'none',
    paddingLeft: 10
  },
  headerText: {
    flexDirection: 'column',
    fontSize: 20,
    paddingRight: 5
  }
});
