import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ConsProdutosprops } from "../navigation/HomeNavigator.tsx";
import { styles } from "../styles/stylesPrincipal.ts";
import firestore from "@react-native-firebase/firestore";
import { Produto } from "../types/produto.ts";

const TelaConsProdutos = (props: ConsProdutosprops) => {
  const [produtos, setProdutos] = useState([] as Produto[]);
  

  //pra executar quando abrir a tela
  useEffect(() => {
    const subscribe = firestore()
      .collection("produtos")

      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          return {
            //vai juntar o id do produto do firebase
            id: doc.id,
            ...doc.data(),
          };
        }) as Produto[];
        setProdutos(data);
      });
    return () => subscribe();
  });

  function editar(Id: string) {
    props.navigation.navigate("TelaAltProduto", { id: Id });
  }
  function deletar(id: string) {
    firestore()
      .collection("produtos")
      .doc(id)
      .delete()
      .then(() => {
        Alert.alert("Removido", "produto removido da lista");
      })
      .catch((error) => console.log(error));
  }
  return (
    <ScrollView style={styles.tela}>
      <Pressable
        style={{
          borderBottomEndRadius: 10,
          borderBottomStartRadius: 10,
          backgroundColor: "#ffa941",
          padding: 10,
        }}
        onPress={() => {
          props.navigation.goBack();
        }}
      >
        <Text style={{ fontSize: 30, color: "white", textAlign: "center" }}>
          voltar
        </Text>
      </Pressable>

      <View style={{ flex: 1, alignItems: "center" }}>
        <Text
          style={{
            marginBottom: 50,
            color: "white",
            fontSize: 40,
            fontWeight: "bold",
          }}
        >
          lista de produtos
        </Text>
        <Pressable
          style={{
            borderBottomEndRadius: 10,
            borderBottomStartRadius: 10,
            backgroundColor: "#ffa941",
            padding: 10,
            marginBottom: 30,
          }}
          onPress={() => {
            props.navigation.navigate("TelaCadProdutos");
          }}
        >
          <Text style={{ fontSize: 30, color: "white", textAlign: "center" }}>
            cadastrar produto
          </Text>
        </Pressable>
        <FlatList
          style={{}}
          data={produtos}
          renderItem={(item) => (
            <ItemProduto deletar={deletar} prod={item.item} editar={editar} />
          )}
        />
      </View>
    </ScrollView>
  );
};
type ItemProdutoProps = {
  prod: Produto;
  deletar: (id: string) => void;
  editar: (Id: string) => void;
};

const ItemProduto = (props: ItemProdutoProps) => {
  return (
    <View
      style={{
        marginBottom: 20,
        borderColor: "black",
        borderRadius: 30,
        backgroundColor: "white",
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontSize: 40,
          fontWeight: "bold",
          color: "#ffa941",
        }}
      >
        {props.prod.nome}
      </Text>

      <Text style={{ margin: 10, fontSize: 20, color: "black" }}>
        {"\ncodigo de barras : " +
          props.prod.codigoBarras +
          "\npreço : R$" +
          props.prod.preco.toFixed(2)}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <Pressable
          style={{
            borderBottomStartRadius: 10,
            borderTopEndRadius: 10,
            padding: 15,
            backgroundColor: "red",
          }}
          onPress={() => {
            props.deletar(props.prod.id);
          }}
        >
          <Text style={{ color: "black", fontSize: 30 }}>X</Text>
        </Pressable>

        <Pressable
          style={{
            borderBottomStartRadius: 10,
            borderTopEndRadius: 10,
            padding: 15,
            backgroundColor: "gray",
          }}
          onPress={() => {
            props.editar(props.prod.id);
          }}
        >
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/1828/1828911.png",
            }}
            style={{
              width: 40,
              height: 40,
            }}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default TelaConsProdutos;
