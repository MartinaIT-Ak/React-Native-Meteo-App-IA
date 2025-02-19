import React, { useEffect, useState } from 'react';
import { Text, Card } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

const {REACT_APP_API_KEY,REACT_APP_API_CALL_CURRENT_WEATHER} = process.env

function MeteoDuJour({coordinates, setLoading, isMeteoDuJourLoading}) {
    const options = {
        month: "long",
        day: "numeric"
    };
    const dateTimeFormat = new Intl.DateTimeFormat("fr-FR", options);

    const [weather, setWeather] = useState({});

    useEffect(() => {
        getMeteo();
    }, [coordinates])

    const getMeteo = async () => {
        let url = REACT_APP_API_CALL_CURRENT_WEATHER
            .replace('{lat}', coordinates.latitude)
            .replace('{lon}', coordinates.longitude)
            .replace('{API_key}', REACT_APP_API_KEY);
        console.log(url);
        let response = await fetch(url)
            .then(res => {
                const weather = new Object(res.data);
                setWeather(weather);
                console.log(weather);
                setTimeout(() => {
                    setLoading('MeteoDuJour', false);
                }, 1000);
            })
            .catch(e => {
                console.log(e);
                setLoading('MeteoDuJour', false);
            });
    }

    return (
        <View style={ styles.meteoDuJour }>
            <Card style={ styles.widget }>
            {isMeteoDuJourLoading ? (
                <Text style={styles.loader}>Loading current weather...</Text>
            ) : Object.keys(weather).length ? (
                    <>
                    <View style={styles.weatherIcon}><Image src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}/></View>
                    <View style={styles.weatherInfo}>
                        <View style={styles.tempDisplay}>
                            <View style={styles.temperature}>
                                <Text>
                                    {Math.floor(weather.main.temp)}&deg;
                                </Text>
                            </View>
                            <View style={styles.realFeel }>RealFeel: {Math.floor(weather.main.feels_like)}&deg;</View>
                        </View>
                        <View style={styles.description }>
                            <View style={styles.weatherCondition }>{weather.weather[0].description}</View>
                            <View style={styles.place }>{weather.name}</View>
                        </View>
                        <View style={styles.date }>{dateTimeFormat.format(Date.now())}</View>
                    </View>
                    </>
                ) : (
                    <Text>No weather reports found!</Text>
                    )}
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    meteoDuJour: {
        minHeight: '425',
        justifyContent: 'center',
        alignItems: 'center'
      },
      widget: {
        background: '#FAFAFA',
        top: '50%',
        left: '50%',
        flexDirection: 'column',
        height: 300,
        width: 600,
        borderRadius: 20,
        boxShadow: '0 27px 55px 0 rgba(0, 0, 0, 0.3), 0 17px 17px 0 rgba(0, 0, 0, 0.15)'
      },
      loader: {
        position: 'relative',
        margin: 'auto',
        fontSize: 20,
        fontStyle: 'italic'
      },
      weatherIcon: {
        flex: 1,
        height: '60%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        background: '#FAFAFA',
        fontFamily: 'weathericons',
        alignItems: 'center',
        justifyContent: 'space-around',
        fontSize: 100
    },
    weatherIconImage: {
        height: 140
    },
    weatherInfo: {
        flex: '0 70%',
        height: '40%',
        background: '#080705',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: 'center',
        color: 'white',
        justifyContent: 'space-around'
      },
      tempDisplay: {
        width: '30%'
      },
      temperature: {
        flex: '0 0 40%',
        width: '100%',
        fontSize: 45,
        justifyContent: 'space-around'
      },
      realFeel: {
        flex: '0 0 40%',
        width: '100%',
        fontSize: 15,
        justifContent: 'space-around',
      },
      description: {
        flex: '0 60%',
        flexdirection: 'column',
        width: '100%',
        height: '100%',
        justifycontent: 'center',
      },
      weatherCondition: {
        textTransform: 'uppercase',
        fontSize: 35,
        fontWeight: 100
      },
      place: {
        fontSize: 15,
      },
      date: {
        flex: '0 0 30%',
        height: '100%',
        background: '#70C1B3',
        borderBottomRightRadius: 20,
        justifyContent: 'space-around',
        alignItems: 'center',
        color: 'white',
        fontSize: 30,
        fontWeight: 800,
      },
      text: {
        position: 'fixed',
        bottom: '0%',
        right: '2%'
      }
})

export default MeteoDuJour;