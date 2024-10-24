import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import TelaPrincipal from '../layouts/TelaPrincipal';
import TelaCadastrar from '../layouts/TelaCadastrar';
import TelaLogin from '../layouts/Telalogin';
import TelaEsqueceuS from '../layouts/TelaEsqueceuS';
import TelaCadProdutos from '../layouts/TelaCadProdutos';
import TelaConsProdutos from '../layouts/TelaConsProdutos';
import { usuario } from '../types/usuario';
import TelaAltProduto from '../layouts/TelaAltProduto';
import TelaCarrinho from '../layouts/TelaCarrinho';

//Define quais as telas e os parâmetros de cada tela
type RootStackParamList = {
  TelaPrincipal: {usuario: usuario};
  TelaLogin: undefined; //Não possui parâmetros
  TelaEsqueceuS: undefined; //Não possui parâmetros
  TelaCadastrar: undefined; //Não possui parâmetros
  TelaCadProdutos: undefined; //Não possui parâmetros
  TelaConsProdutos: undefined; //Não possui parâmetros
  TelaAltProduto: {id: string}; 
  TelaCarrinho: undefined; //Não possui parâmetros
};

//Cria a Stack (tipo de navegação onde as telas estão em uma "pilha")
//com o RootStackParamList definindo as telas da stack
const Stack = createNativeStackNavigator<RootStackParamList>();

//Cria o navegador da pilha
const HomeNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="TelaLogin" //nome da tela inicial
      screenOptions={{headerShown: false}} //headerShown define se o cabeçalho irá ser exibido
    >
      {/* define uma tela dando um nome(igual ao RootStackParamList) e qual o componente será carregado */}

      <Stack.Screen name="TelaLogin" component={TelaLogin} />

      <Stack.Screen name="TelaCadProdutos" component={TelaCadProdutos} />

      <Stack.Screen name="TelaAltProduto" component={TelaAltProduto} />

      <Stack.Screen name="TelaConsProdutos" component={TelaConsProdutos} />

      <Stack.Screen name="TelaCarrinho" component={TelaCarrinho} />

      <Stack.Screen name="TelaPrincipal" component={TelaPrincipal} />

      <Stack.Screen name="TelaCadastrar" component={TelaCadastrar} />

      <Stack.Screen name="TelaEsqueceuS" component={TelaEsqueceuS} />

  
    </Stack.Navigator>
  );
};

//cria as propriedades da TelaPrincipal, que nesse caso é undefined
//essas propriedades são usadas lá em layouts/TelaPincipal.tsx
type PrincipalProps = NativeStackScreenProps<
  RootStackParamList,
  'TelaPrincipal'
>;
type LoginProps = NativeStackScreenProps<RootStackParamList, 'TelaLogin'>;
type EsqueceuProps = NativeStackScreenProps<
  RootStackParamList,
  'TelaEsqueceuS'
>;
type CadProdutosprops = NativeStackScreenProps<
  RootStackParamList,
  'TelaCadProdutos'
>;
type ConsProdutosprops = NativeStackScreenProps<
  RootStackParamList,
  'TelaConsProdutos'
>;

type AltProdutoprops = NativeStackScreenProps<
  RootStackParamList,
  'TelaAltProduto'
>;

type CadastrarProps = NativeStackScreenProps<
  RootStackParamList,
  'TelaCadastrar'
>;

type CarrinhoProps = NativeStackScreenProps<
  RootStackParamList,
  'TelaCarrinho'
>;

//exporta o navegador da pilha para ficar visível para outros arquivos
export default HomeNavigator;

//exporta os tipos de dados para ficar visível para outros arquivos
export type {
  PrincipalProps,
  LoginProps,
  CadastrarProps,
  EsqueceuProps,
  CadProdutosprops,
  ConsProdutosprops,
  AltProdutoprops,
  CarrinhoProps
};
