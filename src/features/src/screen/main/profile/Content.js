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
import EditInfo from './EditInfo';
import Favorite from './Favorite';
import ListHome from '..//..//..//libraries/component/ListHome';
import Switch from 'react-native-switch-pro';
import NavigationService from '../../../config/NavigationService';
import {connect} from 'react-redux';
import {Profile} from './/..//..//..//libraries/redux/action'
import apis from 'features/src/libraries/Apis/Apis';
const ITEM_WIDTH = Dimensions.get ('window').width;

class Item extends Component {
  nextPage = () => {
    switch (this.props.title) {
      case 'About me':
        this.props.navigation.navigate ('Aboutme');
        break;
      case 'Protect users':
        this.props.navigation.navigate ('Protect');
        break;
      case 'Setting':
        NavigationService.navigate ('Setting');
        break;
      case 'VIP Privilege':
        this.props.navigation.navigate ('Vip');
        break;
      default:
        break;
    }
  };
  render () {
    return (
      <TouchableOpacity style={styles.item} onPress={this.nextPage}>
        <View style={styles.itemleft}>
          <Image
            style={styles.imgItem}
            source={this.props.imgItem}
            resizeMode="stretch"
          />
          <Text style={styles.title}>{this.props.title}</Text>
        </View>

        {!this.props.swit
          ? <Image
              style={styles.next}
              source={require ('..//..//..//img/next.png')}
              resizeMode="stretch"
            />
          : <Switch onSyncPress={() => {}} />}
      </TouchableOpacity>
    );
  }
}
class Content extends Component {
  constructor (props) {
    super (props);
    this.state = {
      img: '',
      name: '',
      age: '',
      data:[]
    };
  }
  componentDidMount () {
    
     apis
     .fetch (apis.PATH.USER, true)
     .then (res => {
       console.log (res.data[0], 'infouser');
       this.props.Profile (res.data[0]);
     })
     .catch (err => {
       console.log (err, 'loi');
     });
  }
  
  Logout = async () => {
    let id = '';
    AsyncStorage.setItem ('TOKEN', `${id}`);
    let idd = await AsyncStorage.getItem ('TOKEN');
    console.log (idd, 'id tokennnnn');
    NavigationService.reset ('SplashScreen');
  };
  render () {
    console.log(this.state.img,'img')
    return (
      <View style={styles.container}>

        <View style={styles.contai}>
          <View style={styles.viewtop}>
            <View style={styles.info}>

              <View style={styles.viewavt}>
                <View onPress={this.editinfo}>
                {this.props.task.taskoj && this.props.task.taskoj.avatar && this.props.task.taskoj.avatar.length > 0
                    ? <Image
                        style={styles.avt}
                        source={{uri : this.props.task.taskoj.avatar}}
                      />
                    : <Image
                        style={styles.avt}
                        source={require ('..//..//..//img/avatar.jpg')}
                      />}

                </View>
                <Image
                  style={styles.edit1}
                  source={require ('..//..//..//img/sao.png')}
                />
              </View>
              <View style={styles.infoLeft}>
                <View style={styles.viewName}>
                  <Text style={styles.name}>
                    {this.props.task.taskoj && this.props.task.taskoj.full_name}, {this.props.task.taskoj && this.props.task.taskoj.age}
                  </Text>
                  {/* <TouchableOpacity onPress={this.editinfo}>
                    <Image
                      style={styles.edit}
                      source={require ('..//..//..//img/edit.png')}
                    />
                  </TouchableOpacity> */}
                </View>
                {/* <View style={styles.viewAge}>
                  <Text style={styles.age}>23, Male</Text>
                </View>
                <View style={styles.viewContentt}>
                  <Text>" I love Hanoi, Vietnam" </Text>
                </View>
                <View style={styles.viewImgme}>
                  <Image
                    style={styles.imgme}
                    source={require ('..//..//..//img/imgme.png')}
                    resizeMode="stretch"
                  />
                  <Image
                    style={styles.imgme}
                    source={require ('..//..//..//img/imgme.png')}
                    resizeMode="stretch"
                  />
                </View> */}
              </View>
            </View>
          </View>
          <View style={styles.viewBottom}>
            <Item
              title="About me"
              imgItem={require ('.//..//..//..//img/user.png')}
              {...this.props}
            />
            {/* <Item
              title="Notification"
              imgItem={require ('.//..//..//..//img/noti.png')}
            /> */}
            <Item
              title="Protect users"
              imgItem={require ('.//..//..//..//img/clock.png')}
              swit
              {...this.props}
            />
            <Item
              title="Setting"
              imgItem={require ('.//..//..//..//img/setting.png')}
              {...this.props}
            />
            <Item
              title="VIP Privilege"
              imgItem={require ('.//..//..//..//img/star.png')}
              {...this.props}
            />
            <TouchableOpacity style={styles.viewLogout} onPress={this.Logout}>
              <Image
                style={styles.imgLogout}
                source={require ('..//..//..//img/logout.png')}
                resizeMode="stretch"
              />
              <Text style={styles.logout}>Log out</Text>
            </TouchableOpacity>
          </View>
          {/* <Favorite {...this.props} /> */}
        </View>

      </View>
    );
  }
}
const mapStatetoProps = state => {
  return {
    task: !state.taskReducers ? [] : state.taskReducers,
  };
};
const mapDispatToProps = dispatch => {
    return {
      Profile: taskoj => dispatch (Profile (taskoj)),
    }
}
export default connect (mapStatetoProps,mapDispatToProps) (Content);
const styles = StyleSheet.create ({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  contai: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewtop: {
    
    marginTop: 60,
  },
  info: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    // width: ITEM_WIDTH * 0.95,
    width: ITEM_WIDTH,
    // borderRadius: 10,
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.3,
    // elevation: 5,
  },
  viewavt: {
    marginTop: -50,
  },
  avt: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  edit1: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    height: 35,
    width: 35,
  },
  infoLeft: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:5
  },
  viewName: {
   
    flexDirection: 'row',
  },
  edit: {
    height: 27,
    width: 27,
    marginTop: -8,
    marginLeft: 5,
    tintColor: '#FFCB78',
  },

  name: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewAge: {
    marginTop: 10,
  },
  viewContent: {
    marginTop: 5,
  },
  viewContentt: {
    flexDirection: 'row',
    marginTop: 10,
  },

  viewImgme: {
    flexDirection: 'row',
  },
  imgme: {
    height: 70,
    width: 60,
  },
  viewBottom: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: ITEM_WIDTH * 0.95,
    borderRadius: 10,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    elevation: 5,
    marginTop: 10,
  },
  item: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: 1,
  },
  itemleft: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  imgItem: {
    width: 25,
    height: 25,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    marginLeft: 20,
    color: 'black',
  },
  next: {
    height: 20,
    width: 10,
  },
  logout: {
    color: '#F97F0D',
    marginLeft: 5,
  },
  imgLogout: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
  viewLogout: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
