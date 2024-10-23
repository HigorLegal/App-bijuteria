import React from 'react';
import {View, Text, Image, ScrollView, TextInput} from 'react-native';
import { styles } from '../styles/styles';

const Exemplo1 = () => {
  //variável
  let url = 'https://reactnative.dev/docs/assets/p_cat2.png';

  //O retorno da função é o que será construído em tela
  return (
    <ScrollView>
      <Text style={styles.titulo1}>Exemplo 1 com style</Text>

      <View>
        <Text>Text comum sem estilização</Text>

        <Image
          source={{uri: url}}
          style={styles.imagem_200}
        />
      </View>

      <TextInput
        style={[styles.caixa_texto, styles.largura_70]}
        defaultValue="Digite aqui"
      />
    </ScrollView>
  );
};

export default Exemplo1;

