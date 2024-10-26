import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { LoginProps } from "../navigation/HomeNavigator.tsx";
import { styles } from "../styles/stylesLogin.ts";
import auth from "@react-native-firebase/auth";
import TelaEsqueceuS from "./TelaEsqueceuS.tsx";
import { usuario } from "../types/usuario.ts";
import { SafeAreaProvider } from "react-native-safe-area-context";
import firestore from "@react-native-firebase/firestore";
import { Carrinho } from "../types/carrinho.ts";

const TelaLogin = (props: LoginProps) => {
  //criaçao das variaveis state para usar na pagina
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [carrinho, setCarrinho] = useState([] as Carrinho[]);

  function Telacadastrar() {
    props.navigation.navigate("TelaCadastrar");
  }
  function TelaEsquceu() {
    props.navigation.navigate("TelaEsqueceuS");
  }

  //exibi a mensagem que esta pragramada

  async function logar() {
    if (verificarCampos()) {
      let Usuario = {
        email: login,
        senha: senha,
        cargo: isEnabled,
      } as usuario;

      let cliente = [] as Carrinho[];
// o wait e porque esse coiso ele vai simultaneo entao enquanto ta preucurando ele faz o 
//de baixo e o valor fica null com o await ele espera achar e depois segue o codigo 
   
const data = await firestore()
        .collection("carrinho")
        .where("clienteEmail", "==", Usuario.email)
        .get();
//ele vai fazer o loop e arma
      cliente = data.docs.map((doc) => {
        return {
          //vai juntar o id do produto do firebase
          id: doc.id,
          ...doc.data(),
        };
      }) as Carrinho[];


      if (cliente.length == 0) {
        let carro = {
          clienteEmail: login,
          produtos: [],
        } as Carrinho;

        auth()
          .signInWithEmailAndPassword(login, senha)

          //then = depois oque acentece depois do primeiro
          .then(() => {
            //pra executar quando abrir a tela

            firestore()
              .collection("carrinho")
              .add(carro)
              .then(() => {})
              .catch((error) => console.log(error));

            Alert.alert("usuario logado com sucesso");
            props.navigation.navigate("TelaPrincipal", { usuario: Usuario });
          })

          .catch((error) => {
            tratarErros(String(error));
          });
      } else {
        auth()
          .signInWithEmailAndPassword(login, senha)

          //then = depois oque acentece depois do primeiro
          .then(() => {
            //pra executar quando abrir a tela

            Alert.alert("usuario logado com sucesso");
            props.navigation.navigate("TelaPrincipal", { usuario: Usuario });
          })

          .catch((error) => {
            tratarErros(String(error));
          });
      }

      props.navigation.navigate("TelaPrincipal", { usuario: Usuario });
    }
  }

  function verificarCampos(): boolean {
    if (login == "") {
      Alert.alert("Email vazio", "o email esta vazio");
      return false;
    } else if (senha == "") {
      Alert.alert("Senha em Branco", "A senha esta vazia");
      return false;
    }
    return true;
  }
  function tratarErros(error: string) {
    console.log(error);
    if (error.includes("[auth/invalid-email]")) {
      Alert.alert("Email Invalido", "o email deve conter '@gmail.com'");
    } else if (error.includes("[INVALID_LOGIN_CREDENTIAlS]")) {
      Alert.alert("email ou senha incorretos", "");
    } else if (error.includes("[auth/invalid-credential]")) {
      Alert.alert("email ou senha incorretos", "");
    } else {
      Alert.alert("Erro muito errado", error);
    }
  }

  return (
    <ScrollView style={styles.tela}>
      <View style={{ flex: 1, alignItems: "center" }}>
        <View>
          <Text style={[styles.titulo2, { marginTop: 10, color: "orange" }]}>
            Bijus de Divas
          </Text>
        </View>
        <View>
          <Text style={styles.titulo2}>Login</Text>
        </View>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/552/552721.png",
          }}
          style={styles.imagem_200}
        />
        <View>
          <Text style={styles.titulo1}>Email</Text>
        </View>

        <TextInput
          style={[styles.caixa_texto]}
          onChangeText={(Text) => setLogin(Text)}
        />

        <Text style={styles.titulo1}>Senha</Text>
        <TextInput
          style={[styles.caixa_texto]}
          secureTextEntry
          onChangeText={(Text) => setSenha(Text)}
        />

        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
            Funcionario
          </Text>
          <Switch
            style={{}}
            trackColor={{ false: "#767577", true: "orange" }}
            thumbColor={isEnabled ? "#f5dd4b" : "white"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <Pressable
          onPress={() =>
            logar()
          }
          style={(state) => [
            styles.botaoEntrar,
            { marginTop: 30 },
            state.pressed ? { opacity: 0.5 } : null,
          ]}
        >
          <Text style={styles.titulo1}>Entrar</Text>
        </Pressable>

        <View style={styles.botoes}>
          <Pressable
            style={(state) => [
              styles.botoesBaixo,
              { borderBottomStartRadius: 1, borderTopEndRadius: 1 },
              state.pressed ? { opacity: 0.5 } : null,
            ]}
            onPress={TelaEsquceu}
          >
            <Text style={styles.botoesECTxt}>Esqueceu a senha</Text>
          </Pressable>

          <Pressable
            style={(state) => [
              ,
              styles.botoesBaixo,
              { borderBottomStartRadius: 1, borderTopEndRadius: 1 },
              state.pressed ? { opacity: 0.5 } : null,
            ]}
            onPress={Telacadastrar}
          >
            <Text style={styles.botoesECTxt}>Cadastrar</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default TelaLogin;
