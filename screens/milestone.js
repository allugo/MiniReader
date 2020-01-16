import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
  ScrollView
} from 'react-native';

import AwesomeAlert from 'react-native-awesome-alerts';

import normalize from 'react-native-normalize';

import {Icon} from 'native-base';

import moment from 'moment';

export default function Milestone (props) {
    const [number, setNumber] = useState(0);
    const [type, setType] = useState(0);
    const [date, setDate] = useState(new Date());
    const [alert, setAlert] = useState(false);
    const [finishAlert, setFinishAlert] = useState(false);

    const getData = async () => {
        const nb = await AsyncStorage.getItem('number');
        await setNumber(parseInt(nb));
        const tp = await AsyncStorage.getItem('type');
        await setType(parseInt(tp));
        const dt = await AsyncStorage.getItem('date');
        await setDate(new Date(dt));
    }

    const goBack = async () => {
        props.navigation.navigate('CreateMilestone');
    }

    const reset = async () => {
      await setAlert(false);

      await AsyncStorage.setItem('number', '');
      await AsyncStorage.setItem('type', '');
      await AsyncStorage.setItem('finished', '');
      await AsyncStorage.setItem('date', '');

      props.navigation.navigate('Home');
    }

    const setWin = async () => {
        await AsyncStorage.setItem('finished', String(true));
        props.navigation.navigate('Finished');
    }

    useEffect(() => {
        getData();
    }, [props.navigation.getParam('number'), props.navigation.getParam('date')])

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.header}>
            <Text 
            style={{flex: 1, fontFamily: 'Cocogoose Pro-trial', fontSize: normalize(20), color: '#091244'}}>
                Meta de Hoje
            </Text>
            <Text 
            style={{flex: 1, textAlign: 'right', fontFamily: 'Hero-Regular', fontSize: normalize(25), color: '#091244'}}>
                {moment(date).format("DD/MM/YYYY")}
            </Text>
        </View>
        <View style={{flex: 0.1, display: 'flex', flexDirection: 'row'}}>
          <View style={{flex: 1.5}}></View>
          <TouchableOpacity 
          style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}
          onPress={() => setAlert(true)}
          >
            <Icon type="Feather" style={{fontSize: normalize(35), color: '#EC6960'}} name="trash-2"/>
          </TouchableOpacity>
        </View>
        <View style={styles.milestoneContainer}>
            <Text style={{fontFamily: 'Hero-Bold', fontSize: normalize(180), color: '#EC6960'}}>
                {number || '0'}
            </Text>
            <Text style={{fontFamily: 'Hero-Bold', fontSize: normalize(50), color: '#6C6C6C'}}>
                {type === 1 ? "Páginas" : 'Minutos'}
            </Text>
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => setFinishAlert(true)} style={styles.button}>
                <Text
                style={{
                    fontSize: normalize(24),
                    color: "#F5FCF7",
                    fontFamily: "Hero-Bold"
                }}
                >
                Já concluiu a meta?
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCancel}
            onPress={() => goBack()}
            >
                <Text
                style={{
                    fontSize: normalize(24),
                    color: "black",
                    fontFamily: "Hero-Bold"
                }}
                >
                Mudar a meta agora
                </Text>
            </TouchableOpacity>
        </View>
      </View>
      <AwesomeAlert 
        show={finishAlert}
        title="Quase lá!"
        message="Só confirmando, você concluiu sua meta mesmo?"
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showConfirmButton
        showCancelButton
        cancelText="Não"
        confirmText="Sim"
        confirmButtonColor="green"
        cancelButtonColor="red"
        titleStyle={{fontSize: 20, fontFamily: 'Hero-Bold'}}
        messageStyle={{fontSize: 18}}
        cancelButtonStyle={{height: 40, width: 100, justifyContent: 'center', alignItems: 'center'}}
        confirmButtonStyle={{height: 40, width: 100, justifyContent: 'center', alignItems: 'center'}}
        confirmButtonTextStyle={{fontFamily: 'Hero-Bold', fontSize: 18}}
        cancelButtonTextStyle={{fontFamily: 'Hero-Bold', fontSize: 18}}
        onCancelPressed={() => {
          setFinishAlert(false);
        }}
        onConfirmPressed={() => setWin()}
      />
      <AwesomeAlert 
        show={alert}
        title="Epa, peraí."
        message="Tem certeza que quer excluir sua meta?"
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showConfirmButton
        showCancelButton
        cancelText="Não"
        confirmText="Sim"
        confirmButtonColor="green"
        cancelButtonColor="red"
        titleStyle={{fontSize: 20, fontFamily: 'Hero-Bold'}}
        messageStyle={{fontSize: 18}}
        cancelButtonStyle={{height: 40, width: 100, justifyContent: 'center', alignItems: 'center'}}
        confirmButtonStyle={{height: 40, width: 100, justifyContent: 'center', alignItems: 'center'}}
        confirmButtonTextStyle={{fontFamily: 'Hero-Bold', fontSize: 18}}
        cancelButtonTextStyle={{fontFamily: 'Hero-Bold', fontSize: 18}}
        onCancelPressed={() => {
          setAlert(false);
        }}
        onConfirmPressed={() => reset()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',//#f5f5f5
    display: 'flex',
    flexDirection: 'column',
    height: Dimensions.get('screen').height,
  },
  header: {
    flex: 0.06,
    borderBottomWidth: 1,
    borderBottomColor: '#D4D4D4',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  milestoneContainer: {
    flex: 0.54,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    flex: 0.4,
    elevation: 10,
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#EC6960',
    width: normalize(Dimensions.get('screen').width * 0.8),
    height: '30%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5
  },
  buttonCancel: {
    backgroundColor: 'transparent',
    width: normalize(Dimensions.get("screen").width * 0.8),
    height: "25%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    marginTop: 20,
  },
});
