import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Container from '../../libraries/component/Container';
import NavigationService from '..//..//config/NavigationService';
import Permissions from 'react-native-permissions';
import {showLoading, hideLoading} from 'components/Loading/LoadingModal';
import apis from 'features/src/libraries/Apis/Apis';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
export default class Local extends Component {
  constructor (props) {
    super (props);
    this.state = {};
  }

  nextPage = () => {
    // RNAndroidLocationEnabler.promptForEnableLocationIfNeeded ({
    //   interval: 10000,
    //   fastInterval: 5000,
    // })
    //   .then (data => {
    //     console.log(data,'datalocal')
    //   })
    //   .catch (err => {});
    showLoading();
    navigator.geolocation.getCurrentPosition (
      position => {
        hideLoading();
        console.log (position.coords.latitude, '123123123');
        this.props.navigation.navigate ('TabBar');
        // apis
        //   .post (
        //     apis.PATH.LAT_LONG,
        //     {
        //       latitude:position.coords.latitude,
        //       longitude : position.coords.longitude
        //     },
        //     true
        //   )
        //   .then (res => {
        //    hideLoading();
        //     console.log (res, 'filter');
        //   })
        //   .catch (err => {
        //     hideLoading ();
        //     console.log ('loi', err);
        //   });
      },
      error => console.log (error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  };
  render () {
    return (
      <Container>
        <View style={styles.container}>
          <Text style={styles.locate}>LOCATE YOUR POSITION</Text>
          <Text style={styles.content}>
            You need to allow locating your current location to
          </Text>
          <Text style={[styles.content, {marginTop: 5}]}>
            continue the application experience
          </Text>
        </View>
        <ImageBackground
          style={styles.bgrimg}
          source={require ('..//..//img/vitri.png')}
          resizeMode="stretch"
        >
          <View style={styles.view}>
            <TouchableOpacity style={styles.allow} onPress={this.nextPage}>
              <Text style={styles.txtallow}>Allow</Text>
            </TouchableOpacity>
          </View>
          {/* <TouchableOpacity onPress={this.nextPage}> 
            <Text style={styles.txtDeny}>Deny</Text>
          </TouchableOpacity> */}
        </ImageBackground>
      </Container>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    alignItems: 'center',
  },
  bgrimg: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  locate: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#183D57',
    marginTop: 40,
  },
  content: {
    fontSize: 14,
    color: '#444444',
    marginTop: 20,
  },
  img: {
    flex: 1,
    width: '100%',
    marginTop: 0,
  },
  allow: {
    margin: 30,
    marginBottom: 0,
    backgroundColor: '#183D57',
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtallow: {
    color: 'white',
  },
  txtDeny: {
    color: '#183D57',
    margin: 20,
  },
  view: {
    width: '100%',
    marginBottom: 30,
  },
});
