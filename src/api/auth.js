import { post } from './helpers';
import { SIGNIN } from './constants';

export function signin() {
  post(SIGNIN, {}, false).then({});
}
