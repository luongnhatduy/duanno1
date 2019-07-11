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
  ScrollView
} from 'react-native';
import Container from '../../libraries/component/Container';
import Header from '../../libraries/component/Header';
import ModalLogin from 'features/src/libraries/component/ModalLogin';
import apis from 'features/src/libraries/Apis/Apis';
import NavigationService from 'features/src/config/NavigationService';
import { showLoading, hideLoading } from 'components/Loading/LoadingModal';
import { showFlashMessage } from 'helpers/Utils';
import constants from 'features/src/libraries/utils/constants';

export default class ChangePasswordSrceen extends Component {
  constructor (props) {
    super (props);
    this.state = {
      pass1: '',
      pass2: '',
      checkp: true,
      check1: true,
      check: false,
      messenger: '',
    };
  }
  componentDidMount () {
    this.setState ({
      check: false,
    });
  }
  reset = () => {
    this.setState ({
      check: false,
    });
  };
  backScreen = () => {
    this.props.navigation.goBack (null);
  };
  handlePassword = text => {
    this.setState ({
      pass1: text,
    });
  };
  handleconPassword = text => {
    this.setState ({
      pass2: text,
    });
  };
  send = () => {
    console.log (this.state.pass1.length, 'pass1');
    if (this.state.pass1 !== this.state.pass2) {
      this.setState ({
        check: true,
        messenger: 'password does not match',
      });
    } else {
      // if (this.state.pass1.length < 6 || this.state.pass1.length > 32) {
      //   this.setState ({
      //     check: true,
      //     messenger: 'Password cannot be less than 6 and exceed 32 characters',
      //   });
      // } else {
        showLoading();
        apis
          .postlogin (apis.PATH.CHANGE_PASSWORD, {
            phone: this.props.navigation.state.params.phone,
            password: this.state.pass1,
          })
          .then (res => {
            hideLoading();
            if (res.data.code === 200) {
              NavigationService.reset ('SignInScreen');
            } else {
              // this.setState ({
              //   check: true,
              //   messenger: res.data.msgdefault,
              // });
              showFlashMessage(res.data.msgdefault,constants.typeMessage.DANGER)
            }
          })
          .catch (err => {
            hideLoading();
            console.log ('loi', err);
            showFlashMessage('There was an error please try again',constants.typeMessage.DANGER)
          });
      
    }
    // this.props.navigation.navigate ('SignInScreen');
  };
  showpass = () => {
    this.setState ({
      checkp: !this.state.checkp,
    });
  };
  showpass1 = () => {
    this.setState ({
      check1: !this.state.check1,
    });
  };
  render () {
    console.log (this.props.navigation.state.params.phone, 'phone');
    let content = 'Enter the Phone Number you used to \n create an account';
    return (
      <Container>
        <Header text="Change Password" back check="login" {...this.props} />
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
            placeholder="New Password"
            placeholderTextColor="#000000"
            autoCapitalize="none"
            onChangeText={this.handlePassword}
            secureTextEntry={this.state.check1}
          />
          <TouchableOpacity onPress={this.showpass1} style={styles.showpass1}>
            <Image
              style={styles.eyes}
              source={require ('.//..//..//img/Union2.png')}
            />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="ConFirm Password"
            placeholderTextColor="#000000"
            autoCapitalize="none"
            onChangeText={this.handleconPassword}
            secureTextEntry={this.state.checkp}
          />
          <TouchableOpacity onPress={this.showpass} style={styles.showpass}>
            <Image
              style={styles.eyes}
              source={require ('.//..//..//img/Union2.png')}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={this.send}
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
  // input: {
  //   height: 40,
  //   margin: 0,
  //   top: 7,
  //   flex: 1,
   
  // },
  input: {
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    height: 40,
    margin: 0,
    color:'#183D57',
  },
  showpass: {
    position: 'absolute',
    bottom: 12,
    right: 0,
  },
  eyes: {
    height: 11,
    width: 20,
    tintColor: '#000000'
  },
  showpass1: {
    position: 'absolute',
    bottom: 65,
    right: 0,
  },
  inputOTP: {
    margin: 30,
    marginBottom: 0,
  },
  button: {
    margin: 30,
    marginBottom: 0,
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
