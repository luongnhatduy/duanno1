import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
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
const ITEM_WIDTH = Dimensions.get ('window').width;

export default class PersonalInformation extends Component {
 

  state = {
    txt: constants.datakb[0].title,
    place: constants.datakb[0].content,
    d: 1,
    titlebt: 'Next',
    cl1: 'black',
    clbr1: 'white',
    cl2: 'black',
    clbr2: 'white',
    username: '',
    usergender: 1,
    date: moment ().format ('YYYY-MM-DD'),
    check: false,
    messenger1: 'Name is required',
    messenger2: 'Birth date is required',
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
  next = () => {
    
    if (this.state.titlebt === 'Next') {
      switch (this.state.d) {
        case constants.datakb.length - 1:
          this.setState ({
            d: this.state.d + 1,
            txt: constants.datakb[this.state.d].title,
            place: constants.datakb[this.state.d].content,
            titlebt: 'Done',
          });
          break;
        case constants.datakb.length:
          console.log ('asdasdsad');
          break;
        default:
          this.setState ({
            d: this.state.d + 1,
            txt: constants.datakb[this.state.d].title,
            place: constants.datakb[this.state.d].content,
          });
          break;
      }
      this.setState ({
        usergender: this.state.clbr1 === '#FFCB78' ? 1 : 2,
      });
    } else {
      apis
        .post (
          apis.PATH.UPDATE_USER,
          {
            full_name: this.state.username,
            birthday: this.state.date,
            gender: this.state.usergender,
          },
          true
        )
        .then (res => {
          console.log (res, 'login');
        })
        .catch (err => {
          console.log ('loi', err);
        });
      NavigationService.reset ('TabBar');
    }
  };
  back = () => {
      switch (this.state.d) {
        case 0:
          this.setState ({
            txt: constants.datakb[this.state.d].title,
            place: constants.datakb[this.state.d].content,  
          });
          break;
        default:
          this.setState ({
            d: this.state.d - 1,
            txt: constants.datakb[this.state.d].title,
            place: constants.datakb[this.state.d].content,
          });
          break;
      }
  };
  hobbies = () => {
    return (
      <View>
        {this.state.txt === 'Update your hobbies'
          ? <Favorite favor {...this.props} />
          : <Favorite dt="yourself" {...this.props} />}
      </View>
    );
  };
  viewgender = () => {
    return (
      <View style={styles.viewGender}>
        <TouchableOpacity
          style={[
            styles.btgender,
            {backgroundColor: this.state.clbr1, borderColor: this.state.cl1},
          ]}
          onPress={this.gender1}
        >
          <Text style={styles.txtgen}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.btgender,
            {backgroundColor: this.state.clbr2, borderColor: this.state.cl2},
          ]}
          onPress={this.gender2}
        >
          <Text style={styles.txtgen}>Female</Text>
        </TouchableOpacity>
        {}
      </View>
    );
  };
  handlePhone = text => {
    this.setState ({
      username: text,
    });
  };
  info = () => {
    console.log (this.state.username, 'name');
    return (
      <View style={styles.info}>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder={this.state.place}
          placeholderTextColor="#183D57"
          autoCapitalize="none"
          onChangeText={this.handlePhone}
        />
      </View>
    );
  };
  birthday = () => {
    let yearmin = moment ().format ('YYYY') - 100;
    let yearmax = moment ().format ('YYYY') - 18;
    let thang = moment ().format ('MM');
    let ngay = moment ().format ('DD');
    let tgmin = yearmin + '-' + thang + '-' + ngay;
    let tgmax = yearmax + '-' + thang + '-' + ngay;
    console.log (this.state.date, 'date');
    return (
      <View style={styles.birday}>
        <Text style={styles.txtbird}>{this.state.date}</Text>
        <DatePicker
          style={{width: 22}}
          date={this.state.date}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
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
            this.setState ({date: datee});
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
    //console.log (this.state.usergender, 'gioitinh');
    console.log(this.state.d,'d')
    switch (this.state.txt) {
      case "I'm a":
        this.viewht = this.viewgender;
        break;
      case 'Update your hobbies':
        this.viewht = this.hobbies;
        break;
      case 'Update yourself':
        this.viewht = this.hobbies;
        break;
      case 'Please enter your birth day':
        this.viewht = this.birthday;
        break;
      default:
        this.viewht = this.info;
        break;
    }
    a = this.state.txt === 'Please enter your name'
      ? this.state.username
      : this.state.date;
    b = this.state.txt === 'Please enter your name'
      ? ''
      : moment ().format ('YYYY-MM-DD');
    return (
      <Container txt>
        <Header
        //  back="back"
          text="Personal Information"
         // btback={this.back}
          {...this.props}
        />
        <View style={styles.container}>
          <View style={styles.viewtxt}>
            <Text style={styles.txt}>{this.state.txt}</Text>
          </View>

          <View style={styles.viewht}>
            {this.viewht ()}
          </View>
          {a === b
            ? <View style={styles.vbutton}>
                <Text style={styles.txtNext}>{this.state.titlebt}</Text>
              </View>
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
    width: '100%',
    maxHeight: ITEM_WIDTH - 60,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 30,
  },

  viewtxt: {
    alignItems: 'center',
  },
  txt: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 60,
    marginBottom: 60,
  },
  viewip: {
    width: '90%',
    justifyContent: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#183D57',
    height: 40,
    margin: 0,
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
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#183D57',
    borderBottomWidth: 1,
    //paddingBottom: 5,
    alignItems: 'center',
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
