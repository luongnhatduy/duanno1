import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Platform,
  AsyncStorage,
  ScrollView,
} from 'react-native';
import NavigationService from 'features/src/config/NavigationService';
import {connect} from 'react-redux';
import apis from 'features/src/libraries/Apis/Apis';
import firebase from 'react-native-firebase';
import ModalLogin from 'features/src/libraries/component/ModalLogin';
import Header from '../../libraries/component/Header';
import Container from '../../libraries/component/Container';
import { showLoading, hideLoading } from 'components/Loading/LoadingModal';
import { hideMessage } from 'react-native-flash-message';
import { showFlashMessage } from 'helpers/Utils';
import constants from 'features/src/libraries/utils/constants';

class InputOTPScreen extends Component {
  constructor (props) {
    super (props);
    this.state = {
      check: false,
      messenger: '',
      SDT: this.props.task.taskPhone,
      OTP: '',
      count: 60,
      timePassed: false,
      confirmResult: null,
      value: '',
      txtphone: '',
      value: '',
      txtphone: '',
    };
  }

  componentDidMount () {
    this.setState ({
      check: false,
    });
    this.reSendCode ();
    // if (this.props.navigation.state.params.type && this.props.navigation.state.params.type === 'signupemail') {
    //   this.sentOTPemail ();
    // }
    // if (this.props.navigation.state.params.type && this.props.navigation.state.params.type === 'signupphone') {
    //   this.setOTPphone ();
    // }
    // if (this.props.navigation.state.params.register && this.props.navigation.state.params.register !== 'register') {
    //   this.setOTPphone ();
    // }
    this.setOTPphone ();
    if (Platform.OS === 'android') {
      this.unsubscribe = firebase.auth ().onAuthStateChanged (user => {
        if (user) {
          console.log (user, 'day');
          if (this.props.navigation.state.params.register === 'register') {
            this.register ();
          } else {
            let phone = this.props.navigation.state.params.register;
            this.props.navigation.navigate ('ChangePasswordSrceen', {phone});
          }
        }
      });
    }
  }
  setOTPphone = () => {
    firebase
      .auth ()
      .signInWithPhoneNumber (this.state.SDT)
      .then (confirmResult => {
        console.log (confirmResult, 'đã gửi mã');
        this.setState ({confirmResult});
      })
      .catch (error => console.log (error, 'chưa gửi được mã'));
  };
  componentWillUnmount () {
    clearInterval (this.counts);
    if (this.unsubscribe) this.unsubscribe ();
  }
  reSendCode = () => {
    this.counts = setInterval (() => {
      if (this.state.count > 0) {
        this.setState ({count: this.state.count - 1});
      }
    }, 1000);
  };
  sentOTPemail = () => {
    apis
      .postregister (apis.PATH.SENTOTP, {
        phone: this.props.task.taskPhone,
      })
      .then (res => {
        console.log (res, 'sent otp');
      })
      .catch (err => {
        console.log ('loi', err);
      });
  };

  backScreen = () => {
    this.props.navigation.goBack (null);
  };

  send = () => {
    this.checkotpphone ();
  };
  handlePhone = txt => {
    this.setState ({
      OTP: txt,
    });
  };
  tabbar = async () => {
    // if (this.props.navigation.state.params.type && this.props.navigation.state.params.type=== 'signupemail') {
    //   this.checkotpemail();
    // } else {
    this.checkotpphone ();
    // }
  };
  checkotpemail = () => {
    apis
      .postregister (apis.PATH.CHECK_OTP, {
        phone: this.props.task.taskPhone,
        otp: this.state.OTP,
      })
      .then (res => {
        console.log (res.code, 'check otp');
        if (res.code === 200) {
          this.register ();
        } else {
          this.setState ({
            check: true,
            messenger: 'OTP code incorrect',
          });
        }
      })
      .catch (err => {
        this.setState ({
          check: true,
          messenger: 'OTP code incorrect',
        });
        console.log ('loi', err);
      });
  };

