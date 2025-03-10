import { View, StyleSheet, Text } from "react-native";

export function Userlist({data}){
    return(
        <View style={style.container}>
            <Text>Nome: {data.nome}</Text>
            <Text>CPF: {data.cpf}</Text>
            <Text>E-mail: {data.email}</Text>
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