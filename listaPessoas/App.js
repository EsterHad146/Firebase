import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { bd } from './src/firebaseConnection';
import {doc, getDoc, onSnapshot} from 'firebase/firestore'

export default function App() {
  const [nome, setNome] = useState('')
  const [comentario, setComentario] = useState('')

  useEffect(()=>{
    async function getDados(){
      const docRef = doc(bd, 'Usuarios', 'RqZG3lMQ269hsbLjeBbJ')
      getDoc(docRef)
        .then((snapshot)=>{
          setNome(snapshot.data()?.nome)
          onSnapshot(doc(bd, 'Posts', 'X3eUiwF9R3ZszqyxAmpA'), (doc)=>{
            setComentario(doc.data()?.comentario)
          }) //onSnapshot = monitora e modifica em tempo real
        }) //funcionou? executa o que está nessa função
        .catch((err)=>{
          console.log(err)
        }) //Não funcionou? executa o que está nessa função
    }
    getDados()
  },[])

  return (
    <View style={styles.container}>
      <Text>Nome: {nome}</Text>
      <Text>Comentário: {comentario}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
