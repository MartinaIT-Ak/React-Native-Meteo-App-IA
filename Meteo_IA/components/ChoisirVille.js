import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Input, Button } from '@ui-kitten/components';

function ChoisirVille({setCoordinatesByInput, getUserLocation, setLoading}) {
    const [town, setTown] = useState('');

    function handleInput(town) {
        setLoading('', true);
        setCoordinatesByInput(town);
        setTown('');
    }

    function handleMaPosition() {
        setLoading('', true);
        getUserLocation();
    }

    return(
        <View style={styles.choisirVille}>
            <Input
                style={styles.input}
                value={town}
                onChangeText={e => {setTown(e)}}
                placeholder="Cherchez une ville">
            </Input>
            <Button
                style={[styles.button, styles.btnGo]}
                onPress={() => handleInput(town)}>
                GO
            </Button>
            <Button
                style={[styles.button, styles.btnFindMe]}
                onPress={() => handleMaPosition()}>
                Ma position
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    choisirVille: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '2 0',
      },
      input:  {
        minHeight: '28',
        fontSize: '16',
        borderRadius: '6',
      },
      button: {
        marginLeft: 2,
        minHeight: 32,
        fontSize: 16,
        borderRadius: 6
      },
      btnGo: {
        backgroundColor: 'rgb(30, 135, 30)',
        color: 'azure',
        border: '1 solid rgb(2, 65, 2)',
      },
      btnFindMe: {
        backgroundColor: 'rgb(26, 25, 91)',
        color: 'azure',
        border: '1 rgb(13, 9, 0)',
      }
})

export default ChoisirVille;