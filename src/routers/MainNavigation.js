import { createSwitchNavigator, createAppContainer } from 'react-navigation';
// import AuthNavigator from 'libraries/components/AuthTemplate/Airbnb/AuthNavigator';
import MainNavigator from './MainNavigator';

const mainStack = createSwitchNavigator({
  // Auth: AuthNavigator,
  Main: MainNavigator,
});
const MainNavigation = createAppContainer(mainStack);
export default MainNavigation;
