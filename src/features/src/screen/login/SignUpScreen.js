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
import Header from 'features/src/libraries/component/Header';
export default class SignUpScreen extends Component {
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
            <Text style={styles.signin}>Sign up</Text>
          </View>
          <View style={styles.viewinput}>
            <InputAccount {...this.props} />
          </View>
          <ButtonSignin text="signup" {...this.props} />
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
    fontSize: 22,
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
