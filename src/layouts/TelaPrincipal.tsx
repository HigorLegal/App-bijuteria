import React, { useEffect, useState } from "react";
import {
  FlatList,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import { PrincipalProps } from "../navigation/HomeNavigator.tsx";
import { styles } from "../styles/stylesPrincipal.ts";
import { Produto } from "../types/produto.ts";

const TelaPrincipal = (props: PrincipalProps) => {

  const [produtos, setProdutos] = useState([] as Produto[]);
  
  function produtos() {
    props.navigation.navigate("TelaConsProdutos");
  }

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
  return (
    <ScrollView style={styles.tela}>
      <View style={{ flex: 1, alignItems: "flex-start" }}>
        <Pressable
          style={{
            borderBottomStartRadius: 1,
            borderTopStartRadius: 1,
            borderTopEndRadius: 1,
            backgroundColor: "#ffa941",
            padding: 10,
            borderRadius: 50,
          }}
          onPress={() => {
            props.navigation.goBack();
          }}
        >
          <Text style={{ fontSize: 30, color: "white" }}>voltar</Text>
        </Pressable>
      </View>

      <View style={{ flex: 1, alignItems: "center" }}>
       
      <FlatList
          style={{}}
          data={produtos}
          renderItem={(item) => (
            <ItemProduto deletar={deletar} prod={item.item} editar={editar} />
          )}
        
        
        {
        props.route.params.usuario.cargo == true &&

        <Pressable
        style={{
          borderBottomStartRadius: 1,
          borderTopEndRadius: 1,
          marginTop: "10%",
          backgroundColor: "#ffa941",
          padding: 10,
          borderRadius: 50,
        }}
        onPress={produtos}
      >
        <Text style={{ fontSize: 40, color: "white" }}>
        gerenciar de produtos
        </Text>
      </Pressable>

        }
        
      </View>
    </ScrollView>
  );
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

export default TelaPrincipal;
