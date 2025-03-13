import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { db } from '../../firebaseConnection';
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import {ListaProdutos } from "./produtos";
import { Titulo } from "../../components";

export default function Produtos() {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [estoque, setEstoque] = useState('');
    const [produtos, setProdutos] = useState([]);
    const [editar, setEditar] = useState(null);

    // Buscar dados no banco
    async function getDados() {
        try {
            const itensRef = collection(db, "Produtos");
            const snapshot = await getDocs(itensRef);
            const lista = [];
            snapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    nome: doc.data().nome,
                    descricao: doc.data().descricao,
                    preco: doc.data().preco,
                    estoque: doc.data().estoque,
                });
            });
            setProdutos(lista);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getDados();
    }, []);

    // Editar dados do Produto
    function editProduto(data) {
        setNome(data.nome);
        setDescricao(data.descricao);
        setPreco(String(data.preco));  // Garantir que o preço seja tratado como string
        setEstoque(String(data.estoque));  // Garantir que o estoque seja tratado como string
        setEditar(data.id);
    }

    async function editarProduto() {
        if (editar) {
            const docRef = doc(db, "Produtos", editar);
            await updateDoc(docRef, {
                nome: nome,
                descricao: descricao,
                preco: parseFloat(preco), // Converte para número
                estoque: parseInt(estoque), // Converte para inteiro
            }).then(() => {
                console.log("Produto atualizado com sucesso!");
                limparCampos(); // Limpar os campos após a edição
                getDados(); // Atualiza a lista de produtos
            }).catch((err) => {
                console.log("Erro ao atualizar produto: ", err);
            });
        }
    }

    // Registrar dados no banco
    async function registrarProduto() {
        if (nome && descricao && preco && estoque) {
            try {
                await addDoc(collection(db, "Produtos"), {
                    nome: nome,
                    descricao: descricao,
                    preco: parseFloat(preco), // Converte para número
                    estoque: parseInt(estoque), // Converte para inteiro
                });
                console.log("Produto cadastrado com sucesso!");
                limparCampos(); // Limpar os campos após o cadastro
                getDados(); // Atualiza a lista de produtos
            } catch (err) {
                console.log("Erro ao cadastrar produto: ", err);
            }
        } else {
            console.log("Por favor, preencha todos os campos.");
        }
    }

    // Limpar os campos do formulário
    function limparCampos() {
        setNome('');
        setDescricao('');
        setPreco('');
        setEstoque('');
        setEditar(null);
    }

    return (
        <View style={styles.container}>
            <Titulo text={editar ? "Editar Produto" : "Cadastrar Produto"} />

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Nome:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite o nome do produto"
                    value={nome}
                    onChangeText={(text) => setNome(text)}
                />

                <Text style={styles.label}>Descrição do Produto:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Descreva o tipo do produto"
                    value={descricao}
                    onChangeText={(text) => setDescricao(text)}
                />

                <Text style={styles.label}>Preço:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite o preço: ex. 0.00"
                    value={preco}
                    keyboardType="numeric"
                    onChangeText={(number) => setPreco(number)}
                />

                <Text style={styles.label}>Quantidade de unidades em estoque:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite a quant. de produtos: ex. 00"
                    value={estoque}
                    keyboardType="numeric"
                    onChangeText={(number) => setEstoque(number)}
                />
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={editar ? editarProduto : registrarProduto}
            >
                <Text style={styles.buttonText}>{editar ? "Atualizar Produto" : "Adicionar Produto"}</Text>
            </TouchableOpacity>

            <Text style={styles.productsTitle}>Produtos Cadastrados:</Text>

            <FlatList
                data={produtos}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <ListaProdutos
                        data={item}
                        edit={editProduto}  // Passando a função editProduto como prop
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
    },

    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 10,
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    productsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});
