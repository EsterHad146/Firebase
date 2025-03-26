import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import FrmUsuario from './src/FrmUsuario';
export default function App() {
  return (
    <View style={styles.container}>
      <FrmUsuario />
    </View>
  );
}
 
const styles = StyleSheet.create({
  container:{
    flex:1, 
    marginTop:20,
    paddingTop: 40
  }
})