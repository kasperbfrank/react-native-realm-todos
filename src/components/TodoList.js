import React from 'react';
import {View, Text, FlatList, Button, StyleSheet} from 'react-native';
import AddTodo from './AddTodo';

import realm from '../realm';
import {attach} from '../realm/attach';

class TodoList extends React.PureComponent {
  get todos() {
    return this.props.todos || [];
  }

  render() {
    const hasTodos = this.todos.length > 0;

    return (
      <View style={styles.container} behavior="padding">
        <Text style={{alignSelf: 'center', fontSize: 40, marginBottom: 20}}>
          Hi there! 🙋‍
        </Text>
        <View style={{marginBottom: 20}}>
          {hasTodos ? (
            <Button title="Clear" onPress={() => this.props.clearTodos()} />
          ) : (
            <Text style={styles.emptyState}>
              Create a todo to get started 👇
            </Text>
          )}
        </View>
        <AddTodo
          style={{marginTop: 40}}
          submit={todo => this.props.addTodo(todo)}
        />
        {hasTodos && (
          <FlatList
            style={{marginTop: 10}}
            data={this.todos.map((t, i) => ({...t, key: i.toString()}))}
            renderItem={({item}) => (
              <View style={styles.todoItem}>
                <Text>{item.title}</Text>
              </View>
            )}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '80%',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  emptyState: {
    alignSelf: 'center',
    fontSize: 24,
  },
  todoItem: {
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 5,
  },
});

const mapRealmToProps = realm => ({todos: realm.objects('Todo')});
const mapTransactionToProps = transaction => ({
  addTodo: title => transaction(realm => realm.create('Todo', {title})),
  clearTodos: () => transaction(realm => realm.delete(realm.objects('Todo'))),
});

export default attach(realm, mapRealmToProps, mapTransactionToProps)(TodoList);
