import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { db } from "../../firebaseConnection";
import { deleteDoc, doc } from "firebase/firestore";

export function ListaProdutos({data, edit}){
    async function deletarProduto(){
        const docRef = doc(db, "Produtos", data.id)
        await deleteDoc(docRef)
    }

    function editarProduto(){
        edit(data)
    }

    return(
        <View style={style.container}>
            <Text>Nome: {data.nome}</Text>
            <Text>Descrição: {data.descricao}</Text>
            <Text>Preço: {data.preco}</Text>
            <Text>Estoque: {data.estoque}</Text>

            <TouchableOpacity style={style.button} onPress={editarProduto}>
                <Text style={style.buttonText}>Editar Produto</Text>
            </TouchableOpacity>

            <TouchableOpacity style={style.button} onPress={deletarProduto}>
                <Text style={style.buttonText}>Excluir Produto</Text>
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        backgroundColor: "#f0f0f0",
        padding: 8,
        borederRadius: 4,
        marginBottom:  14,
    },
    button:{
        backgroundColor: "#4CAF50",
        alignSelf: "flex-start",
        padding: 4,
        borderRadius: 4,
        marginTop: 16
    },
    buttonText: {
        color: "#FFF",
        paddingLeft: 8,
        paddingRight: 8,
    }
})