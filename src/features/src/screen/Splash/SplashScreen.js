import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Image,
  Platform,
  AsyncStorage,
} from 'react-native';
import NavigationService from '..//..//config/NavigationService';
import apis from 'features/src/libraries/Apis/Apis';
import {connect} from 'react-redux';
import {Profile} from './/..//../libraries/redux/action'
class SplashScreen extends Component {
  constructor (props) {
    super (props);
    this.state = {
      name:'ddd',
      gender:'',
      birdth:'',
    };
  }
  nextScreen = async () => {
    let id = await AsyncStorage.getItem ('TOKEN');
    if (id) {
      apis
      .fetch (apis.PATH.USER, true)
      .then (res => {
        console.log (res, 'infouser');
        this.props.Profile (res.data[0]);
        if(res.data[0].full_name=== null){
          NavigationService.reset ('Username');
        }else{
          if(res.data[0].birthday=== null){
            NavigationService.reset ('Birdth');
          }else{
            if(res.data[0].gender=== 4){
              NavigationService.reset ('Gender');
            }else{
              NavigationService.reset ('TabBar');
            }
          }
        }
      })
      .catch (err => {
        NavigationService.reset ('SignInScreen');
        console.log (err, 'loi');
      });
    
    } else {
      NavigationService.reset ('SignInScreen');
    }
  };
  componentDidMount () {
   
      setTimeout (() => {
        this.nextScreen ();
      }, 1000);
    
  }
  render () {
    return (
      <View style={styles.container}>
        <Image
          style={styles.img}
          source={require ('..//..//img/splash.png')}
          resizeMode="stretch"
        />
      </View>
    );
  }
}
const mapStatetoProps = state => {
  return {
  };
};
const mapDispatToProps = dispatch => {
    return {
      Profile: taskoj => dispatch (Profile (taskoj)),
    }
}
export default connect (mapStatetoProps,mapDispatToProps) (SplashScreen);
const styles = StyleSheet.create ({
  container: {
    flex: 1,
  },
  img: {
    flex: 1,
    width: '100%',
  },
});
