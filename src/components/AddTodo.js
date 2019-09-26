import React from 'react';
import {TextInput} from 'react-native';

export default class AddTodo extends React.PureComponent {
  state = {text: ''};

  submitClear() {
    this.props.submit(this.state.text);
    this.setState({text: ''});
  }

  render() {
    return (
      <TextInput
        style={{height: 40, borderColor: 'gray', borderBottomWidth: 1}}
        onChangeText={text => this.setState({text})}
        value={this.state.text}
        onSubmitEditing={() => this.submitClear()}
      />
    );
  }
}
