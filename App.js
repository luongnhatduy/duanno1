/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format

 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import Reactotron from 'reactotron-react-native';

import MainNavigation from './src/routers/MainNavigation';
import LoadingModal from './src/components/Loading/LoadingModal';
import LoadingManager from './src/components/Loading/LoadingManager';
import NavigationService from './src/routers/NavigationService';
import RootView from './src/RootView';

import configureStore from './src/stores/configureStore';
import rootSaga from './src/sagas';
import ReactotronConfig from './src/helpers/ReactotronConfig';
// import env from './src/env';

const reactotron = ReactotronConfig.configure();
const sagaMonitor = Reactotron.createSagaMonitor();
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const store = configureStore(reactotron, sagaMiddleware);
Reactotron.clear();

sagaMiddleware.run(rootSaga);

export default class App extends Component {
  componentDidMount() {
    LoadingManager.register(this.loadingRef);
  }

  componentWillUnmount() {
    LoadingManager.unregister(this.loadingRef);
  }

  render() {
    return (
      <Provider store={store}>
        <RootView>
          <MainNavigation
            ref={navigatorRef => NavigationService.setTopLevelNavigator(navigatorRef)}
          />

          <LoadingModal
            ref={ref => {
              this.loadingRef = ref;
            }}
          />
        </RootView>
      </Provider>
    );
  }
}
