/**
 * @format
 */
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import Dasboard from './Screens/Dasboard';
import { RNSScreenStackHeaderConfig } from 'react-native-screens';
import LoginScreen from './Screens/LoginScreen';
import SearchPage from './Screens/SearchPage';

AppRegistry.registerComponent(appName, () => Dasboard);
//AppRegistry.registerComponent('RNSScreenStackHeaderConfig', () => RNSScreenStackHeaderConfig);
//AppRegistry.registerComponent('main', () => Dasboard);
