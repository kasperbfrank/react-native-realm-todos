import React from 'react';
import {connect} from 'react-redux';
import {View, Text, FlatList, Button, StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';

import AddTodo from './AddTodo';
import {addTodo, clearTodos} from '../store/actions/todo';

class TodoList extends React.PureComponent {
  render() {
    const hasTodos = this.props.todos.length > 0;

    return (
      <View style={styles.container}>
        {!hasTodos ? (
          <Text style={styles.emptyState}>You have no todos 🙋‍</Text>
        ) : (
          <View>
            <Button
              title="Clear"
              onPress={() => this.props.clearTodos()}></Button>
            <FlatList
              data={this.props.todos.map(t => ({
                key: t,
              }))}
              renderItem={({item}) => <Text>{item.key}</Text>}
            />
          </View>
        )}
        <AddTodo
          style={{marginTop: 40}}
          submit={todo => this.props.addTodo(todo)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    marginVertical: 40,
    marginHorizontal: 20,
  },
  emptyState: {
    alignSelf: 'center',
    fontSize: 24,
  },
});

const mapStateToProps = state => ({todos: state.todos});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addTodo,
      clearTodos,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodoList);
