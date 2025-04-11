import React from "react";
import { Picker } from "@react-native-picker/picker";

const CaixaSelecao = ({ moedas, moedaSelecionada, onChangeMoeda }) => {
    return (
        <Picker
            selectedValue={moedaSelecionada}
            style={{ height: 50, width: '100%', marginBottom: 20 }}
            onValueChange={(itemValue) => onChangeMoeda(itemValue)}
        >
            {moedas.map((moeda) => {
                <Picker.Item
                    key={moeda}
                    label={moeda}
                    value={moeda} 
                />
            })}
        </Picker>
    )
};
export default CaixaSelecao;