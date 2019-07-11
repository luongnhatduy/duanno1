import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Container from '../../../libraries/component/Container';
import Header from '..//..//..//libraries/component/Header';
import Sliderr2 from '..//component/Slider2';
import apis from 'features/src/libraries/Apis/Apis';
import {connect} from 'react-redux';
import {
  StartLevel,
  EndLevel,
  StartRange,
  EndRange,
} from './/..//..//..//libraries/redux/action';
import {showLoading, hideLoading} from 'components/Loading/LoadingModal';
import { showFlashMessage } from 'helpers/Utils';
import constants from 'features/src/libraries/utils/constants';

class Fillter extends Component {

  filter = () => {
    showLoading ();
    apis
      .post (
        apis.PATH.UPDATE_FILLTER,
        {
          start_level: this.props.task.taskstartlevel,
          end_level: this.props.task.taskendlevel,
          start_range: this.props.task.taskstartrange,
          end_range: this.props.task.taskendrange,
        },
        true
      )
      .then (res => {
        hideLoading ();
        console.log (res, 'filter');
        if (res.code === 200){
            this.props.navigation.goBack (null);
        }else{
            showFlashMessage(res.msgdefault,constants.typeMessage.DANGER)
        }
      })
      .catch (err => {
        hideLoading ();
        console.log ('loi', err);
      });
  };
  render () {
    return (
      <Container txt>
        <Header
          text="Fillter"
          back
          save="Save"
          filter={this.filter}
          {...this.props}
        />
        <Sliderr2
        //   setstartlevel={this.setstartlevel}
        //   setendlevel={this.setendlevel}
        //   setstartrange={this.setstartrange}
        //   setendrange={this.setendrange}
          {...this.props}
        />
      </Container>
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
export default connect (mapStateToProps, mapDispatToProps) (Fillter);

const styles = StyleSheet.create ({});
