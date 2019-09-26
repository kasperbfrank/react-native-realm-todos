import React from 'react';

export const setBackground = color => WrappedComponent =>
  class extends React.Component {
    componentDidMount() {
      console.log(`background`, color);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
