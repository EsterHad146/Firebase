import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FrmLogin from "./src/FrmLogin";
import FrmUsuarios from "./src/FrmUsuario";

export default function App(){
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(null)

  function efetuarLogoff(){
    setUsuarioAutenticado(null)
  }

  function efetuarLogin(user){
    setUsuarioAutenticado(user)
  }

  return(
    <View style={styles.container}>
      {usuarioAutenticado ? (
        <View>
          <Text>Seja bem-vindo {usuarioAutenticado.email}!</Text>
          <TouchableOpacity onPress={efetuarLogoff} style={styles.buttonText}>Sair</TouchableOpacity>
          <FrmUsuarios />
        </View>
      ):(
        <View>
          <FrmLogin autenticar={(user) => efetuarLogin(user)} />
        </View>
      )}

    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  buttonText: {
    backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        marginBottom: 10,
  },
})