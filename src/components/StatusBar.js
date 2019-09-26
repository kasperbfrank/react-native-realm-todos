import React from 'react';
import {View, StyleSheet} from 'react-native';

const StatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, {backgroundColor}]} />
);

const styles = StyleSheet.create({
  statusBar: {
    height: 20,
  },
});

export default StatusBar;
