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

import normalize from 'react-native-normalize';

import Char1 from './../assets/img/lendo.png';

import moment from 'moment';

export default function Home (props) {

  const checkMilestone = async () => {
    const date = await AsyncStorage.getItem('date');
    const finished = await AsyncStorage.getItem('finished');

    if ((date !== '' && date !== null) && (finished !== '' && finished !== null)) {
      if (!moment(new Date(date)).isSame(moment(), 'day') && Boolean(finished) === false) {
        props.navigation.replace('Failed');
        return;
      } 
    }

    const number = await AsyncStorage.getItem('number');
    if (number !== '' && number !== null) 
    {
      props.navigation.replace('Milestone');
    }
  }

  useEffect(() => {
    checkMilestone();
  }, [])

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={{fontSize: normalize(25), textAlign: 'center', fontFamily: 'Hero-Regular', color: '#929292'}}>
            Crie uma meta de leitura diária e acompanhe o seu desempenho!
            Ex.: Ler 10 minutos por dia, ler 10 páginas por dia!
          </Text>
        </View>
        <View style={styles.imageContainer}>
          <Image style={styles.image} resizeMode={"stretch"} source={Char1}/>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('CreateMilestone')}>
            <Text style={{fontSize: normalize(24), color: '#F5FCF7', fontFamily: 'Hero-Bold'}}>Criar meta de leitura diaria</Text>
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
    alignItems: 'flex-end',
    padding: normalize(10)
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    margin: normalize(20)
  },
  image: {
    width: normalize(Dimensions.get('screen').width * 0.9),
    height: normalize(Dimensions.get('screen').width * 0.6),
  },
  buttonContainer: {
    flex: 1,
  },
  button: {
    backgroundColor: '#EC6960',
    width: Dimensions.get('screen').width * 0.8,
    height: '30%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  }
});
