import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { CarrinhoProps } from "../navigation/HomeNavigator.tsx";
import { styles } from "../styles/stylesPrincipal.ts";
import firestore from "@react-native-firebase/firestore";
import { Produto } from "../types/produto.ts";
import { Carrinho } from "../types/carrinho.ts";

const TelaCarrinho = (props: CarrinhoProps) => {
const [listaNova, setLista] = useState(props.route.params.car.produtos)
const [usuario, setusuario] = useState(props.route.params.usuario)


  function retirar(id: number ) {

   

    listaNova.splice(id, 1)

    Alert.alert(''+listaNova);  
    
   


    let veiculo  ={
      clienteEmail: props.route.params.car.clienteEmail,
      id: props.route.params.car.id,
      produtos: listaNova
    }as Carrinho;

    

    firestore()
      .collection("carrinho")
      .doc(props.route.params.car.id)
      .update(veiculo)
      .then(() => {props.navigation.reset
       // Alert.alert("Removido", "produto removido do carrinho");
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
          props.navigation.navigate("TelaPrincipal",{usuario:usuario});
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
        <FlatList
          style={{}}
          data={listaNova}
          renderItem={(item) => (
            <ItemProduto retirar={retirar} prod={item.item} numOrd={item.index}   />
          )}
        />
      </View>
    </ScrollView>
  );
};
type ItemProdutoProps = {
  numOrd :number,
  prod: Produto;
  retirar: (id: number) => void;
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
            props.retirar(props.numOrd);
          }}
        >
          <Text style={{ color: "black", fontSize: 30 }}>X</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default TelaCarrinho;
