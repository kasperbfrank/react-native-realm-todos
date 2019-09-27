import React from 'react';
import {View, StyleSheet} from 'react-native';

import StatusBar from './components/StatusBar';
import Header from './components/Header';
import TodoList from './components/TodoList';

class App extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#686de0" />
        <Header />
        <TodoList />
      </View>
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
