import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import RangeSlider from 'rn-range-slider';

export default class RSlider extends Component {
  state = {
    rangeLow: this.props.minbt,
    rangeHigh: this.props.maxbt,
  };
  loaddata=(min,max)=>{
    this.setState({
      rangeLow: min,
      rangeHigh: max,
    })
  }
  render () {
    console.log(this.state.rangeLow,this.state.rangeHigh)
    styles.title = this.props.color ? styles.title1 : styles.title2 
    return (
      <View>
        <View style={styles.viewtitle}>
          <Text style={styles.title}>{this.props.title}</Text>
          <Text style={styles.txtright}>
              {this.state.rangeLow}{this.props.phu} - {this.state.rangeHigh}{this.props.phu}
          </Text>
        </View>
        <View style={styles.viewslide}>
          <RangeSlider
          thumbRadius={15}
          //thumbBorderColor='rgba(0, 0, 0, 0.3)'
            style={{width: '101%', height: 40}}
            gravity={'center'}
            min={this.props.min}
            max={this.props.max}
            step={1}
            initialLowValue={this.state.rangeLow}
            initialHighValue={this.state.rangeHigh}
            labelStyle="none"
            lineWidth={2}
            selectionColor="#FFCB78"
            blankColor="#C7C7CC"
            onValueChanged={(low, high) => {
              this.setState ({rangeLow: low, rangeHigh: high});
              this.props.setagestart && this.props.setagestart(low);
              this.props.setageend && this.props.setageend(high)
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  viewtitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    margin: 10,
  },
  txtright: {
    color: 'black',
    fontSize: 14,
  },
  viewslide: {
    height: 50,
    margin: 10,
    marginTop: 0,
    marginBottom: 0,
  },
  title2: {
    color: '#888888',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title1: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  thum:{
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 5,
  }
});
