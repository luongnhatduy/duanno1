import React, {Component} from 'react';
import {Text, StyleSheet, View, ScrollView} from 'react-native';
import Container from '../../../../libraries/component/Container';
import Header from '../../../../libraries/component/Header';
import Sliderr from '..//..//..//main/component/Slider';
import Favorite from '../Favorite';
import RSlider from '../../component/RSlider';
import apis from 'features/src/libraries/Apis/Apis';
import {connect} from 'react-redux';

class Setting extends Component {
  state={
    gender:[],
    start_age:18,
    end_age : this.props.task.taskoj.age+10,
    check:false
  }
  setgender=(gen)=>{
    this.setState({
      gender: gen
    })
  }
  setagestart=(age)=>{
    this.setState({
      start_age: age
    })
  }
  setageend=(age)=>{
    this.setState({
      end_age: age
    })
  }
  componentDidMount(){
    apis
      .fetch (apis.PATH.SHOW_SETTING, true)
      .then (res => {
        console.log (res.data[0].gender, 'show');
        this.setState({
          start_age: res.data[0].start_age,
          end_age: res.data[0].end_age,
          check : true
        })
        this.load.loaddata (res.data[0].start_age,res.data[0].end_age);
        this.loadcheck.loadcheck(res.data[0].gender);
      })
      .catch (err => {
        this.setState({
          check : true
        })
        console.log (err, 'loi');
      });
      
  }
  render () {
    console.log(this.state.gender,'datagender')
    return (
      <Container txt>
        <Header back text="Setting" save="Save" setting gender={this.state.gender} start_age={this.state.start_age} end_age={this.state.end_age} {...this.props}/>
        <ScrollView>
          <View style={styles.viewto}>
            <View style={styles.viewtt}>
              <Text style={styles.title1}>My Preferences</Text>
            </View>
            <Sliderr setgender={this.setgender}  setting {...this.props} ref={ref => (this.loadcheck = ref)}/>
            {this.state.check === true ?  <RSlider title='Age' min={18} max={65} minbt={this.state.start_age} maxbt={this.state.end_age} setagestart={this.setagestart} setageend={this.setageend} ref={ref => (this.load = ref)}/> :<View/> }
          </View>
          <View style={styles.viewcenter}>
            <Text style={styles.title2}>Information</Text>
            <Favorite dt="settingyourself" detail="ss" {...this.props} />
          </View>
          <View style={styles.viewcenter}>
            <Text style={styles.title3}>Hobbies</Text>
            <Favorite favor {...this.props} />
          </View>
          <View style={styles.bt}></View>
        </ScrollView>
      </Container>
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
export default connect (mapStatetoProps,mapDispatToProps) (Setting);
const styles = StyleSheet.create ({
  title1: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    margin: 10,
  },
  viewtt: {
    width: '100%',
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: 1,
  },
  viewto: {
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 5,
  },
  viewcenter: {
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 5,
    marginTop: 15,
    paddingBottom: 10,
  },
  title2: {
    fontSize: 16,
    color: '#888888',
    fontWeight: 'bold',
    margin: 10,
  },
  title3: {
    fontSize: 14,
    color: 'black',
    fontStyle:'italic',
    margin: 10,
  },
  bt:{
      height:15
  }
});
