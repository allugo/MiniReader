import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

export default function Home (props) {

  const checkMilestone = async () => {
    const number = await AsyncStorage.getItem('number');
    if (number) {
      props.navigation.navigate('Milestone');
    }
  }

  useEffect(() => {
    checkMilestone();
  }, [])

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={{fontSize: 25, textAlign: 'center', fontFamily: 'Hero-Regular', color: '#929292'}}>
            Crie uma meta de leitura diária e acompanhe o seu desempenho!
            Ex.: Ler 10 minutos por dia, ler 10 páginas por dia!
          </Text>
        </View>
        <View style={styles.imageContainer}>
          <Text>IMAGEM</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('CreateMilestone')}>
            <Text style={{fontSize: 24, color: '#F5FCF7', fontFamily: 'Hero-Bold'}}>Criar meta de leitura diaria</Text>
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
    padding: 20
  },
  textContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 10
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  buttonContainer: {
    flex: 1,
    elevation: 10,
  },
  button: {
    backgroundColor: '#EC6960',
    width: Dimensions.get('screen').width * 0.8,
    height: '30%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
