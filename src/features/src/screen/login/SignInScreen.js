import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Image,
  Platform,
  ScrollView
} from 'react-native';
import Container from '../../libraries/component/Container';
import InputAccount from './component/inputAccount';
import ButtonSignin from './component/buttonSignin';

export default class SignInScreen extends Component {
  signup = () => {
    this.props.navigation.navigate ('SignUpScreen');
  };
  forgotpass = () => {
    this.props.navigation.navigate ('ForgotPasswordScreen');
  };
  render () {
    return (
      <Container>
        <ScrollView>
        <View style={styles.header}>
          <Text style={styles.signin}>Sign in</Text>
        </View>
        <View style={styles.viewinput}>
          <InputAccount {...this.props}/>
        </View>
        <ButtonSignin text='signin' {...this.props}/>
        </ScrollView>
      </Container>
    );
  }
}
const styles = StyleSheet.create ({
  header: {
    ...Platform.select ({
      ios: {
        marginTop: 35,
        alignItems: 'center',
      },
      android: {
        marginTop: 10,
        alignItems: 'center',
      },
    }),
  },
  signin: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 24,
  },

  showpass: {
    position: 'absolute',
    bottom: 12,
    right: 0,
  },
  viewinput: {
    marginTop: 110,
    margin: 30,
    marginBottom: 0,
  },
});
