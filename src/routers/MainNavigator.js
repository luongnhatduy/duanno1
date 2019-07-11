import { createStackNavigator } from 'react-navigation';
import ExampleContainer from '../features/example/containers/ExampleContainer';


const MainNavigator = createStackNavigator(
  {
    HomeScreen: { screen: ExampleContainer },
  },
  {
    headerMode: 'none',
  },
);
export default MainNavigator;
