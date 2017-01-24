import { AppRegistry,UIManager } from 'react-native';
import Root from './app/root';

UIManager.setLayoutAnimationEnabledExperimental(true);

AppRegistry.registerComponent('SiliconValleyBank', ()=>Root);
