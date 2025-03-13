import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConnection";
import { Botao } from "../../components";

export function UsersList({data, edit}){
    
   async function deletarItem(){
    const docRef = doc(db, "Usuarios", data.id)
    await deleteDoc(docRef)
   }

   function handleEditar(){
        edit(data)
   }

    return(
        <View style={styles.container}>
            <Text>Nome: {data.nome}</Text>
            <Text>CPF: {data.cpf}</Text>
            <Text>E-mail: {data.email}</Text>

            {/* <Botao onPress={handleEditar} children="Editar usuario"/>
             */}
            <TouchableOpacity style={styles.button} onPress={handleEditar}>
                <Text style={styles.buttonText}>Editar usuario</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={deletarItem}>
                <Text style={styles.buttonText}>Deletar usuario</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor: "#f0f0f0",
        padding: 8,
        borderRadius: 4,
        marginBottom:14,
    },
    button:{
        backgroundColor: "#000",
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