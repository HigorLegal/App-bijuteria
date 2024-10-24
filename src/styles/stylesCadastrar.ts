import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  botoes: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 0,
    marginTop: "40%",
    marginBottom: "20%",
    gap: 50,
  },
  tela: {
    flex: 1,
    backgroundColor: "#949494",
  },
    botoesBaixo: {
    backgroundColor: "#ffa941",
    paddingTop: 4,
    padding: 8,

    alignItems: "center",
    borderRadius: 15,
  },
  botoesECTxt: {
    fontSize: 30,
    color: "white",
  },
  titulo2: {
    justifyContent: "center",
    marginBottom: "20%",
    fontSize: 50,
    fontWeight: "bold",
    color: "white",
  },
  titulo1: {
    justifyContent: "center",
    marginTop: 10,
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },

  caixa_texto: {
    backgroundColor: "white",
    color: "black",
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 4,
    margin: 3,
    marginTop: 0,
    width: 380,
  },
});
