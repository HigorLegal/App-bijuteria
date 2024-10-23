import React from 'react';
import { Text } from 'react-native';
import { styles } from '../styles/styles';

const getNomeCompleto = (
  primeiroNome: string, 
  nomeMeio: string, 
  ultimoNome: string) => {

  return primeiroNome + ' ' + nomeMeio + ' ' + ultimoNome;
};

const Gato = () => {
  return (
    <Text style={styles.titulo1}>
      Olá, eu sou o gato
      {getNomeCompleto('Fulano', 'da Silva', 'Sauro')} !
    </Text>
  )
};

export default Gato;