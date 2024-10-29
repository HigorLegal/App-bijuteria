import React, { useState } from "react";
import {
  Alert,
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { Anel } from "../types/anel.ts";
import {
    CadPersoprops,
  
} from "../navigation/HomeNavigator.tsx";
import { styles } from "../styles/stylesPrincipal.ts";
import firestore from "@react-native-firebase/firestore";

const TelaCadPerso = (props: CadPersoprops) => {
  const [id, setId] = useState("");
  const [material, setMaterial] = useState("");
  const [tamanho, settamanho] = useState("");

  
  function cadastrar() {
    if (verificaCampos()) {

      let anel = {
        material: material,
        clienteEmail: props.route.params.usu.email,
    nome: id ,
tamanho: parseInt(tamanho)
        
      } as Anel;

      firestore()
        .collection("AnelPerso")
        .add(anel)
        .then(() => {
          Alert.alert("Anel", "Anel cadastrado com sucesso!");
         
        })
        .catch((error) => console.log(error));
    }
  }
  function verificaCampos() {
    if (material == "") {
      Alert.alert("Nome em branco", "Digite um nome");
      return false;
    }
    if (id == "") {
      Alert.alert("Nome em branco", "Digite um nome");
      return false;
    }
    if (tamanho == "") {
      Alert.alert("Código de Barras em branco", "Digite um código de barras");
      return false;
    }

    return true;
  }
  return (
    <ScrollView style={styles.tela}>

<View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Pressable
          style={{
            borderBottomStartRadius: 1,
            borderTopStartRadius: 1,
            borderTopEndRadius: 1,
            backgroundColor: "#ffa941",
            padding: 10,
            borderRadius: 50,
            marginBottom: 50,
          }}
          onPress={() => {
            props.navigation.goBack();
          }}><Text>voltar</Text></Pressable>
          </View>

      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={styles.titulo1}>cadastrar Anel</Text>
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={styles.titulo1}>nome</Text>
        <TextInput
          style={[styles.caixa_texto]}
          value={id}
          onChangeText={(Text) => setId(Text)}
        />

        <Text style={styles.titulo1}>material</Text>
        <TextInput
          style={[styles.caixa_texto]}
          onChangeText={(Text) => setMaterial(Text)}
        />
        <Text style={styles.titulo1}>tamanho</Text>
        <TextInput
          maxLength={7}
          value={tamanho.toString()}
          onChangeText={(text) => settamanho(text)}
          style={[styles.caixa_texto]}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 0,
            gap: 30,
            marginBottom: "20%",
          }}
        >
          <Pressable
            style={(state) => [
              {
                backgroundColor: "#ffa941",
                alignItems: "center",
                borderBottomStartRadius: 1,
                borderTopEndRadius: 1,
                borderRadius: 30,
                padding: 10,
                marginTop: 30,
              },
              state.pressed ? { opacity: 0.5 } : null,
            ]}
            onPress={cadastrar}
          >
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                color: "white",
              }}
            >
              cadastrar
            </Text>
          </Pressable>
{props.route.params.usu.cargo == true &&
          <Pressable
            style={(state) => [
              {
                backgroundColor: "#ffa941",
                alignItems: "center",
                borderBottomStartRadius: 1,
                borderTopEndRadius: 1,
                borderRadius: 30,
                padding: 10,
                marginTop: 30,
              },
              state.pressed ? { opacity: 0.5 } : null,
            ]}
            onPress={()=> props.navigation.navigate('TelaConsPerso',{usu:{
                email: props.route.params.usu.email,
                senha: props.route.params.usu.senha,
                cargo: props.route.params.usu.cargo,}})}
          >
            <Text
              style={{
                justifyContent: "center",
                fontSize: 30,
                fontWeight: "bold",
                color: "white",
              }}
            >
              ver produtos
            </Text>
          </Pressable>
          }
        </View>
      </View>
    </ScrollView>
  );
};

export default TelaCadPerso;
