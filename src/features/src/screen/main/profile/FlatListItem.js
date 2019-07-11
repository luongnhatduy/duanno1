import React, { Component } from "react";
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
  Dimensions
} from "react-native";
const ITEM_WIDTH = Dimensions.get("window").width;
import {connect} from 'react-redux';
import {AddID,Tangdem} from "./../../../libraries/redux/action"
import constants from "..//..//..//libraries/utils/constants";
import { showLoading ,hideLoading} from "components/Loading/LoadingModal";
class FlatListItem extends Component {
  state={
    checkmau : false, 
    check: false,
    messenger: '',
    datata:[]
  }
  check = async() =>{  
    console.log(this.props.task.taskDem,this.props.limit,'soánh')
   
    if (this.props.task.taskDem < this.props.limit){
        if(this.state.checkmau === true){
            this.props.dem2(this.props.item.id)
          }else{
            this.props.dem(this.props.item.id)
          }
        this.setState({
            checkmau : !this.state.checkmau
          })
    }else{
      if (this.props.task.taskDem === this.props.limit){
       
        for( var i = 0; i <  this.props.task.taskId.length; i++){ 
          if (  this.props.item.id === this.props.task.taskId[i]) {
            if(this.state.checkmau === true){
              this.props.dem2(this.props.item.id)
            }else{
              this.props.dem(this.props.item.id)
            }
          this.setState({
              checkmau : !this.state.checkmau
            })
          }
       }
    }
    }
  }
  componentDidMount () {
    this.setState ({
      check: false,
    });
    if (this.props.item.selected === 1) {
      this.setState ({
        checkmau: true,
      })
    }else{
        this.setState ({
          checkmau: false,
        });
      }
    }
  
  reset = () => {
    this.setState ({
      check: false,
    });
  };
  render() {
    console.log(this.props.task.taskDem,this.props.task.taskId,'iddddddddd')
    //this.state.checkmau = this.props.item.selected === 1 ? true : false
    let backgroundColor =this.state.checkmau === true ? '#FFCB78' : "white"
    let id = backgroundColor === '#FFCB78' ? this.props.item.id :'null'

   // this.props.AddID(id)
   // console.log(id,this.props.item.name,'idddddd')
   // console.log(this.props.task.taskId,'tákid')
    return (
      <View style={styles.viewitem}>
         {this.props.item.name === "Other"  ? (
             <TouchableOpacity style={[styles.item,{backgroundColor}]} onPress={this.check}>
             <Image
               style={styles.img2}
               source={{uri: this.props.item.image}}
               resizeMode="stretch"
             />
           </TouchableOpacity>
         ): (
            <TouchableOpacity style={[styles.item,{backgroundColor}]} onPress={this.check}>
            <Image
              style={styles.img1}
              source={{uri: this.props.item.image}}
              resizeMode="stretch"
            />
          </TouchableOpacity> 
         )} 
        <Text style={styles.txt}>{this.props.item.name}</Text>
        {this.state.check === true
          ? <ModalLogin
              check={this.state.check}
              messenger={this.state.messenger}
              reset={this.reset}
            />
          : <View />}
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
export default connect (mapStatetoProps,mapDispatToProps) (FlatListItem);
const styles = StyleSheet.create({
    container: {
      flex:1,
      marginBottom:70
    },
    viewitem:{
      alignItems: "center",
    },
    item: {
      backgroundColor: "white",
      height: (ITEM_WIDTH - 60) / 4,
      width: (ITEM_WIDTH - 60) / 4,
      borderRadius: (ITEM_WIDTH - 60) / 4,
      justifyContent: "center",
      alignItems: "center",
      margin: 7,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.2,
      elevation: 5,
    },
    img1: {
      height: 50,
      width: 50
    },
    img2: {
      height: 12,
      width: 50
    },
    txt:{
        color:"black"
    }
  });
  