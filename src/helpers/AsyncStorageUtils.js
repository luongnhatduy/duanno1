import AsyncStorage from '@react-native-community/async-storage';

const KEY = {
  LAST_TIME_SHOW_RATING_DIALOG: 'LAST_TIME_SHOW_RATING_DIALOG',
  CAN_SHOW_RATING_DIALOG: 'CAN_SHOW_RATING_DIALOG',
};

function save(key, value) {
  AsyncStorage.setItem(key, value);
}

async function get(key) {
  return AsyncStorage.getItem(key);
}

export default {
  save,
  get,
  KEY,
};
