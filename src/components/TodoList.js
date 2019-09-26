import React from 'react';
import {View, Text, FlatList, Button, StyleSheet} from 'react-native';
import AddTodo from './AddTodo';

import realm from '../realm';

export default class TodoList extends React.PureComponent {
  state = {todos: []};

  async componentDidMount() {
    const _realm = await realm;
    const update = () => this.setState({todos: _realm.objects('Todo')});
    _realm.addListener('change', update);
    update();
  }

  async addTodo(title) {
    const _realm = await realm;
    try {
      _realm.write(() => _realm.create('Todo', {title}));
    } catch (err) {
      console.log(`error creating todo`, err);
    }
  }

  async reset() {
    const _realm = await realm;
    try {
      _realm.write(() => _realm.delete(_realm.objects('Todo')));
    } catch (err) {
      console.log(`error resetting todos`, err);
    }
  }

  render() {
    const hasTodos = this.state.todos.length > 0;

    return (
      <View style={styles.container}>
        <Text style={{alignSelf: 'center', fontSize: 40}}>Hi there! 🙋‍</Text>
        {!hasTodos ? (
          <Text style={styles.emptyState}>You have no todos 🤔</Text>
        ) : (
          <View>
            <FlatList
              data={this.state.todos.map((t, i) => ({...t, key: i.toString()}))}
              renderItem={({item}) => <Text>{item.title}</Text>}
            />
          </View>
        )}

        <AddTodo style={{marginTop: 40}} submit={todo => this.addTodo(todo)} />
        {hasTodos && (
          <Button
            style={{marginTop: 100}}
            title="Clear"
            onPress={() => this.reset()}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '60%',
    marginHorizontal: 20,
    justifyContent: 'space-evenly',
  },
  emptyState: {
    alignSelf: 'center',
    fontSize: 24,
  },
});
