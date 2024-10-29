import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import {
    ConsPersoprops,
  
} from "../navigation/HomeNavigator.tsx";
import { styles } from "../styles/stylesPrincipal.ts";
import firestore from "@react-native-firebase/firestore";
import { Anel } from "../types/anel.ts";

const TelaConsPerso = (props: ConsPersoprops) => {
    const [Anel, setAnel] = useState([] as Anel[]);
    const [id, setId] = useState('');
  

    //pra executar quando abrir a tela
    useEffect(() => {
      const subscribe = firestore()
        .collection("AnelPerso")
  
        .onSnapshot((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => {
            return {
              //vai juntar o id do produto do firebase
              id: doc.id,
              ...doc.data(),
            };
          }) as Anel[];
          setAnel(data);
        });
      return () => subscribe();
    });
  
    
    function deletar(id: string) {
      firestore()
        .collection("AnelPerso")
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
            lista de Anel
          </Text>
          <Pressable
            style={{
              borderBottomEndRadius: 10,
              borderBottomStartRadius: 10,
              backgroundColor: "#ffa941",
              padding: 10,
              marginBottom: 30,
            }}
            onPress={()=> props.navigation.navigate('TelaCadPerso',{usu:{
                email: props.route.params.usu.email,
                senha: props.route.params.usu.senha,
                cargo: props.route.params.usu.cargo,}})}
          >
            <Text style={{ fontSize: 30, color: "white", textAlign: "center" }}>
              cadastrar produto
            </Text>
          </Pressable>
          <FlatList
            style={{}}
            data={Anel}
            renderItem={(item) => (
              <ItemProduto deletar={deletar} prod={item.item}  />
            )}
          />
        </View>
      </ScrollView>
    );
  };
  type ItemProdutoProps = {
    prod: Anel;
    deletar: (id: string) => void;
   
  };
  
  const ItemProduto = (props: ItemProdutoProps) => {
    return (
      <View
        style={{
          marginBottom: 20,
          borderColor: "black",
          borderRadius: 30,
          backgroundColor: "white",
          padding:25
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
          {"\n material : " +
            props.prod.material +
            "\ntamanho : " +
            props.prod.tamanho+
            "\nemail : " +
            props.prod.clienteEmail}
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
            <Text>X</Text>
        </Pressable>
  
         
        </View>
      </View>
    );
  };

export default TelaConsPerso;
