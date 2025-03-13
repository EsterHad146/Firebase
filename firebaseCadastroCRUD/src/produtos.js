import { View, StyleSheet, Text } from "react-native";

export function listaProdutos({data}){
    return(
        <View style={style.container}>
            <Text>Nome: {data.nome}</Text>
            <Text>Descrição: {data.descricao}</Text>
            <Text>Preço: {data.preco}</Text>
            <Text>Estoque: {data.estoque}</Text>
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
})