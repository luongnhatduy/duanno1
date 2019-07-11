import { Keyboard, Linking } from 'react-native';
import VersionCheck from 'react-native-version-check';

function hideKeyboard() {
  Keyboard.dismiss();
}

async function openStore() {
  Linking.openURL(await VersionCheck.getStoreUrl());
}

export default {
  hideKeyboard,
  openStore,
};
