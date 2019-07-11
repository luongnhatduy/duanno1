import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

// eslint-disable-next-line no-undef
const dev = __DEV__;

function configure() {
  Reactotron.configure() // controls connection & communication settings
    .useReactNative() // add all built-in react native plugins
    .use(sagaPlugin())
    .use(reactotronRedux());

  connectConsoleToReactotron();
  return Reactotron.connect();
}

function connectConsoleToReactotron() {
  if (!dev) return;
  console.log = Reactotron.log;
  console.warn = Reactotron.warn;
  console.error = Reactotron.error;
}

export default {
  configure,
};
