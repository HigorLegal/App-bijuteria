import {
  Alert,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Produto } from "../types/produto";
import { Carrinho } from "../types/carrinho";
import { styles } from "../styles/stylesCadastrar";
import fireStore from "@react-native-firebase/firestore";
import { PrincipalProps } from "../navigation/HomeNavigator";
import { useEffect, useState } from "react";
import { useLinkProps } from "@react-navigation/native";

const TelaPrincipal = (props: PrincipalProps) => {
  
  const [carrinho, setCarrinho] = useState([] as Carrinho[]);
  const [produtos, setProdutos] = useState([] as Produto[]);
  const [Prodcomprados, setProdcomprados] = useState(carrinho[0].produtos);

  //pra executar quando abrir a tela
  useEffect(() => {
    const subscribe = fireStore()
      .collection("carrinho")
      .where("clienteEmail", "==", props.route.params.usuario.email)
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          return {
            //vai juntar o id do produto do firebase
            id: doc.id,
            ...doc.data(),
          };
        }) as Carrinho[];
        setCarrinho(data);
      });
    return () => subscribe();
  });
  useEffect(() => {
    const subscribe = fireStore()
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
  function adicionar(produto: Produto) {
    //o ... e como se estivece estraindo os valores da lista (se esqucer e so ler que tu entende)
    setProdcomprados((lista) => [...lista, produto]);

    let car = {
      clienteEmail: props.route.params.usuario.email,
      id: carrinho[0].id,
      produtos: Prodcomprados,
    } as Carrinho;

    fireStore()
      .collection("carrinho")
      .doc(car.id)
      .update(car)
      .then(() => {
        Alert.alert("Produto", "adicionado ao carrinho com sucesso");
      })
      .catch((error) => console.log(error));
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
          }}
        >
          <Text style={{ fontSize: 30, color: "white" }}>voltar</Text>
        </Pressable>

        <Pressable
          style={{
            borderBottomEndRadius: 1,
            borderTopEndRadius: 1,
            borderTopStartRadius: 1,
            backgroundColor: "#ffa941",
            padding: 15,
            borderRadius: 50,
            marginBottom: 50,
          }}
          onPress={() => {
            props.navigation.navigate("TelaCarrinho",
              {
                car: carrinho[0],
                usuario: {
                  email: props.route.params.usuario.email,
                  senha: props.route.params.usuario.senha,
                  cargo: props.route.params.usuario.cargo,
                },
              });
          }}
        >
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/6713/6713723.png",
            }}
            style={{
              width: 40,
              height: 40,
            }}
          ></Image>
        </Pressable>
      </View>

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

        {props.route.params.usuario.cargo == true && (
          <Pressable
            style={{
              borderBottomEndRadius: 10,
              borderBottomStartRadius: 10,
              backgroundColor: "#ffa941",
              padding: 10,
              marginBottom: 50,
            }}
            onPress={() => {
              props.navigation.navigate("TelaConsProdutos");
            }}
          >
            <Text style={{ fontSize: 30, color: "white", textAlign: "center" }}>
              gerenciar produtos
            </Text>
          </Pressable>
        )}
        <FlatList
          style={{}}
          data={produtos}
          renderItem={(item) => (
            <ItemProduto prod={item.item} adicionar={adicionar} />
          )}
        />
      </View>
    </ScrollView>
  );
};

type ItemProdutoProps = {
  prod: Produto;
  adicionar: (produto: Produto) => void;
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
            backgroundColor: "#44ed00",
          }}
          onPress={() => {
            props.adicionar(props.prod);
          }}
        >
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/6713/6713723.png",
            }}
            style={{
              width: 40,
              height: 40,
            }}
          ></Image>
        </Pressable>
      </View>
    </View>
  );
};

export default TelaPrincipal;
