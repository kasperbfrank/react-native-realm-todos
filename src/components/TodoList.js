import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  Button,
  StyleSheet,
} from 'react-native';
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
          {hasTodos && !this.todos.filter(t => !t.completed).length && (
            <Text style={styles.emptyState}>
              You completed everything on your todo list 🥳. Time to grab a 🍺
              and chill!
            </Text>
          )}
          {hasTodos ? (
            <Button title="Reset" onPress={() => this.props.clearTodos()} />
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
            data={this.todos
              .filter(t => !t.completed)
              .map((todo, i) => ({todo, key: i.toString()}))}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.todoItem}
                onPress={() => this.props.toggleTodoComplete(item.todo)}>
                <Text>{item.todo.title}</Text>
              </TouchableOpacity>
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
  toggleTodoComplete: todo =>
    transaction(_ => (todo.completed = !todo.completed)),
  clearTodos: () => transaction(realm => realm.delete(realm.objects('Todo'))),
});

export default attach(realm, mapRealmToProps, mapTransactionToProps)(TodoList);
