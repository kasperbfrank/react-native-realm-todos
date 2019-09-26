import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import createStore from './store/';
import StatusBar from './components/StatusBar';
import Header from './components/Header';
import TodoList from './components/TodoList';

const {store, persistor} = createStore();

class App extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={styles.container}>
            <StatusBar backgroundColor="#686de0" />
            <Header />
            <TodoList />
          </View>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  statusBar: {
    height: 20,
  },
  container: {
    height: '100%',
  },
});

export default App;
