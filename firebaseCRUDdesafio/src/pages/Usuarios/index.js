import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { db } from '../../firebaseConnection';
import { doc, onSnapshot, collection, addDoc, updateDoc } from 'firebase/firestore';
import { UsersList } from './users';
import { Titulo, Botao, CaixaTexto } from '../../components';


export default function Usuarios() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(true);
  const [isEditing, setIsEditing] = useState("");

  // Função para buscar dados dos usuários
  async function getDados() {
    const usersRef = collection(db, "Usuarios");
    onSnapshot(usersRef, (snapshot) => {
      let lista = [];
      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          nome: doc.data().nome,
          cpf: doc.data().cpf,
          email: doc.data().email,
        });
      });
      setUsers(lista);
    });
  }

  // Função de edição de usuário
  function editUser(data) {
    setNome(data.nome);
    setCpf(data.cpf);
    setEmail(data.email);
    setIsEditing(data.id);
  }

  // Função para editar um usuário
  async function editarUsuario() {
    const docRef = doc(db, "Usuarios", isEditing);
    await updateDoc(docRef, {
      nome: nome,
      cpf: cpf,
      email: email,
    }).then(() => {
      console.log("Usuário atualizado com sucesso");
    });
  }

  // Função para limpar os campos do formulário
  function limparCampos() {
    setNome('');
    setCpf('');
    setEmail('');
    setIsEditing('');
  }

  // Função para registrar dados
  async function registrarDados() {
    await addDoc(collection(db, "Usuarios"), {
      nome: nome,
      cpf: cpf,
      email: email,
    })
      .then(() => {
        console.log("Cadastro realizado com sucesso");
        limparCampos();
        getDados();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Alternar exibição do formulário
  function alternarForm() {
    setShowForm(!showForm);
    limparCampos();
  }

  // UseEffect para carregar os dados ao montar o componente
  useEffect(() => {
    getDados();
  }, []);

  return (
    <View style={styles.container}>

      <Titulo text="Cadastro de usuários"/>
      {showForm && (
        <View>
          <Text style={styles.label}>Nome:</Text>
          <CaixaTexto
            placeholder="Digite seu nome..."
            value={nome}
            onChangeText={(text) => setNome(text)}
          />

          <Text style={styles.label}>CPF:</Text>
          <CaixaTexto
            placeholder="Digite CPF Ex.: 333.333.333-33"
            value={cpf}
            onChangeText={(text) => setCpf(text)}
          />

          <Text style={styles.label}>E-mail:</Text>
          <CaixaTexto
            placeholder="Digite o seu E-mail Ex.: jose@teste.cm"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />

          {isEditing !== '' ? (
            <Botao onPress={editarUsuario} children="Salvar Edição"/>
            ) : (
            <Botao onPress={registrarDados} children="Adicionar"/>
          )}
        </View>
      )}

      {/* <Botao onPress={alternarForm} 
        children={showForm ? "Esconder formulário" : "Mostrar formulário"}
      /> */}
      <TouchableOpacity onPress={alternarForm} style={{ marginTop: 8 }}>
        <Text style={{ textAlign: "center", color: "#000" }}>
          {showForm ? "Esconder formulário" : "Mostrar formulário"}
        </Text>
      </TouchableOpacity>

      <Titulo text="Usuários" />

      <FlatList
        style={styles.list}
        data={users}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <UsersList data={item} edit={() => editUser(item)} />
        )}
      />
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
    padding: 8,
    color: "#FFF",
    textAlign: 'center',
  },
  label: {
    color: "#000",
    fontSize: 18,
    marginBottom: 4,
    marginLeft: 8,
  },
  input: {
    borderWidth: 1,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 8,
  },
});
