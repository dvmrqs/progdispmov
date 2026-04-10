import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListaDespesas from './screens/ListaDespesas';
import CadastroDespesa from './screens/CadastroDespesa';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#5e0acc' }, headerTintColor: 'white' }}>
        <Stack.Screen 
          name="ListaDespesas" 
          component={ListaDespesas} 
          options={{ title: 'Minhas Despesas' }} 
        />
        <Stack.Screen 
          name="CadastroDespesa" 
          component={CadastroDespesa} 
          options={{ title: 'Nova Despesa' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
