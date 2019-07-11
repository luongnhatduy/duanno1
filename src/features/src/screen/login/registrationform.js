import React, {Component} from 'react';
import {Text, StyleSheet, View,TouchableOpacity} from 'react-native';
import Container from 'features/src/libraries/component/Container';
import Header from 'features/src/libraries/component/Header';

export default class Registrationform extends Component {
  btloginphone=()=>{
      let type = 'signupphone'
      this.props.navigation.navigate('SignUpScreen',{type});
  }  
  btloginemail=()=>{
    let type = 'signupemail'
    this.props.navigation.navigate('SignUpScreen',{type});
}  
  render () {
    return (
      <Container>
        <Header back text="Sign up" check="login" {...this.props}/>
        <View style={styles.viewtxt}>
          <Text style={styles.txt}>
            Please choose one of the two forms of registration
          </Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={this.btloginphone}
        >
          <Text style={styles.txtSign}>Sign up by phone number</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={this.btloginemail}
        >
          <Text style={styles.txtSign}>Sign up by email </Text>
        </TouchableOpacity>
      </Container>
    );
  }
}

const styles = StyleSheet.create ({
  viewtxt: {
    margin: 40,
    alignItems: 'center',
  },
  txt: {
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
  },
  button: {
    margin: 30,
    
    marginBottom: 0,
    height: 45,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#183D57'
  },
  txtSign: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
