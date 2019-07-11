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
import Content from './Content';
import Header from '..//..//..//libraries/component/Header';
import Favorite from './Favorite';
import Container from '../../../libraries/component/Container';
export default class ProFileScreen extends Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Image
        source={require ('..//..//..//img//home.png')}
        style={{
          width: 30,
          height: 25,
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
        <View style={styles.container}>
          <Content {...this.props} />
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    backgroundColor: '#F7F7F7',
    flex: 1,
  },
});
