import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class Header extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Not Another Todo App 🧞‍</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#686de0',
  },
  text: {
    fontSize: 30,
    color: 'white',
  },
});
