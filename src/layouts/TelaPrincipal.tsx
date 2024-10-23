import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PrincipalProps } from '../navigation/HomeNavigator';
import HelloWorld from '../components/HelloWorld';
import { styles } from '../styles/styles';
import Exemplo1 from '../components/Exemplo1';

const TelaPrincipal = (props: PrincipalProps) => {
    return (
        <View 
            style={styles.tela}>
            <HelloWorld />
            <Exemplo1/>
        </View>
    );
}

export default TelaPrincipal;
