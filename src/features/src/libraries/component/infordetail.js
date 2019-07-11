import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ScrollView,
  FlatList,
  AsyncStorage,
  Dimensions,
} from 'react-native';
import Container from './Container';
import Header from './Header';
import apis from '../Apis/Apis';
class FlatListItem extends Component {
  componentDidMount(){

  }
  render () {
    const {item} = this.props;
    color = this.props.val && this.props.val.id && this.props.val.id === item.id
      ? 'black'
      : '#666666';
    return (
      <TouchableOpacity style={styles.viewItem} onPress={this.props.onCheck}>
        <Text style={[styles.txt, {color}]}>{this.props.item.name}</Text>
        {this.props.val && this.props.val.id && this.props.val.id === item.id
          ? <Image
              style={styles.img}
              source={require ('./../../img/Check.png')}
              resizeMode="stretch"
            />
          : <View />}
      </TouchableOpacity>
    );
  }
}
export default class InforDetail extends Component {
  state = {
    data: [],
    id: null,
    val: {},
    parent: null,
  };
  componentDidMount () {
    console.log(this.props.navigation.state.params.item.id,'id')
    apis
      .fetch (
        apis.PATH.UESR_INFO + this.props.navigation.state.params.item.id,
        true
      )
      .then (res => {
        console.log (res, 'information');
        if (res.code === 200) {
          this.setState ({
            data: res.data,
          });
        }
        for (i = 0; i < res.data.length; i++) {
          console.log(res.data[i],'data')
          if (res.data[i].selected === 1) {
            this.setState ({val: res.data[i]});
          }
        }
      })
      .catch (err => {
        console.log ('loi', err);
      });
  }
  onCheck = val => () => {
    this.setState ({val, id: val.id, parent: val.parend_id});
  };
  keyExtractor = (item, index) => index.toString ();
  render () {
    const newData = [this.state.id];
    console.log(this.state.val,'val');
    let aboutme = 'aboutme'
    return (
      <Container txt>
        <Header
          idif={newData}
          aboutme={aboutme}
          parent={this.state.parent}
          back
          text={this.props.navigation.state.params.item.name}
          save="Save"
          {...this.props}
        />
        <FlatList
          data={this.state.data}
          keyExtractor={this.keyExtractor}
          renderItem={({item, index}) => {
            return (
              <FlatListItem
                item={item}
                index={index}
                id={this.id}
                i={this.state.id}
                {...this.props}
                onCheck={this.onCheck(item)}
                val={this.state.val}
              />
            );
          }}
          extraData={this.state}
        />
      </Container>
    );
  }
}
const styles = StyleSheet.create ({
  viewItem: {
    padding: 10,
    borderBottomColor: '#CCCCCC',
    borderTopColor: '#CCCCCC',
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    alignItems:'center',
    justifyContent: 'center',
  },
  txt: {
    color: '#666666',
    fontSize: 16,
  },
  img: {
    height: 15,
    width: 20,
    position:'absolute',
    right:10,
    top:10
  },
});
