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
import Container from './Container';
import Header from './Header';
import apis from '../Apis/Apis';
import {showLoading, hideLoading} from 'components/Loading/LoadingModal';
class FlatListItem extends Component {
  state = {
    check: false,
  };
  Check = () => {
    if (this.state.check === false) {
      this.props.onCheck (this.props.item.id);
      this.setState ({
        check: !this.state.check,
      });
    } else {
      this.props.onCheck1 (this.props.item.id);
      this.setState ({
        check: !this.state.check,
      });
    }
  };
  getcheck = () => {
    
    if (this.props.item.selected === 1) {
      this.setState ({
        check: true,
      });
    } else {
      this.setState ({
        check: false,
      });
    }
  };
  getcheck2 = () => {
   
    for ( var i= 0;i< this.props.dt.length ; i++){
      console.log(this.props.item.id,this.props.item.name,this.props.dt[i],'-----------------------')
      if (this.props.item.id == this.props.dt[i] ) {
        
        this.setState ({
          check: true,
        });
        break;
      } else {
        
        this.setState ({
          check: false,
        });
      }
    }
    
  };
  componentDidMount () {
    if (this.props.chekkkk=== false){
      this.getcheck ();
    }else{
      this.getcheck2 ();
    }
    
  }
  render () {
   
    color = this.state.check === true ? 'black' : '#666666';
    return (
      <TouchableOpacity style={styles.viewItem} onPress={this.Check}>
        <Text style={[styles.txt, {color}]}>{this.props.item.name}</Text>
        {this.state.check === true
          ? <Image
              style={styles.img}
              source={require ('./../../img/Check.png')}
              resizeMode="stretch"
            />
          : <View />}
      </TouchableOpacity>
    );
  }
}

export default class InforDetaillangue extends Component {
  state = {
    data: [],
    id: null,
    dt: [],
    txtsearch: '',
    t: true,
    chekkkk:false
  };
  componentDidMount () {
    if (this.props.navigation.state.params.setting){
      console.log('settinggggggggggggg')
      this.getsetting();
    }
    else{
      console.log('aboutttttttttttt')
      this.getabout();
    }
  }


  getsetting=()=>{
    console.log(this.props.navigation.state.params.item.id,'iddddd')
    showLoading ();
    apis
      .fetch (
        apis.PATH.SHOW_INFO + this.props.navigation.state.params.item.id,
        true
      )
      .then (res => {
        hideLoading ();
        console.log (res, 'settinginfo');
        if (res.code === 200) {
          this.setState ({
            data: res.data,
          });
          for (i = 0; i < res.data.length; i++) {
            if (res.data[i].selected === 1) {
              const newData = [...this.state.dt, res.data[i].id];
              this.setState ({dt: newData});
             
            }
          }
        }
      })
      .catch (err => {
        hideLoading ();
        console.log ('loi', err);
      });
  }


  getabout=()=>{
    showLoading ();
    apis
      .fetch (
        apis.PATH.UESR_INFO + this.props.navigation.state.params.item.id,
        true
      )
      .then (res => {
        hideLoading ();
        console.log (res, 'information');
        if (res.code === 200) {
          this.setState ({
            data: res.data,
          });
          for (i = 0; i < res.data.length; i++) {
            if (res.data[i].selected === 1) {
              const newData = [...this.state.dt, res.data[i].id];
              this.setState ({dt: newData});
             
            }
          }
        }
      })
      .catch (err => {
        hideLoading ();
        console.log ('loi', err);
      });
  }
  getData = text => {
    apis
      .fetch (
        apis.PATH.UESR_INFO +
          this.props.navigation.state.params.item.id +
          '&search=' + text,
        true
      )
      .then (res => {
        hideLoading ();
        console.log (res, 'langue');
        if (res.code === 200) {
          for (i = 0; i < res.data.length; i++) {
              let newData = [...this.state.data, res.data[i]];
              console.log (newData, 'newdada');
              this.setState ({data: newData, chekkkk: true});
             
          }
        }
      })
      .catch (err => {
        hideLoading ();
        console.log ('loi', err);
      });
  };
  getData2 = text => {
    apis
      .fetch (
        apis.PATH.SHOW_INFO + this.props.navigation.state.params.item.id + '&search=' + text,
        true
      )
      .then (res => {
        hideLoading ();
        console.log (res, 'langue');
        if (res.code === 200) {
          for (i = 0; i < res.data.length; i++) {
              let newData = [...this.state.data, res.data[i]];
              console.log (newData, 'newdada');
              this.setState ({data: newData, chekkkk: true});
            //  this.flastListItem.getcheck2 ();
          }
        }
      })
      .catch (err => {
        hideLoading ();
        console.log ('loi', err);
      });
  };
  handlelanguesetting= text => {
    this.setState ({
      txtsearch: text,
      data : []
    });
      showLoading ();
      this.getData2 (text);
  };

  handlelangue = text => {
    this.setState ({
      txtsearch: text,
      data : []
    });
      showLoading ();
      this.getData (text);
  };
  onCheck = id => {
    this.state.dt.push (id);
   // console.log (this.state.dt, 'mang');
  };
  onCheck1 = id => {
    for (var i = 0; i < this.state.dt.length; i++) {
      if (this.state.dt[i] === id) {
        this.state.dt.splice (i, 1);
      }
    }
    //console.log (this.state.dt, 'mang');
  };
  keyExtractor = (item, index) => index.toString ();

  render () {
   //console.log (this.state.dt,  'data');
    let setting = this.props.navigation.state.params.setting ? 'setting' : 'aboutme' ;
    
    return (
      <Container txt>
        <Header
          idif={this.state.dt}
          parent={this.props.navigation.state.params.item.id}
          back
          text={this.props.navigation.state.params.item.name}
          save="Save"
          settinginfo={setting}
         
          {...this.props}
        />
        {!this.props.navigation.state.params.setting ? <View style={styles.viewsearch}>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Search"
            placeholderTextColor="#888888"
            autoCapitalize="none"
            onChangeText={this.handlelangue}
          />
        </View> : <View/>}
        {this.props.navigation.state.params.setting && this.props.navigation.state.params.item.id === 46 ? <View style={styles.viewsearch}>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Search"
            placeholderTextColor="#888888"
            autoCapitalize="none"
            onChangeText={this.handlelanguesetting}
          />
        </View> : <View/>}
        <FlatList
          style={styles.flatlist}
          data={this.state.data}
          keyExtractor={this.keyExtractor}
          renderItem={({item, index}) => {
            return (
              <FlatListItem
                item={item}
                index={index}
                {...this.props}
                onCheck={this.onCheck}
                onCheck1={this.onCheck1}
                dt={this.state.dt}
                chekkkk={this.state.chekkkk}
                ref={ref => (this.flastListItem = ref)}
              />
            );
          }}
          extraData={this.state}
        />
      </Container>
    );
  }
}
const styles = StyleSheet.create ({
  flatlist:{
    marginTop:5,
    marginBottom:10
  },
  viewItem: {
    padding: 10,
    borderBottomColor: '#CCCCCC',
    borderTopColor: '#CCCCCC',
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    alignItems:'center',
    justifyContent: 'space-between',
  },
  txt: {
    color: '#666666',
    fontSize: 16,
  },
  img: {
    height: 15,
    width: 20,
    position:'absolute',
    right:10,
    top:10
  },
  viewsearch: {
    margin: 10,
    borderRadius: 7,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 5,
    backgroundColor: 'white',
  },
  input: {
    paddingHorizontal:10,
    height: 40,
  },
});
