import React, { PureComponent } from 'react';
import { View, Modal } from 'react-native';
import Spinner from 'react-native-spinkit';
import PropTypes from 'prop-types';
import R from '../../assets/R';
import LoadingManager from './LoadingManager';

const TIME_OUT = 10 * 1000;

export function showLoading() {
  const ref = LoadingManager.getDefault();

  if (!!ref) {
    ref.showLoading();
  }
}

export function hideLoading() {
  const ref = LoadingManager.getDefault();

  if (!!ref) {
    ref.hideLoading();
  }
}

class LoadingModal extends PureComponent {
  static defaultProps = {
    spinnerSize: 40,
    // 'CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots',
    // 'ThreeBounce', 'Circle', '9CubeGrid', 'WordPress', 'FadingCircle',
    // 'FadingCircleAlt', 'Arc', 'ArcAlt'
    spinnerType: 'Circle',
    spinnerColor: R.colors.white0,
  };

  static propTypes = {
    spinnerSize: PropTypes.number,
    spinnerType: PropTypes.string,
    spinnerColor: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }

  componentWillUnmount() {
    if (this.loadingTimeout) clearTimeout(this.loadingTimeout);
  }

  hideLoading = () => {
    if (this.loadingTimeout) clearTimeout(this.loadingTimeout);
    this.setState({ isVisible: false });
  };

  showLoading = () => {
    this.loadingTimeout = setTimeout(() => {
      this.setState({ isVisible: false });
    }, TIME_OUT);
    this.setState({ isVisible: true });
  };

  render() {
    return (
      <Modal
        transparent
        animationType="fade"
        style={{ position: 'absolute' }}
        visible={this.state.isVisible}
      >
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.25)',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Spinner
            isVisible
            size={this.props.spinnerSize}
            type={this.props.spinnerType}
            color={this.props.spinnerColor}
          />
        </View>
      </Modal>
    );
  }
}

export default LoadingModal;
