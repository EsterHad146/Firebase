import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { db } from './src/firebaseConnection'
import { doc, getDoc, onSnapshot, setDoc, collection, addDoc, getDocs } from 'firebase/firestore'
import { Userlist } from './src/users';

export default function App() {
  const [nome, setNome] = useState("")
  const [cpf, setCpf] = useState("")
  const [email, setEmail] = useState("")
  const [users, setUsers] = useState([])
  const [showForm, setShowForm] = useState(true);

  async function getDados(){
    const usersRef = collection(db, "Usuarios");

  getDocs(usersRef)
  .then((snapshot) => {
    let lista = [];
    snapshot.forEach((doc) =>{
      lista.push({
        id:doc.id,
        nome:doc.data().nome,
        cpf:doc.data().cpf,
        email:doc.data().email
      })
    })
    setUsers(lista);
  })
  .catch((err)=>{
    console.log(err);
  })
  }
  useEffect(() => {
    getDados();
    
  }, [])
  
  
  async function registrarDados(){
    await addDoc(collection(db, "Usuarios"), {
      nome: nome,
      cpf: cpf,
      email: email,
    })
    .then(() => {
      console.log("CADASTRADO COM SUCESSO")
      setNome("")
      setCpf("")
      setEmail("")
      getDados()
    })
    .catch((err) => {
      console.log(err)
    })
    
  }
  
  function alternarForm(){
    setShowForm(!showForm)
    getDados()
  }
  
 return (
  <View style={styles.container}>
    { showForm && (
      <View>
        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome..."
          value={nome}
          onChangeText={ (text) => setNome(text) } 
        />

        <Text style={styles.label}>CPF:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite CPF Ex.: 333.333.333-33"
          value={cpf}
          onChangeText={ (text) => setCpf(text) } 
        />

        <Text style={styles.label}>E-mail:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o seu E-mail Ex.: jose@teste.cm"
          value={email}
          onChangeText={ (text) => setEmail(text) } 
        />

        <TouchableOpacity style={styles.button} onPress={registrarDados}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    )}

    <TouchableOpacity onPress={alternarForm} style={{ marginTop: 8}}>
      <Text style={{ textAlign:"center", color: "#000" }}>
        {showForm ? "Esconder formulário" : "Mostrar formulário"}
      </Text>
    </TouchableOpacity>

    <Text style={{marginTop: 14, marginLeft: 8, fontSize: 20, color: "#000"}}>
      Usuários
    </Text>

    <FlatList 
      style={styles.list}
      data={users}
      keyExtractor={(item) => String(item.id)}
      renderItem={({item}) => <Userlist data={item}/>}
    />


  </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1, 
    paddingTop: 40
  },
  button:{
    backgroundColor: "#000",
    marginLeft: 8,
    marginRight: 8,
  },
  buttonText:{
    padding: 8,
    color: "#FFF",
    textAlign: 'center'
  },
  label:{
    color: "#000", 
    fontSize: 18, 
    marginBottom: 4,
    marginLeft: 8,
  },
  input:{
    borderWidth: 1,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 8,
  }
})
