import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Importação das páginas
import Usuarios from "./src/pages/Usuarios";
import Produtos from "./src/pages/Produtos";

// Importação dos ícones
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

// Componente principal
export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          // Escondendo o cabeçalho em todas as telas
          headerShown: false, 

          // Esconder a barra de navegação quando o teclado estiver ativo
          tabBarHideOnKeyboard: true,

          // Desabilitar os rótulos (textos) da tab
          tabBarShowLabel: true,

          // Cor do ícone ativo da barra de navegação
          tabBarActiveTintColor: '#FFF',
          tabBarInactiveTintColor: '#0f4b11', // Ícone inativo (não selecionado)

          // Estilos da barra de navegação (tabBar)
          tabBarStyle: {
            backgroundColor: '#4CAF50',  // Cor de fundo escura
            borderTopWidth: 0,           // Remover borda superior
            height: 60,                  // Ajustar a altura da barra
            paddingBottom: 5,            // Padding extra para o alinhamento dos ícones
          }
        }}
      >
        {/* Tela de Usuários */}
        <Tab.Screen
          name="Usuarios"
          component={Usuarios}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome6 
                name="users" 
                size={size} 
                color={color} 
              />
            )
          }}
        />
        
        {/* Tela de Produtos */}
        <Tab.Screen
          name="Produtos"
          component={Produtos}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome6 
                name="book-open-reader" 
                size={size} 
                color={color} 
              />
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
