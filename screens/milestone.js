import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

import moment from 'moment';

export default function Milestone (props) {
    const [number, setNumber] = useState(0);
    const [type, setType] = useState(0);
    const [date, setDate] = useState(new Date());

    const getData = async () => {
        const nb = await AsyncStorage.getItem('number');
        await setNumber(parseInt(nb));
        const tp = await AsyncStorage.getItem('type');
        await setType(parseInt(tp));
        const dt = await AsyncStorage.getItem('date');
        await setDate(new Date(dt));
    }

    useEffect(() => {
        getData();
    }, [])

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.header}>
            <Text 
            style={{flex: 1, fontFamily: 'Cocogoose Pro-trial', fontSize: 20, color: '#091244'}}>
                Meta de Hoje
            </Text>
            <Text 
            style={{flex: 1, textAlign: 'right', fontFamily: 'Hero-Regular', fontSize: 25, color: '#091244'}}>
                {moment(date).format("DD/MM/YYYY")}
            </Text>
        </View>
        <View style={styles.milestoneContainer}>
            <Text style={{fontFamily: 'Hero-Bold', fontSize: 180, color: '#EC6960'}}>
                {number}
            </Text>
            <Text style={{fontFamily: 'Hero-Bold', fontSize: 50, color: '#6C6C6C'}}>
                {type === 1 ? "Páginas" : 'Minutos'}
            </Text>
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => create()} style={styles.button}>
                <Text
                style={{
                    fontSize: 24,
                    color: "#F5FCF7",
                    fontFamily: "Hero-Bold"
                }}
                >
                Já concluiu a meta?
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCancel}
            onPress={() => props.navigation.navigate('Home')}
            >
                <Text
                style={{
                    fontSize: 24,
                    color: "black",
                    fontFamily: "Hero-Bold"
                }}
                >
                Mudar a meta agora
                </Text>
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
    width: Dimensions.get('screen').width * 0.8,
    height: '30%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5
  },
  buttonCancel: {
    backgroundColor: 'transparent',
    width: Dimensions.get("screen").width * 0.8,
    height: "25%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    marginTop: 20,
  },
});
