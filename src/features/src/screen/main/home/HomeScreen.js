import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  Alert,
  AsyncStorage,
} from 'react-native';
import Header from './/..//..//..//libraries/component/Header';
import ListHome from '..//..//..//libraries/component/ListHome';
import Container from '../../../libraries/component/Container';
export default class HomeScreen extends Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Image
        source={require ('..//..//..//img//radar.png')}
        style={{
          width: 30,
          height: 30,
          tintColor,
        }}
      />
    ),
  };
  constructor (props) {
    super (props);
    this.state = {};
  }

  render () {
    return (
      <Container txt>
        <Header banner />
        <ListHome {...this.props} />
      </Container>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
  },
});
