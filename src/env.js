import { Platform } from 'react-native';

let NODE_DEV = 'development';

// eslint-disable-next-line no-undef
if (__DEV__) {
  NODE_DEV = 'development';
} else {
  NODE_DEV = 'production';
}

console.log('Environment: ', NODE_DEV);

const serverURL = {
  development: 'server-url-development',
  production: 'server-url-production',
};

const codePushKey = {
  development: Platform.OS === 'ios' ? 'ios-key-development' : 'android-key-development',
  production: Platform.OS === 'ios' ? 'ios-key-development' : 'android-key-development',
};

const oneSignalKey = {
  development: 'onesignal-key-development',
  production: 'onesignal-key-production',
};

const SENTRY_KEY = 'sentry-key-here';

export default {
  currentNode: NODE_DEV,
  serverURL: serverURL[NODE_DEV],
  codePushKey: codePushKey[NODE_DEV],
  oneSignalKey: oneSignalKey[NODE_DEV],
  sentryKey: SENTRY_KEY,
};
