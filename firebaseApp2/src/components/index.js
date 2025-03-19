import React, { Component } from "react";
import { Button, TextInput, Text, TouchableOpacity, StyleSheet } from "react-native";

// Componente Título
class Titulo extends Component {
    render() {
        return (
            <Text style={styles.titulo}>{this.props.text}</Text>
        );
    }
}

// Componente Botão
class Botao extends Component {
    render() {
        return (
            <TouchableOpacity
                style={[styles.botao, this.props.disabled && styles.botaoDesabilitado]}
                onPress={this.props.onClick}
                disabled={this.props.disabled}
            >
                <Text style={styles.textoBotao}>{this.props.children}</Text>
            </TouchableOpacity>
        );
    }
}

// Componente Caixa de Texto
class CaixaTexto extends Component {
    render() {
        const { type, value, onChange, text, required } = this.props; // Pegando as props
        return (
            <TextInput
                style={styles.caixaTexto}
                keyboardType={type}
                value={value}
                onChangeText={onChange}
                placeholder={text}
                required={required}
            />
        );
    }
}

// Estilos
const styles = StyleSheet.create({
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginVertical: 45,
    },
    botao: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        marginBottom: 20,
    },
    botaoDesabilitado: {
        backgroundColor: '#CCCCCC',
    },
    textoBotao: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
    caixaTexto: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 10,
    }
});

export { Titulo, Botao, CaixaTexto };