  checkotpphone = () => {
    const {confirmResult, OTP} = this.state;
    if (OTP === '') {
      this.setState ({
        check: true,
        messenger: 'OTP code incorrect',
      });
    } else {
      if (confirmResult) {
        showLoading();
        confirmResult
          .confirm (OTP)
          .then (() => {
            hideLoading();
            if (this.props.navigation.state.params.register === 'register') {
              this.register ();
            } else {
              let phone = this.props.navigation.state.params.register;
              this.props.navigation.navigate ('ChangePasswordSrceen', {phone});
            }
          })
          .catch (error => {
            hideLoading();
            console.log (error, 'loi');
            this.setState ({
              check: true,
              messenger: 'OTP code incorrect',
            });
          });
      } else {
        this.setState ({
          check: true,
          messenger: 'OTP code incorrect',
        });
        console.log ('chua dc ban oi');
      }
    }
  };
  register = () => {
    showLoading();
    apis
      .postregister (apis.PATH.REGISTER, {
        phone: this.props.task.taskPhone,
        password: this.props.task.taskPassword,
      })
      .then (res => {
        hideLoading();
        console.log (res.data.token, 'login');
        if (res.code === 200) {
          this.props.navigation.state.params.check;
          NavigationService.reset ('Username');
          AsyncStorage.setItem ('TOKEN', `${res.data.token}`);
        } else {
          showFlashMessage(res.msgdefault,constants.typeMessage.DANGER)
        }
      })
      .catch (err => {
        hideLoading();
       // showFlashMessage('There was an error please try again',constants.typeMessage.DANGER)
        console.log ('loi', err);
      });
  };

  reset = () => {
    this.setState ({
      check: false,
    });
  };
  onReSendCode = () => {
    this.setState ({count: 60});
    this.setOTPphone ();
  };
  render () {
    // console.log (this.props.navigation.state.params.register, 'register');
    // console.log(this.state.SDT,'SDT')
    const content =
      'An authentication code has been sent to\nyour phone number. Please enter the OTP\ncode for authentication';
    this.btsend = this.props.navigation.state.params.register === 'register'
      ? this.tabbar
      : this.send;
    return (
      <Container>
        <Header text="Enter OTP" back check="login" {...this.props} />
        <ScrollView>
          <View style={{margin: 40, alignItems: 'center'}}>
            <Text style={{fontSize: 15, color: 'black', textAlign: 'center'}}>
              {content}
            </Text>
          </View>
          <View style={styles.inputOTP}>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="OTP code"
              placeholderTextColor="#000000"
              autoCapitalize="none"
              onChangeText={this.handlePhone}
            />
            {this.state.count == 0
              ? <TouchableOpacity onPress={this.onReSendCode}>
                  <Text style={styles.sendagain}>
                    Send again({this.state.count})
                  </Text>
                </TouchableOpacity>
              : <Text style={styles.sendagain}>
                  Send again({this.state.count})
                </Text>}

          </View>
          <View>
            <TouchableOpacity
              onPress={this.btsend}
              style={[styles.button, {backgroundColor: '#183D57'}]}
            >
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
                Complete
              </Text>
            </TouchableOpacity>
          </View>
          {this.state.check === true
            ? <ModalLogin
                check={this.state.check}
                messenger={this.state.messenger}
                reset={this.reset}
              />
            : <View />}
        </ScrollView>
      </Container>
    );
  }
}
const mapStatetoProps = state => {
  return {
    task: !state.taskReducers ? [] : state.taskReducers,
  };
};
const mapDispatToProps = dispatch => {
  return {};
};
export default connect (mapStatetoProps, mapDispatToProps) (InputOTPScreen);
const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  header: {
    ...Platform.select ({
      ios: {
        margin: 0,
        height: 50,
      },
      android: {
        margin: 0,
        height: 50,
      },
    }),
  },
  img1: {
    width: 10,
    height: 20,
  },
  input: {
    height: 40,
    margin: 0,
    top: 7,
    flex: 1,
    color: '#183D57',
  },
  input: {
    height: 40,
    margin: 0,
    top: 7,
    flex: 1,
  },
  inputOTP: {
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    margin: 30,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    margin: 30,
    marginBottom: 0,
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendagain: {
    color: '#2A404B',
    marginTop: 15,
  },
});
