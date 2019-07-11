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
import NavigationService from '../../config/NavigationService';
import {connect} from 'react-redux';
import {Profile} from './/..//..//libraries/redux/action'
import apis from '../Apis/Apis';
import { showLoading, hideLoading } from 'components/Loading/LoadingModal';
import { showFlashMessage } from 'helpers/Utils';
import constants from '..//utils/constants'
const ITEM_WIDTH = Dimensions.get ('window').width;
class Header extends Component {
  constructor (props) {
    super (props);
    this.state = {
      rrrr: null,
      dai: null,
      rong: null,
      src: '',
      color: 'white',
      bgr: 'white',
    };
  }
  componentDidMount () {
    //let uri = this.state.rrrr;
    switch (this.props.img) {
      case 'home':
        this.setState ({
          rrrr: require ('..//..//img//control.png'),
          dai: 23,
          rong: 22,
        });
        break;
      case 'detail':
        this.setState ({
          rrrr: require ('..//..//img//three.png'),
          dai: 23,
          rong: 5,
        });
        break;
      case 'proFlie':
        this.setState ({
          rrrr: require ('..//..//img//vip.png'),
          dai: 30,
          rong: 50,
          src: 'Vip',
        });
        break;

      default:
        break;
    }
    switch (this.props.check) {
      case 'login':
        this.setState ({
          color: 'black',
          bgr: 'white',
        });
        break;
      default:
        this.setState ({
          bgr: '#183D57',
          color: 'white',
        });
        break;
    }
  }
  backScreen = () => {
   
    if(this.props.back === 'back'){
       this.props.btback() 
    }else{
      this.props.navigation.goBack (null);
    }
  };
  // img = () => {
  //   this.props.navigation.navigate (this.state.src);
  // };
  save =async()=>{
    
    
    //console.log(this.props.idif, this.props.parent,'save')
    if (this.props.like){
      apis.post(apis.PATH.UPDATE_HOBBIES, {
          favorite_id: this.props.like,
          child_id: this.props.task.taskId,
      }, true).then((res) => {
        console.log(res, 'update')
        this.props.navigation.goBack(null);
      }).catch (err => {
        console.log ('loi', err);
      });
     
    }

    if (this.props.idif && this.props.settinginfo === 'aboutme' ){
      apis.post(apis.PATH.UPDATE_INFO, {
        personal_id: this.props.parent,
        child_id: this.props.idif,
      },true)
      .then (res => {
        console.log(res,'info')
        this.props.navigation.goBack(null);
      })
      .catch (err => {
        console.log ('loi', err);
       
      });
    }
    if (this.props.idif && this.props.aboutme  ){
      apis.post(apis.PATH.UPDATE_INFO, {
        personal_id: this.props.parent,
        child_id: this.props.idif,
      },true)
      .then (res => {
        console.log(res,'info')
        this.props.navigation.goBack(null);
      })
      .catch (err => {
        console.log ('loi', err);
       
      });
    }

    if (this.props.settinginfo === 'setting'){
      apis.post(apis.PATH.UPDATE_INFOMATION, {
        personal_id: this.props.parent,
        child_id: this.props.idif,
      },true)
      .then (res => {
        console.log(res,'infosssss')
        this.props.navigation.goBack(null);
      })
      .catch (err => {
        console.log ('loi', err);
       
      });
    }

    if (this.props.work){
      showLoading();
      let giottinh 
      switch (this.props.gender) {
        case 'Male':
           giottinh = 1
          break;
          case 'Female':
             giottinh = 2
            break;
            case 'Non-binary':
           giottinh = 3
          break;  
        default:
          break;
      }
      apis.postprofile(apis.PATH.UPDATE_PROFILE, {
        full_name: this.props.name,
        birthday: this.props.birdth,
        gender: giottinh,
        status_content: this.props.status,
        image: this.props.dtimg,
      },true)
      .then (res => {
        hideLoading();
        console.log(res.msgdefault,'info');``
        if (res.code === 200){
          this.props.Profile (res.data[0]); 
          this.props.navigation.goBack(null);
        }else{
          showFlashMessage(res.msgdefault, constants.typeMessage.DANGER)
        }  
      })
      .catch (err => {
        hideLoading();
        console.log ('loi', err);
        showFlashMessage('ERROR!', constants.typeMessage.DANGER)
      });
    }
    
    if(this.props.filter){
      this.props.filter();
    }

    if (this.props.setting){
      console.log(this.props.gender,this.props.start_age,this.props.end_age,'data upload')
      apis.post(apis.PATH.UPDATE_SETTING, {
        gender: this.props.gender,
        start_age: this.props.start_age,
        end_age: this.props.end_age,
      },true)
      .then (res => {
        console.log(res,'info')
        this.props.navigation.goBack(null);
      })
      .catch (err => {
        console.log ('loi', err);
      });
    }
  }
  skip =()=>{
    NavigationService.reset('Local');
  }
  render () {
    this.rightbt = this.props.save === 'Save' ? (this.save) : (this.skip);
    return (
      <View>
        {!this.props.banner
          ? <View style={[styles.container, {backgroundColor: this.state.bgr}]}>
              {this.props.back
                ? <View style={styles.viewleft}>
                    <TouchableOpacity
                      onPress={this.backScreen}
                      style={styles.btback}
                    >
                      <Image
                        style={[styles.imgback, {tintColor: this.state.color}]}
                        source={require ('..//..//img//back.png')}
                      />
                    </TouchableOpacity>
                  </View>
                : <View />}
              <View style={{}}>
                <Text style={[styles.textcenter, {color: this.state.color}]}>
                  {this.props.text}
                </Text>
              </View>
              {this.props.img
                ? <View style={styles.viewright}>
                    <TouchableOpacity onPress={this.img}>
                      <Image
                        style={{
                          height: this.state.dai,
                          width: this.state.rong,
                          marginTop: 5,
                        }}
                        source={this.state.rrrr}
                        resizeMode="stretch"
                      />
                    </TouchableOpacity>
                  </View>
                : <View />}
              {this.props.save
                ? <View style={styles.viewright}>
                    <TouchableOpacity
                      style={styles.btSave}
                      onPress={this.rightbt}
                    >
                      <Text style={styles.save}>{this.props.save}</Text>
                    </TouchableOpacity>
                  </View>
                : <View />}
            </View>
          : <Image
              style={styles.banner}
              source={require ('..//..//img/banner.png')}
              resizeMode="stretch"
            />}
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
export default connect (mapStatetoProps,mapDispatToProps) (Header);
const styles = StyleSheet.create ({
  container: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgback: {
    width: 10,
    height: 20,
  },
  viewleft: {
    position: 'absolute',
    left: 10,
  },
  viewright: {
    position: 'absolute',
    right: 15,
  },

  textcenter: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  banner: {
    width: ITEM_WIDTH,
    height: 60,
  },
  save: {
    color: '#FFCB78',
    fontSize: 16,
    fontWeight: 'bold',
  },
  btSave: {
    borderBottomColor: '#FFCB78',
    borderBottomWidth: 1,
  },
  btback: {
    height: 25,
    width: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
