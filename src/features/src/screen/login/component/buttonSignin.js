import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  AsyncStorage,
} from 'react-native';
import NavigationService from './/..//..//..//config/NavigationService';
import {connect} from 'react-redux';
import axios from 'axios';
import apis from '../../../libraries/Apis/Apis';
import ModalLogin from './/..//..//..//libraries/component/ModalLogin';
import {LoginButton, AccessToken, LoginManager} from 'react-native-fbsdk';
import FacebookSDK from 'helpers/FacebookSDK';
import {showLoading, hideLoading} from 'components/Loading/LoadingModal';
import {GoogleSignin, statusCodes} from 'react-native-google-signin';
import {showFlashMessage} from '..//..//..//..//..//helpers/Utils'
import constants from 'features/src/libraries/utils/constants';
class ButtonSignin extends Component {
  constructor (props) {
    super (props);
    this.state = {
      phone: 'sddswdsd',
      password: '',
      check: false,
      messenger: '',
    };
  }

  componentDidMount () {
    this.setState ({
      check: false,
    });
    GoogleSignin.configure ({
      iosClientId: '1088263031186-l3nasltpgpn0iuh5b85i9jtr3aaohrhb.apps.googleusercontent.com',
      webClientId: '1088263031186-gv44c982akil7s0ei6ie2ctjdtc8c4un.apps.googleusercontent.com',
      //webClientId: '1088263031186-gv44c982akil7s0ei6ie2ctjdtc8c4un.apps.googleusercontent.com',
      // offlineAccess: true,
    });
  }
  signup = () => {
    this.props.navigation.navigate ('SignUpScreen');
  };
  signin = () => {
    this.props.navigation.navigate ('SignInScreen');
  };
  forgotpass = () => {
    this.props.navigation.navigate ('ForgotPasswordScreen');
  };
  reset = () => {
    this.setState ({
      check: false,
    });
  };
  Login = async() => {
    showLoading();
    apis
      .postlogin (apis.PATH.LOGIN, {
        phone: this.props.task.taskPhone,
        password: this.props.task.taskPassword,
      })
      .then (res => {
        hideLoading();
        console.log(res.data.data.full_name,'login')
        if (res.data.code === 200) {
          if (res.data.data.full_name===null){
            NavigationService.reset ('Username');
          }else{
            NavigationService.reset('TabBar')
          }
          AsyncStorage.setItem('TOKEN', `${res.data.data.token}`);
        } else {
          showFlashMessage(res.data.msgdefault, constants.typeMessage.DANGER)
        }
      })
      .catch (err => {
        hideLoading();
        console.log ('loi', err);
       
        showFlashMessage('Account or password is incorrect', constants.typeMessage.DANGER)
      });
  };
  register = () => {
    showLoading();
    apis
      .postlogin (apis.PATH.CHECK, {
        phone: this.props.task.taskPhone,
        password: this.props.task.taskPassword,
      })
      .then (res => {
        hideLoading();
        console.log (res, 'checkphone');
        if (res.data.code === 200) {
          console.log (this.props.task.taskPassword.length, 'lenght');
          if (this.props.task.taskPassword.length < 6 ||this.props.task.taskPassword.length > 32) {
            // this.setState ({
            //   check: true,
            //   messenger: 'Password cannot be less than 6 and exceed 32 characters',
            // });
            showFlashMessage('Password cannot be less than 6 and exceed 32 characters', constants.typeMessage.DANGER)
          }else{
            let register = 'register';
            this.props.navigation.navigate ('InputOTPScreen',{register});
          }
        } else {
          hideLoading();
          // this.setState ({
          //   check: true,
          //   messenger: res.data.msgdefault,
          // });
          showFlashMessage(res.data.msgdefault, constants.typeMessage.DANGER)
        }
      })
      .catch (err => {
        console.log ('loi', err);
        // this.setState ({
        //   check: true,
        //   messenger: 'ERROR',
        // });
        showFlashMessage('There was an error please try again', constants.typeMessage.DANGER)
      });
    
  };
  loginfb = async() => {
  
    LoginManager.logInWithReadPermissions (['public_profile']).then (
      function (result) {
        if (result.isCancelled) {
          console.log ('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken ().then (data => {
            if (data.accessToken) {
              console.log (data.accessToken, 'token');
              showLoading ();
              apis
                .postlogin (apis.PATH.LOGIN_FB, {
                  access_token: data.accessToken.toString (),
                })
                .then (res => {
                  console.log (res.data.data, 'login-fb');
                  if (res.data.code === 200) {
                    hideLoading ();
                    if (!res.data.data.birthday){
                      NavigationService.reset ('Birdth');
                    }else{
                      NavigationService.reset('TabBar')
                    }
                    AsyncStorage.setItem('TOKEN', `${res.data.data.token}`);
                  } else {
                   hideLoading ();
                  }
                })
                .catch (err => {
                 hideLoading ();
                  console.log ('loi', err);
                  // this.setState ({
                  //   check: true,
                  //   messenger: 'Login failed',
                  // });
                  showFlashMessage('Error!please login again', constants.typeMessage.DANGER)
                });
            }
          });
        }
      },
      function (error) {
        console.log ('Login fail with error: ' + error);
      }
    );
  };
  logingg = async () => {
    try {
      await GoogleSignin.hasPlayServices ();
      const userInfo = await GoogleSignin.signIn ();
      const token = await GoogleSignin.getTokens ();
      console.log (token.accessToken, 'token');
      await GoogleSignin.revokeAccess ();
      await GoogleSignin.signOut ();
     showLoading ();
      apis
        .postlogin (apis.PATH.LOGIN_GG, {
          access_token: token.accessToken,
        })
        .then (res => {
          console.log (res.data.data.full_name, 'login-gg');
          if (res.data.code === 200) {
           hideLoading ();
           if (!res.data.data.birthday){
            NavigationService.reset ('Birdth');
          }else{
            NavigationService.reset('TabBar')
          }
            AsyncStorage.setItem('TOKEN', `${res.data.data.token}`);
          } else {
          hideLoading ();
          }
        })
        .catch (err => {
          hideLoading ();
          console.log ('loi', err);
          // this.setState ({
          //   check: true,
          //   messenger: 'Login failed',
          // });
          showFlashMessage('There was an error please try again', constants.typeMessage.DANGER)
        });
    } 
    catch (error) {
      hideLoading ();
      console.log (error, 'loi gg');
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      }
    }
  };

  render () {
    const checkSign = this.props.text === 'signin' ? 'Sign in' : 'Sign up';
    const checkSign2 = this.props.text === 'signin' ? 'Sign up' : 'Sign in';
    this.btlogin = this.props.text === 'signin' ? this.Login : this.register;
    this.onPress = this.props.text === 'signin' ? this.signup : this.signin;
    const acc = this.props.text === 'signin'
      ? "Don't have an account yet? "
      : "Have account? ";
    console.log (this.state.check, 'chek', this.state.messenger);
    console.log (this.props.task.taskPhone, this.props.task.taskPassword);
    return (
      <View style={styles.container}>
        <View style={styles.viewForgot}>
          <TouchableOpacity onPress={this.forgotpass}>
            <Text style={styles.forgotpass}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.button, {backgroundColor: '#183D57'}]}
          onPress={this.btlogin}
        >
          <Text style={styles.txtSign}>{checkSign}</Text>
        </TouchableOpacity>
        <View style={styles.or}>
          <Text>OR</Text>
        </View>
        <View>
          <TouchableOpacity
            style={[styles.button, styles.btsigninfb]}
            onPress={this.loginfb}
          >
            <Image
              style={styles.img1}
              source={require ('.//..//..//..//img/facebook.png')}
              resizeMode="stretch"
            />
            <Text style={styles.txtSigngg}>Login with Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.btsigningg]}
            onPress={this.logingg}
          >
            <Image
              style={styles.img}
              source={require ('.//..//..//..//img/google-plus.png')}
              resizeMode="stretch"
            />
            <Text style={styles.txtSigngg}>Login with Google</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <View style={styles.viewno}>
            <Text style={styles.txtnoac}>{acc}</Text>
            <TouchableOpacity onPress={this.onPress}>
              <Text style={styles.signup}>{checkSign2}</Text>
            </TouchableOpacity>
          </View>
        </View>
        {this.state.check === true
          ? <ModalLogin
              check={this.state.check}
              messenger={this.state.messenger}
              reset={this.reset}
            />
          : <View />}

      </View>
    );
  }
}
mapStatetoProps = state => {
  return {
    task: !state.taskReducers ? [] : state.taskReducers,
  };
};
export default connect (mapStatetoProps) (ButtonSignin);

const styles = StyleSheet.create ({
  container: {
    margin: 15,
    marginTop: 0,
  },
  viewForgot: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    marginBottom: 10,
    left: 15,
  },
  button: {
    margin: 30,
    marginTop: 0,
    marginBottom: 0,
    height: 45,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtSign: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  or: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  btsigninfb: {
    backgroundColor: '#53A2D6',
    flexDirection: 'row',
  },
  img: {
    height: 15,
    width: 20,
    marginRight: 3,
  },
  img1: {
    height: 15,
    width: 10,
    marginRight: 3,
  },
  signinfb: {
    color: 'white',
    fontSize: 16,
    marginLeft: 3,
  },
  btsigningg: {
    backgroundColor: '#DC4E41',
    marginTop: 10,
    flexDirection: 'row',
  },
  txtSigngg: {
    color: 'white',
    fontSize: 16,
    marginLeft: 3,
  },
  footer: {alignItems: 'center', marginTop: 25},
  forgotpass: {
    color: '#515C6F',
    fontSize: 13,
    right: 30,
  },
  viewno: {flexDirection: 'row'},
  txtnoac: {color: 'black', fontSize: 16, marginRight: 1},
  signup: {
    color: '#FF4E3E',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 1,
  },
});
