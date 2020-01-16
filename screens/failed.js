import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
  Image
} from 'react-native';

import Char2 from './../assets/img/triste.png';

import normalize from 'react-native-normalize';

export default function Failed (props) {

    const goBack = async () => {
        console.warn('going');

        await AsyncStorage.setItem('number', '');
        await AsyncStorage.setItem('type', '');
        await AsyncStorage.setItem('finished', '');
        await AsyncStorage.setItem('date', '');

        console.warn('home');

        props.navigation.navigate('Home');
    }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={{fontSize: normalize(28), textAlign: 'center', fontFamily: 'Cocogoose Pro-trial', color: 'red'}}>
              Poxa vida, oh dear!
          </Text>
          <Text style={{fontSize: normalize(20), textAlign: 'center', fontFamily: 'Hero-Regular', color: '#929292'}}>
            Meu caro leitor, infelizmente você não atingiu sua meta de ontem... Sei que você se esforçou, {""}
            <Text style={{fontSize: normalize(20), textAlign: 'center', fontFamily: 'Hero-Bold', color: 'red'}}>
            então tente novamente! ;(
            </Text>
          </Text>
        </View>
        <View style={styles.imageContainer}>
          <Image style={styles.image} resizeMode={"stretch"} source={Char2}/>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={async () => await goBack()}>
            <Text style={{fontSize: normalize(24), color: '#F5FCF7', fontFamily: 'Hero-Bold'}}>Tudo bem...</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',//#f5f5f5
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height,
    padding: normalize(20)
  },
  textContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: normalize(10)
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    margin: normalize(80)
  },
  image: {
    width: normalize(Dimensions.get('screen').width * 0.4),
    height: normalize(Dimensions.get('screen').height * 0.4),
  },
  buttonContainer: {
    flex: 1,
  },
  button: {
    backgroundColor: '#EC6960',
    width: normalize(Dimensions.get('screen').width * 0.8),
    height: '30%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  }
});
