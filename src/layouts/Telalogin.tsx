import React, { useState } from "react";
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

const TelaLogin = (props: LoginProps) => {
  //criaçao das variaveis state para usar na pagina
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");

  function Telacadastrar() {
    props.navigation.navigate("TelaCadastrar");
  }
  function TelaEsquceu() {
    props.navigation.navigate("TelaEsqueceuS");
  }

  //exibi a mensagem que esta pragramada

  function logar() {
    //if (verificarCampos()) {

    let Usuario = {
      email: login,
      senha: senha,
      cargo: isEnabled,
    } as usuario;
    props.navigation.navigate("TelaPrincipal", { usuario: Usuario });
    /*  

    
      auth()
        .signInWithEmailAndPassword(login, senha)

        //then = depois oque acentece depois do primeiro
        .then(() => {
          Alert.alert('usuario logado com sucesso');
          props.navigation.navigate('TelaPrincipal',{usuario:Usuario});
        })

        .catch(error => {
          tratarErros(String(error));
        });
    }  
*/
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

        <View style={{flexDirection: "row",}}>
          <Text style={{color:'white',fontSize:30
            ,fontWeight: 'bold'
          }}>Funcionario</Text>
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
          onPress={logar}
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
