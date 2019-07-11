import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import RSlider from './RSlider';
import { nullLiteral } from '@babel/types';
import { showLoading, hideLoading } from 'components/Loading/LoadingModal';
import apis from 'features/src/libraries/Apis/Apis';
import {connect} from 'react-redux';
import { StartLevel,EndLevel,StartRange,EndRange} from '..//..//..//libraries/redux/action';
class Item extends Component {
  state = {
    value: 10,
  };
  setstart=(age)=>{
    if(this.props.title==='Level'){
      this.props.setstartlevel && this.props.setstartlevel(age)
    }else{
      this.props.setstartrange && this.props.setstartrange(age)
    }
  }
  setend=(age)=>{
    if(this.props.title==='Level'){
      this.props.setendlevel && this.props.setendlevel(age)
    }else{
      this.props.setendrange && this.props.setendrange(age)
    }
  }
  render () {
   
    return (
      <View>
        <RSlider
          color
          title={this.props.title}
          min={this.props.min}
          max={this.props.max}
          minbt={this.props.minbt}
          maxbt={this.props.maxbt}
          phu={this.props.phu}
          setagestart={this.setstart} 
          setageend={this.setend}
        />
      </View>
    );
  }
}
class Sliderr2 extends Component {
  state={
    minbtlevel: 50,
    maxbtlevel : 100,
    minbtrange: 0,
    maxbtrange : 25,
    check : false
  }
  setstartlevel=(age)=>{
    this.props.StartLevel(age)
  }
  setendlevel=(age)=>{
    this.props.EndLevel(age)
  }
  setstartrange=(age)=>{
    this.props.StartRange(age)
  }
  setendrange=(age)=>{
    this.props.EndRange(age)
  }
  componentDidMount(){
    showLoading();
    apis
    .fetch (apis.PATH.GET_FILLTER,true)
    .then (respon => {
      hideLoading();
      console.log(respon,'getfilter')
      if (respon.code == 200){
        // this.props.StartLevel (respon.data.start_level);
        // this.props.EndLevel (respon.data.end_level);
        // this.props.StartRange (respon.data.start_range);
        // this.props.EndRange (respon.data.end_range);
        
        this.setState({
          minbtlevel: respon.data.start_level,
          maxbtlevel : respon.data.end_level,
          minbtrange: respon.data.start_range,
          maxbtrange : respon.data.end_range,
          check:true
        })
      }else{
        this.setState({
          check:true
        })
      }
    })
    .catch (err => {
      this.setState({
        check:true
      })
      hideLoading();
      console.log ('loi', err);
    });  
  }
  render () {
   
    return (
      <View style={styles.container}>
        <View style={styles.item}>
        {this.state.check === false ? <View/> :   <Item phu='%' title="Level" min={10} max={100} minbt={this.state.minbtlevel} maxbt={this.state.maxbtlevel} setstartlevel={this.setstartlevel} setendlevel={this.setendlevel} />}
        </View>
        <View>
          {this.state.check === false ? <View/>:   <Item phu='km' title="Range" min={0} max={50} minbt={this.state.minbtrange} maxbt={this.state.maxbtrange} setstartrange={this.setstartrange} setendrange={this.setendrange}/>}
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    task: !state.taskReducers ? [] : state.taskReducers,
  };
};
const mapDispatToProps = dispatch => {
  return {
    StartLevel: taskstartlevel => dispatch (StartLevel (taskstartlevel)),
    EndLevel: taskendlevel => dispatch (EndLevel (taskendlevel)),
    StartRange: taskstartrange => dispatch (StartRange (taskstartrange)),
    EndRange: taskendrange => dispatch (EndRange (taskendrange)),
  };
};
export default connect (mapStateToProps, mapDispatToProps) (Sliderr2);
const styles = StyleSheet.create ({
  container: {
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 5,
  },
  item:{
    borderBottomColor:'#CCCCCC',
    borderBottomWidth:1
  },
  title: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewGender: {
    marginTop: 10,
    borderColor: '#707070',
    borderWidth: 0.5,
    borderRadius: 7,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
  },
  genderchild: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
  },
  txt: {
    fontSize: 16,
  },
  viewtitle: {
    borderTopColor: '#707070',
    borderTopWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  txtright: {
    color: 'black',
    fontSize: 17,
  },
  viewslide: {
    height: 60,
    margin: 10,
    marginTop: 0,
  },
  track: {
    height: 2,
    borderRadius: 2,
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: '#C7C7CC',
    borderWidth: 2,
  },
});
