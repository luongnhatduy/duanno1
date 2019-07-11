import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  AsyncStorage
} from 'react-native';
import Container from '../../../libraries/component/Container';
import Header from '../../../libraries/component/Header';
import constants from '../../../libraries/utils/constants';
import NavigationService from '../../../config/NavigationService';
import Favorite from '../../main/profile/Favorite';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import ModalLogin from 'features/src/libraries/component/ModalLogin';
import apis from 'features/src/libraries/Apis/Apis';
import { showLoading, hideLoading } from 'components/Loading/LoadingModal';
import { showFlashMessage } from 'helpers/Utils';
const ITEM_WIDTH = Dimensions.get ('window').width;
const yearmin = moment ().format ('YYYY') - 65;
const yearmax = moment ().format ('YYYY') - 18;
const thang = moment ().format ('MM');
const ngay = moment ().format ('DD');

const tgmin =ngay + '-' + thang + '-' + yearmin;
const tgmax =ngay + '-' + thang + '-' + yearmax;
export default class Birdth extends Component {
  state = {
    txt: constants.datakb[1].title,
    place: constants.datakb[1].content,
    d: 1,
    titlebt: 'Next',
    cl1: 'black',
    clbr1: 'white',
    cl2: 'black',
    clbr2: 'white',
    username: '',
    usergender: 1,
    date: tgmax,
    check: false,
    messenger: 'Birth date is required',
    clll:'#888888',
    value:''
  };
  gender1 = () => {
    this.setState ({
      cl1: '#FFCB78',
      clbr1: '#FFCB78',
      cl2: 'black',
      clbr2: 'white',
    });
  };
  gender2 = () => {
    this.setState ({
      cl2: '#FFCB78',
      clbr2: '#FFCB78',
      cl1: 'black',
      clbr1: 'white',
    });
  };
  next = async() => {
    showLoading();
    apis
        .post (
          apis.PATH.UPDATE_USER,
          {
            birthday:  this.state.date    
          },
          true
        )
        .then (res => {
            hideLoading();
            if(res.code === 200){
              this.props.navigation.navigate('Gender')
            }else{
              showFlashMessage(res.msgdefault,constants.typeMessage.DANGER)
            }
          console.log (res, 'bỉdrh');
        })
        .catch (err => {
            hideLoading();
          console.log ('loi', err);
        });
  };
  next1 = () => {
   
  };
  handlebirdthday=(txt)=>{
    
      this.setState ({date: txt,value: txt,clll:'#183D57'});

  }
  birthday = () => {
    

    return (
      <View style={styles.birday}>
       
        <TextInput
        value={this.state.value}
        style={[styles.input,{color:this.state.clll}]}
        underlineColorAndroid="transparent"
        placeholder={tgmax}
        placeholderTextColor="#888888"
        autoCapitalize="none"
        onChangeText={this.handlebirdthday}
        maxLength={32}
         />
        <DatePicker
          style={{width: 22}}
       
          mode="date"
          placeholder="select date"
          format="DD-MM-YYYY"
          minDate={tgmin}
          maxDate={tgmax}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          hideText={true}
          iconSource={require ('.//..//..//..//img/calendar.png')}
          customStyles={{
            dateIcon: styles.calenda,
          }}
          onDateChange={datee => {
            this.setState ({date: datee,value:datee,clll:'#183D57'});
          }}
        />
      </View>


    );
  };
  reset = () => {
    this.setState ({
      check: false,
    });
  };
  componentDidMount () {
    this.setState ({
      check: false,
    });
  }
  render () {
    return (
      <Container txt>
        <Header
          back
          text="Personal Information"
          {...this.props}
        />
          <View style={styles.viewtxt}>
            <Text style={styles.txt}>My birdthday</Text>
           
          </View>
        <View style={styles.container}>
          <View style={styles.viewht}>
            {this.birthday ()}
          </View>
          { this.state.clll === '#888888'
            ? <TouchableOpacity style={styles.button} onPress={this.next}>
                <Text style={styles.txtNext}>{this.state.titlebt}</Text>
              </TouchableOpacity>
            : <TouchableOpacity style={styles.button} onPress={this.next}>
                <Text style={styles.txtNext}>{this.state.titlebt}</Text>
              </TouchableOpacity>}

        </View>
       
      </Container>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  viewht: {
    width: '90%',
    maxHeight: ITEM_WIDTH - 60,
   // justifyContent: 'flex-start',
    
    marginBottom: 30,
  },

  viewtxt: {
    marginLeft:20,
    marginTop: 60,
    marginBottom: 60,
  },
  txt: {
    color: '#183D57',
    fontSize: 24,
    fontWeight: 'bold',
   
  },
  viewip: {
    width: '90%',
    justifyContent: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '70%',
    height: 40,
    margin: 0,
    top:2,
   
  },
  button: {
    height: 50,
    width: '90%',
    backgroundColor: '#183D57',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 0,
  },
  vbutton: {
    height: 50,
    width: '90%',
    backgroundColor: '#416B88',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 0,
  },
  txtNext: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  viewGender: {
    alignItems: 'center',
    width: '100%',
  },
  btgender: {
    height: 40,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 30,
    borderWidth: 1,
  },
  txtgen: {
    fontSize: 16,
    color: 'black',
  },
  info: {
    width: '90%',
  },
  birday: {
    
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#183D57',
    borderBottomWidth: 1,
    //paddingBottom: 5,
  //  alignItems: 'center',
  },
  txtbird: {
    fontSize: 14,
    color: '#183D57',
  },
  calenda: {
    width: 16,
    height: 17,
    tintColor: '#183D57',
    marginRight: 2,
  },
});
