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
  Dimensions,
} from 'react-native';
import Header from '..//..//..//libraries/component/Header';
import FlatListFavorite from './FlatListFavorite';
import Container from '../../../libraries/component/Container';
export default class Favorite extends Component {
  constructor (props) {
    super (props);
    this.state = {};
  }
  keyExtractor = (item, index) => index.toString ();

  render () {
    return (
      <Container txt>
        <Header text="Profile" back save="Save" like={this.props.navigation.state.params.item.id} {...this.props} />
        <View style={styles.container}>     
          <View style={styles.top}>
            <Text style={styles.favorite}>
              {this.props.navigation.state.params.item.name}
            </Text>
            <Text style={styles.select}>Select your favorite <Text >{this.props.navigation.state.params.item.name.toLowerCase ()}</Text>
            <Text style={styles.max}> (Max {this.props.navigation.state.params.item.limit})</Text>
            </Text>
          </View>
          <FlatListFavorite
            id={this.props.navigation.state.params.item.id}
            limit={this.props.navigation.state.params.item.limit}
          />
          {/* <View style={styles.search}>
            <TouchableOpacity style={styles.button} onPress={this.check}>
              <Text style={styles.txt}>Save</Text>
            </TouchableOpacity>
          </View> */}

        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
  },
  top: {
    padding: 10,
  },
  favorite: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  select: {
    color: 'black',
  },
  search: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
  },
  button: {
    height: 50,
    margin: 50,
    backgroundColor: '#183D57',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 0,
    marginBottom: 10,
  },
  txt: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
  max:{
    fontStyle:'italic',
  }
});
