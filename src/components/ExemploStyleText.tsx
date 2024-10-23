import { StyleSheet, Text } from "react-native";

const ExemploStylesText = () => {
    return (
        <>
            <Text style={styles_local.texto1}>Texto 1</Text>
            <Text style={styles_local.texto2}>Texto 2</Text>
            <Text style={styles_local.texto3}>Texto 3</Text>
            <Text style={styles_local.texto4}>Texto 4</Text>
            <Text style={styles_local.texto5}>Texto 5</Text>
            <Text style={[styles_local.negrito, styles_local.titulo]}>Texto 6</Text>
            <Text style={[styles_local.texto5, styles_local.texto1, styles_local.titulo]}>Texto 7</Text>
        </>
    );
}

export default ExemploStylesText;

const styles_local = StyleSheet.create({
    texto1:{
        //cor
        color: 'blue'
    },
    texto2:{
        //cor
        color: '#00BFFF'
    },
    texto3:{
        //espessura do texto
        fontWeight: 'bold',
        //tamanho da fonte
        fontSize: 30,
    },
    texto4:{
        //estilo da fonte
        fontStyle: 'italic'
    },
    texto5:{
        //cor
        color: 'black',
        //criando sombra para o texto
        textShadowOffset: {width: 5, height: 5},
        //cor da sombra do texto
        textShadowColor: 'yellow',
        //embaçar a sombra
        textShadowRadius: 10,
        //tamanho da fonte do texto
        fontSize: 100,
    },
    negrito: {
        //espessura do texto
        fontWeight: 'bold',
    },
    titulo: {
        //tamanho da fonte do texto
        fontSize: 30,
    },
});
