import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import RSlider from './RSlider';
export default class Sliderr extends Component {
  constructor (props) {
    super (props);
    this.state = {
      cl1: 'rgba(156, 39, 176, 0)',
      cl2: '#FFCB78',
      cl3: 'black',
      check1: false,
      check2: false,
      check3: false,
      data: [],
    };
  }
  componentDidMount () {
    // this.setState({
    //   data:[]
    // })
  }
  loadcheck = dt => {
    console.log (dt, 'dt');
    for (var i = 0; i < dt.length; i++) {
      console.log (i, dt[i], 'd[i]');
      if (dt[i] == 1) {
        this.setState ({
          check1: true,
        });

        this.state.data.push (1);
      } else {
        if (dt[i] == 2) {
          this.setState ({
            check2: true,
          });

          this.state.data.push (2);
        } else {
          if (dt[i] == 3) {
            this.setState ({
              check3: true,
            });

            this.state.data.push (3);
          }
        }
      }
    }
    this.props.setgender (this.state.data);
  };
  check = () => {
    this.setState ({
      check1: !this.state.check1,
    });
    if (this.state.check1 === false) {
      this.state.data.push (1);
    } else {
      for (var i = 0; i < this.state.data.length; i++) {
        if (this.state.data[i] === 1) {
          this.state.data.splice (i, 1);
        }
      }
    }
    this.props.setgender (this.state.data);
  };
  check2 = () => {
    this.setState ({
      check2: !this.state.check2,
    });
    if (this.state.check2 === false) {
      // const newData = [...this.state.data,2];
      // this.setState ({data: newData});
      this.state.data.push (2);
    } else {
      for (var i = 0; i < this.state.data.length; i++) {
        if (this.state.data[i] === 2) {
          this.state.data.splice (i, 1);
        }
      }
    }
    this.props.setgender (this.state.data);
  };
  check3 = () => {
    this.setState ({
      check3: !this.state.check3,
    });
    if (this.state.check3 === false) {
      // const newData = [...this.state.data,3];
      // this.setState ({data: newData});
      this.state.data.push (3);
    } else {
      for (var i = 0; i < this.state.data.length; i++) {
        if (this.state.data[i] === 3) {
          this.state.data.splice (i, 1);
        }
      }
    }
    this.props.setgender (this.state.data);
  };
  render () {
    let color1 = this.state.check1 === true ? this.state.cl2 : this.state.cl1;
    let color2 = this.state.check2 === true ? this.state.cl2 : this.state.cl1;
    let color3 = this.state.check3 === true ? this.state.cl2 : this.state.cl1;
    let colortxt1 = this.state.check1 === true
      ? this.state.cl2
      : this.state.cl3;
    let colortxt2 = this.state.check2 === true
      ? this.state.cl2
      : this.state.cl3;
    let colortxt3 = this.state.check3 === true
      ? this.state.cl2
      : this.state.cl3;
    console.log (this.state.data, 'data');
    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.title}>Gender</Text>
          <View style={styles.viewGender}>
            <View
              style={[
                styles.genderchild,
                {
                  borderColor: color1,
                  borderWidth: 1,
                  borderRadius: 7,
                  right: 1,
                },
              ]}
            >
              <TouchableOpacity style={styles.btgender} onPress={this.check}>
                <Text style={[styles.txt, {color: colortxt1}]}>Male</Text>
              </TouchableOpacity>
            </View>

            <View
              style={[
                styles.genderchild,
                {
                  borderColor: color2,
                  borderWidth: 0.7,
                  borderRadius: 7,
                  right: 1,
                },
              ]}
            >
              <TouchableOpacity style={styles.btgender} onPress={this.check2}>
                <Text style={[styles.txt, {color: colortxt2}]}>
                  Female
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={[
                styles.genderchild,
                {
                  borderColor: color3,
                  borderWidth: 0.7,
                  borderRadius: 7,
                  right: 1,
                },
              ]}
            >
              <TouchableOpacity style={styles.btgender} onPress={this.check3}>
                <Text style={[styles.txt, {color: colortxt3}]}>
                  Non-binary
                </Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
        {/* <RSlider title='Age' min={18} max={100} minbt={18} maxbt={24}/>   */}

      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    margin: 10,
  },
  title: {
    color: '#888888',
    fontSize: 16,
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
