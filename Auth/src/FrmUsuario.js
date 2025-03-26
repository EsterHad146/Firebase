import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import api from './api';


export default function FrmUsuario() {
  //Dados Cadastro
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
   //Dados Login
  const [emailLogin, setEmailLogin] = useState("")
  const [password, setPassword] = useState("")
  //Dados Autenticação
  const [auth, setAuth] = useState(null)
  const [user, setUser] = useState(null)
  const [showForm, setShowForm] = useState(false)

  function limparCampos(){
    setNome("")
    setEmail("")
    setEmailLogin("")
    setPassword("")
    setSenha("")
  }

  function alternarForm(){
    setShowForm(!showForm);
  }

  async function postLogin(){
    try {
      const response = await api.post('/auth/login',{
        email:emailLogin,
        senha:password
      })
      let{result,token} = response.data
      setAuth({
        id:result.id,
        token:token
      })
      limparCampos()
      alert('Bem-vindo!')
      getUsuario()

    } catch (error) {
      alert(`Erro ao fazer login: ${error}`)
      setEmailLogin()
      setPassword()
    }
  }

  async function postUsuario(){
    try {
      const response = await api.post('/usuario',{
        nome:nome,
        email:email,
        senha:senha
      })
      console.log('Usuario criado ocm sucesso!', response.data)
      alert('Usuario criado com sucesso!')
      limparCampos()
      setShowForm(false)
      
    }catch(error){
      console.log('Não foi possível criar usuário: ',error)
      alert(`Erro ao cadastrar usuário: ${error}`)
    }                            
  }
  
  async function getUsuario(){
    try {
      const response = await api.get(`/usuario/${auth.id}`,{
        headers:{
          Authorization: `Bearer ${auth.token}`
        }
      })
      console.log(`Dados do usuário: `, response.data)
      let {nome, email} = response.data
      setUser({
        nome:nome,
        email:email
      })
    } catch (error) {
      console.log('Não foi possível buscar dados: ',error)
      alert(`Erro ao buscar usuários: ${error}`)
    }
  }
  
  function realizarLogout(){
    setUser(null)
    setAuth(null)
  }

 return (
  <View >
    { user? (
      <View>
        <Text style={styles.item}>Nome: {user.nome}</Text>
        <Text style={styles.item}>E-mail: {user.email}</Text>

        <TouchableOpacity style={styles.button} onPress={realizarLogout} >
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>

      </View>
    ):(
      <View>
      <Text style={styles.label}>E-mail:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail..."
            value={emailLogin}
            onChangeText={ (text) => setEmailLogin(text) } 
          />
          <Text style={styles.label}>Senha:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha..."
            value={password}
            onChangeText={ (text) => setPassword(text) }
            secureTextEntry 
            />
          <TouchableOpacity style={styles.button} onPress={postLogin}>
              <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
    </View>
    )}

    { showForm && (
      <View>
        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome..."
          value={nome}
          onChangeText={ (text) => setNome(text) } 
          />

        <Text style={styles.label}>E-mail:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o seu E-mail Ex.: jose@teste.cm"
          value={email}
          onChangeText={ (text) => setEmail(text) } 
          />
        <Text style={styles.label}>Senha:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha..."
          value={senha}
          onChangeText={ (text) => setSenha(text) } 
          secureTextEntry 
        />
        <TouchableOpacity style={styles.button} onPress={postUsuario}>
              <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    )}

    <TouchableOpacity onPress={alternarForm} style={{ marginTop: 8}}>
      <Text style={{ textAlign:"center", color: "#000" }}>
        {showForm ? "Cancelar" : "Novo Usuario"}
      </Text>
    </TouchableOpacity>
  
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