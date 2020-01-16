import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  View,
  Text,
  Image,
  AsyncStorage
} from 'react-native';

import moment from 'moment';

import normalize from 'react-native-normalize';

import Char2 from './../assets/img/relaxando.png';

export default function Finished (props) {
    const checkDate = async () => {
        const date = await AsyncStorage.getItem('date');
        
        // Checking if it is another day.
        if (!moment(new Date(date)).isSame(moment(), 'day')) {
            await AsyncStorage.setItem('number', '');
            await AsyncStorage.setItem('type', '');
            await AsyncStorage.setItem('finished', '');
            await AsyncStorage.setItem('date', '');

            props.navigation.navigate('Home');
        }
    }

    useEffect(() => {
        checkDate();
    }, [])

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={{fontSize: normalize(28), textAlign: 'center', fontFamily: 'Cocogoose Pro-trial', color: '#081340'}}>
              Meta do dia concluída!
          </Text>
          <Text style={{fontSize: normalize(20), textAlign: 'center', fontFamily: 'Hero-Regular', color: '#929292'}}>
            Parabéns, meu caro leitor. Hoje você conseguiu dar mais um passo rumo aos seus objetivos e ao
            conhecimento eterno!{" "}
            <Text style={{fontSize: normalize(20), textAlign: 'center', fontFamily: 'Hero-Bold', color: '#929292'}}>
            Agora pode relaxar ;)
            </Text>
          </Text>
        </View>
        <View style={styles.imageContainer}>
          <Image style={styles.image} resizeMode={"stretch"} source={Char2}/>
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
    width: normalize(Dimensions.get('screen').width * 0.7),
    height: normalize(Dimensions.get('screen').height * 0.3),
  },
});
