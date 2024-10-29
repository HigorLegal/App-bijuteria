import React, { useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Auth from "@react-native-firebase/auth";
import { CadastrarProps } from "../navigation/HomeNavigator.tsx";
import { styles } from "../styles/stylesCadastrar";

//criaçao das variaveis state para usar na pagina

const TelaCadastrar = (props: CadastrarProps) => {
  const [cargo, setcargo] = useState("");
  const [email, setemail] = useState("");
  const [senha, setSenha] = useState("");
  const [confSenha, setConfSenha] = useState("");

  //funcao para voltar na tela anterior

  function voltar() {
    props.navigation.navigate("TelaLogin");
  }

  //exibi a mensagem que esta pragramada

  function cadastrar() {
    if (verificarCampos()) {
      Auth()
        .createUserWithEmailAndPassword(email, senha)

        //then = depois oque acentece depois do primeiro
        .then(() => {
          Alert.alert("Conta Criada", "sua conta foi criada com sucesso");
        })
        .catch((error) => {
          tratarErros(String(error));
        });
    }
  }

  function verificarCampos(): boolean {
    if (email == "") {
      Alert.alert("Email vazio", "o email esta vazio");
      return false;
    } else if (senha.length < 6) {
      Alert.alert("Senha Fraca", "a senha deve ter pelo menos 6 digitos");
      return false;
    } else if (senha != confSenha) {
      Alert.alert("Senhas Diferentes", "as senhas nao sao iguais");
      return false;
    }

    return true;
  }

  function tratarErros(error: string) {
    console.log(error);
    if (error.includes("[auth/invalid-email]")) {
      Alert.alert("Email Invalido", "o email deve conter '@gmail.com'");
    } else if (error.includes("[auth/weak-password]")) {
      Alert.alert("Senha Fraca", "a senha deve ter pelo menos 6 digitos");
    } else if (error.includes("[auth/email-already-in-use]")) {
      Alert.alert("Email em Uso", "esse email ja esta registrado");
    } else {
      Alert.alert("Erro muito errado", error);
    }
  }
  return (
    <ScrollView style={styles.tela}>
      <View style={[styles.tela, { alignItems: "center" }]}>
        <View>
          <Text
            style={{
              justifyContent: "center",
              marginBottom: "10%",
              fontSize: 50,
              fontWeight: "bold",
              color: "white",
            }}
          >
            Cadastrar
          </Text>
        </View>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/181/181546.png",
          }}
          style={{
            backgroundColor: "white",
            borderRadius: 100,
            width: 150,
            height: 150,
          }}
        />

        <Text style={styles.titulo1}>Email</Text>
        <TextInput
          style={[styles.caixa_texto]}
          defaultValue="Digite seu email"
          onChangeText={(Text) => setemail(Text)}
        />

        <View
          style={{
            backgroundColor: "#212121",
            padding: 10,
            marginTop: 30,
            borderRadius: 30,
            alignItems: 'center'
          }}
        >
          <Text style={styles.titulo1}>Senha</Text>
          <TextInput
            style={[styles.caixa_texto]}
            secureTextEntry
            onChangeText={(Text) => setSenha(Text)}
          />
          <Text style={styles.titulo1}>Confirmar senha</Text>
          <TextInput
            style={[styles.caixa_texto]}
            secureTextEntry
            onChangeText={(Text) => setConfSenha(Text)}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 0,
            marginTop: "25%",
            gap: 50,
          }}
        >
          <Pressable
            style={(state) => [
              styles.botoesBaixo,
              state.pressed ? { opacity: 0.5 } : null,
            ]}
            onPress={cadastrar}
          >
            <Text style={styles.botoesECTxt}>Salvar</Text>
          </Pressable>

          <Pressable
            style={(state) => [
              styles.botoesBaixo,
              state.pressed ? { opacity: 0.5 } : null,
            ]}
            onPress={voltar}
          >
            <Text style={styles.botoesECTxt}>Cancelar</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};
export default TelaCadastrar;
// function auth() {
//   throw new Error("Function not implemented.");
// }
