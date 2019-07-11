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
const ITEM_WIDTH = Dimensions.get ('window').width;
import {ifIphoneX} from 'react-native-iphone-x-helper';

import constants from '..//..//..//libraries/utils/constants';
import apis from 'features/src/libraries/Apis/Apis';
import { showLoading,hideLoading } from 'components/Loading/LoadingModal';
class FlatListItem extends Component {
  favoritedetail = () => {
    let item = this.props.item;
    this.props.navigation.navigate ('FavoriteDetail', {item}, {...this.props});
  };
  yourselfdetail = () => {
    let item = this.props.item;
    if (this.props.item.id === 46){
      this.props.navigation.navigate ('InforDetaillangue', {item}, {...this.props});
    }else{
      this.props.navigation.navigate ('Infordetail', {item}, {...this.props});
    }
   
  };
  settingyourselfdetail = () => {
    let item = this.props.item;
    let setting = 'setting'
      this.props.navigation.navigate ('InforDetaillangue', {item,setting}, {...this.props});
  };
  detail = () => {};
  render () {
    switch (this.props.dt) {
      case 'yourself':
        this.dtdt = this.yourselfdetail;
        break;
      case 'detail':
        this.dtdt = this.detail;
        break;
        case 'settingyourself':
          this.dtdt = this.settingyourselfdetail;
          break; 
      default:
          this.dtdt = this.favoritedetail;
       // this.favoritedetail;
        break;
    }
    styles.item = this.props.detail ? styles.item1 : styles.item2;
    return (
      <View style={styles.iitem}>
        <View style={styles.item1}>
          <TouchableOpacity onPress={this.dtdt}>
            <Image
              style={styles.img}
              source={{uri: this.props.item.image}}
              resizeMode='contain'
            />
          </TouchableOpacity>
          
        </View>
        {this.props.detail==="sss" ?  <Text style={styles.txtpt}>85%</Text>: <View/>}
      </View>
    );
  }
}
export default class Favorite extends Component {
  constructor (props) {
    super (props);
    this.state = {
      data:[],
      product:[]
    };
  }
  keyExtractor = (item, index) => index.toString ();
  componentDidMount(){
    this.getData();
    this.getData2()
  }
  getData=()=>{
    showLoading();
    apis
    .fetch (apis.PATH.HOBBIES,true)
    .then (respon => {
      hideLoading();
     console.log(respon.data,'hobbies')
      if (respon.code === 200) {
        this.setState({
          data: respon.data
        })     
      } 
    })
    .catch (err => {
      hideLoading();
      console.log ('loi', err);
    });  
  }
  getData2=()=>{
    showLoading();
    apis
    .fetch (apis.PATH.INFOR,true)
    .then (respon => {
      hideLoading();
      console.log(respon.data,'information')
      if (respon.code === 200) {
        this.setState({
          product: respon.data
        })
      } 
    })
    .catch (err => {
      hideLoading();
      console.log ('loi', err);
    });  
  }
  render () {
    let dataa = this.props.favor
      ?  this.state.data
      : this.state.product;  
      console.log(this.state.data,this.state.product,'datatatatata')
    return (
      <View style={styles.container}>
        <FlatList
          data={dataa}
          keyExtractor={this.keyExtractor}
          numColumns={3}
          renderItem={({item, index}) => {
            return <FlatListItem item={item} index={index} {...this.props} />;
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    width: ITEM_WIDTH,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  item1: {
    backgroundColor: 'white',
    height: (ITEM_WIDTH - 120) / 3,
    width: (ITEM_WIDTH - 120) / 3,
    borderRadius: (ITEM_WIDTH - 120) / 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
    marginTop: 10,
    margin: 15,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 5,
  },
  item2: {
    backgroundColor: 'white',
    height: (ITEM_WIDTH - 70) / 3,
    width: (ITEM_WIDTH - 70) / 3,
    borderRadius: (ITEM_WIDTH - 70) / 6,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 5,
  },
  img: {
    height: 50,
    width: 50,
    
  },
  txtpt: {
    color: 'black',
    ...ifIphoneX (
      {
        marginTop: 10,
      },
      {
        marginTop: 5,
      }
    ),
  },
  iitem: {
    alignItems: 'center',
    ...ifIphoneX (
      {
        marginBottom: 15,
      },
      {
        marginBottom: 5,
      }
    ),
  },
});
