import React, { useState } from 'react';
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
} from 'react-native';
import {EsqueceuProps, PrincipalProps} from '../navigation/HomeNavigator.tsx';
import auth from '@react-native-firebase/auth';
import {styles} from '../styles/stylesLogin';

const TelaEsqueceuS = (props: EsqueceuProps) => {
  const [email, setEmail] = useState('');


  function trocarSenha() {
    if(email !=''){
auth()
.sendPasswordResetEmail(email)
.then(()=>Alert.alert('enviamos para o seu email'))
.catch((error)=> console.log(error))

    }
  }
  function voltar() {
    props.navigation.navigate('TelaLogin');
  }
    function tratarErros(error: string) {
      console.log(error);
      if (error.includes('[auth/invalid-email]')) {
        Alert.alert('Email Invalido', "o email deve conter '@gmail.com'");
      } else if (error.includes('[INVALID_LOGIN_CREDENTIAlS]')) {
        Alert.alert('email ou senha incorretos', '');
      } else if (error.includes('[auth/invalid-credential]')) {
        Alert.alert('email ou senha incorretos', '');
      } else {
        Alert.alert('Erro muito errado', error);
      }
    
  }
  return ( 
  <ScrollView  style={styles.tela}>
      <View style={{flex: 1, alignItems: 'flex-start'}}>
          <Pressable
                style={{borderBottomStartRadius:1,
                    borderTopStartRadius:1,
                borderTopEndRadius:1,
              backgroundColor: '#ffa941',
              padding: 10,
              borderRadius: 50,
              marginBottom:50
             
            }}
            onPress={() => {
              props.navigation.goBack();
            }}>
            <Text style={{fontSize: 30, color: 'white'}}>voltar</Text>
          </Pressable>
        </View>
        <View style={{flex:1,alignItems:"center"}}>

      

          <View style={{marginTop:50}}>
          <Image 
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/6357/6357126.png',
            }}
            style={styles.imagem_200}
          />
          </View>
          <View style={{}}>
            <Text style={styles.titulo1}>email</Text>
          </View>

          <TextInput
            style={[styles.caixa_texto]}
            onChangeText={Text => setEmail(Text)}
          />
          <View style={{borderRadius:30,backgroundColor:"#212121",marginTop:100,marginBottom:100,padding:20}}>
           <Text style={{ justifyContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'}}>coloque o email que quer trocar a senha </Text>
</View>
<Pressable
            style={state => [
              
              styles.botaoEntrar,
              {marginTop: 30},
              state.pressed ? {opacity: 0.5} : null,
            ]}
            onPress={trocarSenha}>
            <Text style={styles.titulo1}>enviar</Text>
          </Pressable>
        </View>
      </ScrollView>

  );
};

export default TelaEsqueceuS;
