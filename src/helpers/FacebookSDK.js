import { LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

async function loginWithFacebookSDK() {
  const loginResult = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
  if (loginResult.isCancelled) {
    throw new Error('Canceled by user');
  }

  const infoRequest = new GraphRequest('/me', null, (error, graphResult) => {
    if (error) {
      throw new Error(error);
    } else {
      return graphResult;
    }
  });
  // Start the graph request.
  new GraphRequestManager().addRequest(infoRequest).start();
}

function logOut() {
  LoginManager.logOut();
}

const FacebookSDK = {
  loginWithFacebookSDK,
  logOut,
};

export default FacebookSDK;
