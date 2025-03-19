import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { db, auth } from './firebaseConnection';
import { doc, onSnapshot, collection, addDoc, updateDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export default function FrmLogin(autenticar) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [mostrarSenha, setMostrarSenha] = useState(false)
  
  function Login(){
    signInWithEmailAndPassword(auth, email, password)
      .then((data)=>{
        alert("Login efetuado com sucesso")
        console.log(data)
        autenticar.autenticar(data)
      })
      .catch((err)=>{
        alert(`Não foi possível realizar o login, ${err}`)
      })
  }
  
  function Cadastrar(){
    createUserWithEmailAndPassword(auth, email, password)
      .then((data)=>{
        alert("Cadastro feito com sucesso")
        console.log(data)
        autenticar.autenticar({email:user.email})
      })
      .catch((err)=>{
        alert(`Não foi possível criar o usuário, ${err}`)
      })

  }

  return (
    <View >
        <View>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu email..."
            value={email}
            onChangeText={(text) => setEmail(text)}
          />

          <Text style={styles.label}>Senha:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={!mostrarSenha}
          />
          

          <TouchableOpacity onPress={Login} style={styles.buttonText}>
            <Text>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={Cadastrar} style={styles.buttonText}>
            <Text>Cadastrar</Text>
          </TouchableOpacity>

         
        </View>
    </View>
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  button: {
    backgroundColor: "#000",
    marginLeft: 8,
    marginRight: 8,
  },
  buttonText: {
    backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        marginBottom: 20,
  },
  label: {
    color: "#000",
    fontSize: 18,
    marginBottom: 4,
    marginLeft: 8,
  },
  input: {
    height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 10,
  },
});
