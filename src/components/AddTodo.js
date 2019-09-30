import React from 'react';
import {TextInput} from 'react-native';

const placeholders = ['Learn how to 💃🕺', 'Get 💩 done ', 'Build a 🚀'];

export default class AddTodo extends React.PureComponent {
  state = {text: ''};

  submitClear() {
    this.props.submit(this.state.text);
    this.setState({text: ''});
  }

  render() {
    return (
      <TextInput
        style={{
          height: 40,
          fontSize: 18,
          borderColor: 'gray',
          borderBottomWidth: 1,
        }}
        onChangeText={text => this.setState({text})}
        value={this.state.text}
        placeholder={placeholders[Math.round(Math.random() * 2)]}
        onSubmitEditing={() => this.submitClear()}
      />
    );
  }
}
