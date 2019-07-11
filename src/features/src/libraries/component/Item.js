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
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import Modalgender from './Modalgender';
import {connect} from 'react-redux';

const yearmin = moment ().format ('YYYY') - 100;
const yearmax = moment ().format ('YYYY') - 18;
const thang = moment ().format ('MM');
const ngay = moment ().format ('DD');
const tgmin =ngay + '-' + thang + '-' + yearmin;
const tgmax =ngay + '-' + thang + '-' + yearmax;
class Item extends Component {
  state = {
    color: '#888888',
    color2: '#888888',
    date:this.props.task.taskoj.birthday,
    checkgen: false,
    gender:this.props.task.taskoj.gender,
    cceh:false,
    value:this.props.task.taskoj.full_name,
    clll:'#888888',
    valuebd:''
  };
  componentDidMount() {
    this.setState({
      checkgen: false,
    });
   
  }
  handlename=(txt)=>{
    this.setState({
      value: txt
    })
    this.props.setname(txt);
  }
  name = () => {
    return (
      <View style={styles.info}>
        <TextInput
          value={this.state.value}
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder={this.props.task.taskoj.full_name}
          placeholderTextColor="#888888"
          autoCapitalize="none"
          maxLength={32}
          minLength={2}
          onChangeText={this.handlename}
        />
      </View>
    );
  };
  handlebirdthday=(txt)=>{
    this.setState ({date: txt,clll:'#183D57',valuebd:txt});
    this.props.setbird(txt)
  }
  birthday = () => {
    return (
      <View style={styles.info}>
        {/* <Text style={[styles.bd, {color: this.state.color}]}>
          {this.state.date}
        </Text> */}
        <TextInput
        value={this.state.valuebd}
        style={[styles.inputbd,{color:this.state.clll}]}
        underlineColorAndroid="transparent"
        placeholder={tgmax}
        placeholderTextColor="#888888"
        autoCapitalize="none"
        onChangeText={this.handlebirdthday}
        maxLength={10}
         />
      </View>
    );
  };
  gender = () => {
    let gen =''
    switch (this.state.gender) {
      case 1:
         gen = 'Male';
        break;
      case 2:
         gen = 'Female';
        break;
        case 3:
          gen = 'Non-binary';
         break; 
      default :
          gen = this.state.gender;
        break;
    }
    return (
      <TouchableOpacity style={styles.info2} onPress={this.next}>
        {/* {this.props.content === 1
          ? <Text style={[styles.bd, {color: this.state.color2}]}>Male</Text>
          : <Text style={[styles.bd, {color: this.state.color2}]}>
              Fermale
            </Text>} */}
            <Text style={[styles.bd, {color: this.state.color2}]}>{gen}</Text>
            {this.state.checkgen === true
            ? (
              <Modalgender
                check={this.state.checkgen}
                reset={this.reset}
            />
            )
            : <View />}
      </TouchableOpacity>
    );
  };
  reset = (txt) => {
    this.setState({
      checkgen: false,
      gender : txt,
      color2:'#183D57'
    });
    this.props.setgen(txt);
  };
  next=()=>{
    this.setState({
      checkgen: true,
    });
  }
  render () {
    console.log(this.state.checkgen,'check')
    switch (this.props.up) {
      case 'Name':
        this.content = this.name;
        break;
      case 'Birthday':
        this.content = this.birthday;
        break;
      case 'Gender':
        this.content = this.gender;
        break;
      default:
        break;
    }
    return (
      <View style={styles.item}>
        <View style={styles.left}>
          <View style={styles.up}>
            {/* <Image
              style={styles.img}
              source={this.props.img1}
              resizeMode="stretch"
            /> */}
            <Text style={styles.title}>{this.props.up}</Text>
          </View>
          <View>{this.content()}</View>
        </View>
        <View style={styles.right}>
          {/* {!this.props.check
            ? <Image style={styles.img2} source={this.props.img2} />
            : <View />} */}
          {!this.props.check
            ? <View />
            : <View>
                {this.props.check === 'date'
                  ? <DatePicker
                      style={{flex:1,justifyContent:'flex-end'}}
                    
                      mode="date"
                      placeholder="select date"
                      format="DD-MM-YYYY"
                      minDate={tgmin}
                      maxDate={tgmax}
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      hideText={true}
                      iconSource={require ('./..//..//img/next.png')}
                      customStyles={{
                        dateIcon: styles.img2,
                      }}
                      onDateChange={datee => {
                        this.setState ({date: datee,clll:'#183D57',valuebd:datee, color  : '#183D57'});
                        this.props.setbird(datee)
                      }}
                    />
                  : <TouchableOpacity onPress={this.next}>
                      <Image
                        style={styles.img3}
                        source={require ('./..//..//img/next.png')}
                      />
                    </TouchableOpacity>}
              </View>}

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
   
    }
}
export default connect (mapStatetoProps,mapDispatToProps) (Item);
const styles = StyleSheet.create ({
  container: {
    backgroundColor: '#F7F7F7',
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  up: {
   justifyContent:'center',
  
    width: '100%',
    marginLeft: 10,
    marginTop: 5,
  },
  left: {
    flex:1,
    
    width: '100%',
  },
  right: {
    flex:1,
    right: 10,
    position: 'absolute',
    
  },
  title: {
    
    color: 'black',
    fontSize: 17,
  },
  content: {
    fontSize: 16,
    color: '#888888',

    marginTop: 5,
  },
  img: {
    height: 15,
    width: 15,
    tintColor: 'black',
  },
  img2: {
    height: 15,
    width: 10,
    tintColor: 'black',
   
    right:0,
    position:'absolute'
  },
  img3: {
    height: 15,
    width: 10,
    tintColor: 'black',
    marginRight:5
  },
  info: {
  
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
    height: 40,
    
  },
  info2: {
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
    height: 40,
    
  },
  input: {
    color: '#183D57',
  },
  bd: {},
  inputbd: {
    width: '70%',
    height: 40,
    margin: 0,
    top:2,
  },
});
