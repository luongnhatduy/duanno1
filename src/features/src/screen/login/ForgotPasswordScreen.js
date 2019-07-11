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
import apis from 'features/src/libraries/Apis/Apis';
import ModalLogin from 'features/src/libraries/component/ModalLogin';
import InputAccount from './component/inputAccount';
import { showLoading, hideLoading } from 'components/Loading/LoadingModal';
import { showFlashMessage } from 'helpers/Utils';
import constants from 'features/src/libraries/utils/constants';
export default class ForgotPasswordScreen extends Component {
  constructor (props) {
    super (props);
    this.state = {
     phone:'',
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
  handlePhone=(text)=>{
    this.setState({
      phone : text
    })  
  }
  backScreen = () => {
    this.props.navigation.goBack (null);
  };

  setnumber=(txt,ma)=>{
   
    this.setState({
      phone : '+' + ma + txt
    })  
  }
  send = () => {
    showLoading();
    apis
      .postregister (apis.PATH.CHECK_PHONE, {
        phone: this.state.phone,
      })
      .then (res => { 
        hideLoading();
        //console.log (res.msgdefault, 'checkphone');
        if (res.code === 200) {
          let register = this.state.phone
          this.props.navigation.navigate('InputOTPScreen',{register});
        } else {
        
          showFlashMessage('Data does not exist in the system',constants.typeMessage.DANGER)
        }
      })
      .catch (err => {
        hideLoading();
        showFlashMessage('There was an error please try again',constants.typeMessage.DANGER)
        console.log ('loi', err);
      });
  };
  render () {
    let content = 'Enter the Phone Number you used to \n create an account' 
    console.log(this.state.phone,'phonenumberforgot')
    return (
      <Container>
        <Header text="Forgot Password" back check="login" {...this.props} />
        <ScrollView>
        <View style={{margin: 40, alignItems: 'center'}}>
          <Text style={{fontSize: 15, color: 'black',textAlign: 'center',}}>
            {content}
          </Text>
        </View>
        <View style={styles.inputOTP}>
        {/* <TextInput
           style={styles.input}
           underlineColorAndroid="transparent"
           placeholder="Email/Phone number"
           placeholderTextColor="#000000"
           autoCapitalize="none"
           onChangeText={this.handlePhone}
         /> */}
          <InputAccount forgot setnumber={this.setnumber} {...this.props}/>
        </View> 
       
        <View>
          <TouchableOpacity
            onPress={this.send}
            style={[styles.button, {backgroundColor: '#183D57'}]}
          >
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
              Send
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
  input: {
    height: 40,
    margin: 0,
    top: 7,
    flex: 1,
  },
  input: {
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    height: 40,
    margin: 0,
    color:'#183D57'
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
