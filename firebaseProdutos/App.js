import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import { db } from './src/firebaseConnection'
import { doc, getDoc, onSnapshot, setDoc, collection, addDoc, getDocs } from 'firebase/firestore'
import { listaProdutos } from "./src/produtos";

export default function App(){
    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [preco, setPreco] = useState('')
    const [estoque, setEstoque] = useState('')
    const [produtos, setProdutos] = useState([])

    //Buscar dados no banco
    async function getDados(){
        const itensRef = collection(db, "Produtos");

        getDocs(itensRef)
        .then((snapshot)=>{
            let lista = [];
            snapshot.forEach((doc)=>{
                lista.push({
                    id:doc.id,
                    nome:doc.data().nome,
                    descricao:doc.data().descricao,
                    preco:doc.data().preco,
                    estoque:doc.data().estoque,
                })
            })
            setProdutos(lista);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    useEffect(()=>{
        getDados();
    }, [])

    //Registrar dados no banco
    async function registrarProduto(){
        await addDoc(collection(db, "Produtos"),{
            nome: nome,
            descricao: descricao,
            preco: parseFloat(preco),
            estoque: parseInt(estoque),
        })
        .then(()=>{
            console.log("Produto cadastrado com sucesso!")
            setNome("")
            setDescricao("")
            setPreco("")
            setEstoque("")
            getDados()
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    return(
        <View>
            <Text>Cadastrar Produto:</Text>

            <View>
                <Text>Nome:</Text>
                <TextInput
                    placeholder="Digite o nome do produto"
                    value={nome}
                    onChangeText={(text)=> setNome(text)}
                />

                <Text>Descrição do Produto:</Text>
                <TextInput
                    placeholder="Descreva o tipo do produto"
                    value={descricao}
                    onChangeText={(text)=> setDescricao(text)}
                />

                <Text>Preço:</Text>
                <TextInput
                    placeholder="Digite o preço: ex. 0.00 "
                    value={preco}
                    keyboardType="numeric"
                    onChangeText={(number)=> setPreco(number)}
                    />

                <Text>Quantidade de unidades em estoque:</Text>
                <TextInput
                    placeholder="Digite a quant. de produtos: ex. 00"
                    value={estoque}
                    keyboardType="numeric"
                    onChangeText={(number)=> setEstoque(number)}
                />
            </View>

            <TouchableOpacity onPress={registrarProduto}>
                <Text>Adicionar produto</Text>
            </TouchableOpacity>

            <Text>Produtos Cadastrados:</Text>

            <FlatList 
                data={produtos}
                keyExtractor={(item)=> String(item.id)}
                renderItem={({item}) => <listaProdutos data={item} />}
            />
        </View>

)
}
    
