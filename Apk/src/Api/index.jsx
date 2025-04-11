import axios from "axios";

export const buscarMoedas = async () =>{
    const resposta = await axios.get('https://economia.awesomeapi.com.br/all');
    return resposta.data;
}
export const buscarTaxaCambio = async (moeda) =>{
    const resposta = await axios.get(`https://economia.awesomeapi.com.br/last/${moeda}-BRL`);
    return resposta.data [`${moeda}BRL`].ask
}