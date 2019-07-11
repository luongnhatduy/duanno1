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
  Platform,
} from 'react-native';
import Header from './/..//..//..//libraries/component/Header';
import {ifIphoneX, getStatusBarHeight} from 'react-native-iphone-x-helper';
import Swiper from 'react-native-swiper';
import Favorite from '../profile/Favorite';
import ToolTip from '../component/ToolTip';

const {width, height} = Dimensions.get ('window');
export default class Detail extends Component {
  back = () => {
    this.props.navigation.goBack (null);
  };
  
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.vv}>
          <Swiper style={styles.sq}>
            <Image
              style={styles.img}
              source={require ('..//..//../img/img6.png')}
            />
            <Image
              style={styles.img}
              source={require ('..//..//../img/img4.png')}
            />
            <Image
              style={styles.img}
              source={require ('..//..//../img/img5.png')}
            />
          </Swiper>
          <View style={styles.viewmacth}>
            <Text style={styles.macth}>85%</Text>
          </View>
          <TouchableOpacity style={styles.btback} onPress={this.back}>
            <Image
              style={styles.xback}
              source={require ('..//..//..//img/xback.png')}
            />
          </TouchableOpacity>
          <View style={styles.viewrp} >
            <ToolTip  {...this.props}/>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.hd}>
            <Text style={styles.name}>Nguyen Hoang Hiep, 23</Text>
            <Text style={styles.status}>"I love Hanoi, Vietnam"</Text>
          </View>
          <View style={styles.favorite}>
            <Favorite detail dt="detail" {...this.props} />
          </View>
          <View style={styles.bt}>
            <TouchableOpacity style={styles.btbt}>
              <Image
                style={styles.imgbt}
                source={require ('..//..//..//img/vaytay.png')}
                resizeMode="stretch"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btbt}>
              <Image
                style={styles.imgbt}
                source={require ('..//..//..//img/thu.png')}
                resizeMode="stretch"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
  },
  img: {
    width: width + 40,
    height: height * 0.37,
    right: 8,
  },
  sq: {
    alignItems: 'center',
  },
  viewmacth: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#955354',
    borderRadius: 25,
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  macth: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  vv: {
    height: height * 0.37,
  },
  name: {
    color: 'black',
    fontSize: 16,
    marginLeft: 10,
    marginTop: 10,
    fontWeight: 'bold',
  },
  status: {
    color: '#888888',
    margin: 10,
  },
  hd: {
    flex: 2,
  },
  favorite: {
    flex: 8,
  },
  bt: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    ...ifIphoneX (
      {
        alignItems: 'flex-start',
      },
      {
        alignItems: 'center',
      }
    ),
  },
  btbt: {
    height: 50,
    width: 50,
    borderRadius: 25,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  imgbt: {
    height: 20,
    width: 25,
  },
  xback: {
    height: 40,
    width: 40,
  },
  btback: {
    position: 'absolute',
    left: 10,
    ...Platform.select ({
      ios: {
        top: getStatusBarHeight () + 10,
      },
      android: {
        top: 10,
      },
    }),
  },

  viewrp: {
    position: 'absolute',
    right: 10,
    ...Platform.select ({
      ios: {
        top: getStatusBarHeight () + 10,
      },
      android: {
        top: 10,
      },
    }),
  },
});
