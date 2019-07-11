import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FacebookSDK from 'helpers/FacebookSDK';

class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onFacebookPressed = () => {
    FacebookSDK.loginWithFacebookSDK().then(res => {
      console.log(res)
    });
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity
          onPress={this.onFacebookPressed}
        >
          <Text>Login with Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text>Login with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text>Login with phone</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Example;
