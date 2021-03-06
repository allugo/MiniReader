import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Picker,
  AsyncStorage,
} from "react-native";

import RNPickerSelect from 'react-native-picker-select';
import AwesomeAlert from 'react-native-awesome-alerts';

import normalize from 'react-native-normalize';

export default function CreateMilestone(props) {
    const [pressed, setPressed] = useState(styles.textInput);
    const [number, setNumber] = useState(0);
    const [type, setType] = useState(0);
    const [alert, showAlert] = useState(false);

    const create = async () => {
        if (number === 0 || type === 0)
        {
            await showAlert(true);
        } 
        else 
        {
            await AsyncStorage.setItem('number', String(number));
            await AsyncStorage.setItem('type', String(type));
            console.warn(String(false));
            await AsyncStorage.setItem('finished', String(false));
            await AsyncStorage.setItem('date', String(new Date()));

            props.navigation.navigate('Milestone', {number: number});
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
            <View style={styles.inputContainer}>
            <Text
                style={{
                fontSize: normalize(25),
                textAlign: "center",
                fontFamily: "Hero-Regular",
                color: "#929292"
                }}
            >
                Coloque o número aqui:
            </Text>
            <TextInput
                keyboardType="number-pad"
                style={pressed}
                onFocus={() => setPressed(styles.textInputFocus)}
                onBlur={() => setPressed(styles.textInput)}
                onChangeText={(txt) => setNumber(parseInt(txt))}
            />
            </View>
            <View style={styles.imageContainer}>
            <Text
                style={{
                fontSize: normalize(25),
                textAlign: "center",
                fontFamily: "Hero-Regular",
                color: "#929292"
                }}
            >
                Selecione o tipo de meta:
            </Text>
            <RNPickerSelect
                placeholder={{label: "Ex: Páginas ou minutos / dia", value: 0}}
                style={picker}
                
                useNativeAndroidPickerStyle={false}
                onValueChange={(value) => setType(value)}
                items={[
                    { label: 'Páginas', value: '1' },
                    { label: 'Minutos', value: '2' },
                ]}
                
                />
            </View>
            <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => create()} style={styles.button}>
                <Text
                style={{
                    fontSize: normalize(24),
                    color: "#F5FCF7",
                    fontFamily: "Hero-Bold"
                }}
                >
                Cadastrar meta de leitura
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCancel}
            onPress={async () => {
              const number = await AsyncStorage.getItem('number');

              if (number) {
                props.navigation.navigate('Milestone');
              } else {
                props.navigation.navigate('Home');
              }
            }}
            >
                <Text
                style={{
                    fontSize: normalize(24),
                    color: "black",
                    fontFamily: "Hero-Bold"
                }}
                >
                Cancelar
                </Text>
            </TouchableOpacity>
            </View>
        </View>
        <AwesomeAlert 
            show={alert}
            title="Epa, peraí."
            message="Você esqueceu de preencher alguma coisa. Confere aí."
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showConfirmButton={true}
            confirmText="Certo"
            confirmButtonColor="green"
            titleStyle={{fontSize: 20, fontFamily: 'Hero-Bold'}}
            messageStyle={{fontSize: 18}}
            confirmButtonStyle={{height: 40, width: 100, justifyContent: 'center', alignItems: 'center'}}
            confirmButtonTextStyle={{fontFamily: 'Hero-Bold', fontSize: 18}}
            onConfirmPressed={() => {
            showAlert(false);
          }}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5", //#f5f5f5
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get("screen").height,
    padding: 20
  },
  inputContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 10
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center"
  },
  buttonContainer: {
    flex: 1.2,
    elevation: 10
  },
  button: {
    backgroundColor: "#EC6960",
    width: normalize(300),
    height: normalize(60),
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonCancel: {
    width: normalize(300),
    height: normalize(60),
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    marginTop: normalize(20)
  },
  textInput: {
    width: normalize(Dimensions.get("screen").width * 0.8),
    height: normalize(80),
    justifyContent: "center",
    alignItems: "center",
    fontSize: 50,
    fontFamily: "Hero-Bold",
    textAlign: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#929292",
    color: '#EB6D5E'
  },
  textInputFocus: {
    width: normalize(Dimensions.get("screen").width * 0.8),
    height: normalize(80),
    justifyContent: "center",
    alignItems: "center",
    fontSize: 50,
    fontFamily: "Hero-Bold",
    textAlign: "center",
    borderBottomWidth: 4,
    borderBottomColor: "#EB6D5E",
    color: '#EB6D5E'
  },
});

const picker = StyleSheet.create({
    inputAndroid: {
        width: Dimensions.get("screen").width * 0.8,
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 20,
        paddingRight: 20,
        padding: 15,
        margin: 5
    },
    inputIOS: {
        width: Dimensions.get("screen").width * 0.8,
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 20,
        paddingRight: 20,
        padding: 15,
        margin: 5
    }
})
