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
import { Produto } from "../types/produto.ts";
import {
  CadProdutosprops,
  PrincipalProps,
} from "../navigation/HomeNavigator.tsx";
import { styles } from "../styles/stylesPrincipal.ts";
import firestore from "@react-native-firebase/firestore";

const TelaCadProdutos = (props: CadProdutosprops) => {
  const [nome, setnome] = useState("");
  const [codigoBarras, setcodigoBarras] = useState("");
  const [preco, setpreco] = useState("");

  function verProdutos() {
    props.navigation.navigate("TelaConsProdutos");
  }
  function cadastrar() {
    if (verificaCampos()) {
      let produto = {
        nome: nome,
        codigoBarras: codigoBarras,
        preco: Number.parseFloat(preco),
      } as Produto;

      firestore()
        .collection("produtos")
        .add(produto)
        .then(() => {
          Alert.alert("produto", "produto cadastrado com sucesso!");
          setnome("");
          setcodigoBarras("");
          setpreco("0");
        })
        .catch((error) => console.log(error));
    }
  }
  function verificaCampos() {
    if (nome == "") {
      Alert.alert("Nome em branco", "Digite um nome");
      return false;
    }
    if (codigoBarras == "") {
      Alert.alert("Código de Barras em branco", "Digite um código de barras");
      return false;
    }

    return true;
  }
  return (
    <ScrollView style={styles.tela}>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={styles.titulo1}>cadastrar produto</Text>
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={styles.titulo1}>nome</Text>
        <TextInput
          style={[styles.caixa_texto]}
          value={nome}
          onChangeText={(Text) => setnome(Text)}
        />

        <Text style={styles.titulo1}>codigoBarras</Text>
        <TextInput
          style={[styles.caixa_texto]}
          onChangeText={(Text) => setcodigoBarras(Text)}
        />
        <Text style={styles.titulo1}>preco</Text>
        <TextInput
          maxLength={7}
          value={preco.toString()}
          onChangeText={(text) => setpreco(text)}
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
            onPress={verProdutos}
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
        </View>
      </View>
    </ScrollView>
  );
};

export default TelaCadProdutos;
