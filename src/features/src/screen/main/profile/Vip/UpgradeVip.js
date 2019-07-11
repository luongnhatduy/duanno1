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
import Header from '..//..//..//..//libraries/component/Header';
import ListChat from '..//..//..//..//libraries/component/ListChat';
import Container from '../../../../libraries/component/Container';
const ITEM_WIDTH = Dimensions.get ('window').width;

class Item extends Component {
  render () {
    return (
      <View style={styles.contai}>
        <View style={styles.item}>
          <Image
            style={styles.imgbgr}
            source={this.props.imgbgr}
            resizeMode="stretch"
          />
          <Image
            style={styles.imgit}
            source={this.props.imgit}
            resizeMode="stretch"
          />
          <View style={styles.content}>
            <View style={styles.left}>
              <Text style={styles.textup}>{this.props.textup}</Text>
              <Text style={styles.textdown}>
                {this.props.textdown}
              </Text>
            </View>
            <View style={styles.right}>
              <View style={styles.rightcon}>
              <View style={styles.dola}>
                <Text style={styles.textup}>$</Text>
                <Text style={styles.textright}>{this.props.textright}</Text>
              </View>
              <TouchableOpacity style={styles.button}>
                <Text style={{color: this.props.color, fontSize: 16}}>
                  BY NOW
                </Text>
              </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

class ViewVip extends Component {
  render () {
    return (
      <View>
        <Item
          imgbgr={require ('..//..//..//..//img/rectang1.png')}
          imgit={require ('..//..//..//..//img/Inter1.png')}
          textup="1 Month"
          textdown="You will be using VIP feature for 1 Month"
          textright="10"
          color="#80AEF5"
        />
        <Item
          imgbgr={require ('..//..//..//..//img/rectang2.png')}
          imgit={require ('..//..//..//..//img/Inter2.png')}
          textup="3 Months"
          textdown="You will be using VIP feature for 3 Month"
          textright="25"
          color="#F1AD42"
        />
        <Item
          imgbgr={require ('..//..//..//..//img/rectang4.png')}
          imgit={require ('..//..//..//..//img/Inter4.png')}
          textup="6 Months"
          textdown="You will be using VIP feature for 6 Month"
          textright="40"
          color="#A77BF2"
        />
        <Item
          imgbgr={require ('..//..//..//..//img/rectang3.png')}
          imgit={require ('..//..//..//..//img/Inter3.png')}
          textup="1 Year"
          textdown="You will be using VIP feature for 6 Months"
          textright="69"
          color="#E04F5F"
        />

      </View>
    );
  }
}

export default class UpgradeVip extends Component {
  constructor (props) {
    super (props);
    this.state = {};
  }

  render () {
    return (
      <Container txt>
        <Header back text="Upgrade Vip" {...this.props} />
        <View style={styles.container}>
          <ViewVip />
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  contai: {
    marginTop: -5,
  },
  item: {
    margin: 15,
  },
  imgbgr: {
    position: 'absolute',
    width: '100%',
    height: 100,
    top: 0,
  },
  imgit: {
    position: 'absolute',
    right: 0,
    height: 100,
    width: 150,
    top: 0,
  },
  content: {
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'space-between',
  },
  left: {
    justifyContent: 'space-around',
  
    flex:6
  },
  textup: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
   
    maxWidth: '100%',
  },
  textdown: {
    color: 'white',
    maxWidth: '100%',
    marginTop: 10,
    
  },
  right: {
    justifyContent: 'space-around',
    flex:4,
    alignItems:'flex-end',
  },
  rightcon:{
    alignItems:'center'
  },
  textright: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
    marginLeft: 5,
  },
  button: {
    height: 35,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 7,
    marginTop: 10,
  },
  by: {
    color: '#80AEF5',
    fontSize: 16,
  },
  dola: {
    flexDirection: 'row',
  },
});
