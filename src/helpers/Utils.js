import { Keyboard, Linking } from 'react-native';
import VersionCheck from 'react-native-version-check';
import { showMessage } from "react-native-flash-message";

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

export function showFlashMessage(message, type) {
  showMessage({
      message: message,
      type: type ? type : 'info',
  });
}
