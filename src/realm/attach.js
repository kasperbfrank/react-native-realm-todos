import React from 'react';

export const attach = (
  realm,
  mapRealmToProps,
  mapTransactionToProps,
) => WrappedComponent =>
  class extends React.Component {
    async componentDidMount() {
      // State
      const _realm = await realm;
      const update = () => this.setState(mapRealmToProps(_realm));
      _realm.addListener('change', update);
      update();

      // Transactions
      if (mapTransactionToProps) {
        const write = fn => _realm.write(() => fn(_realm));
        this.setState(mapTransactionToProps(write));
      }
    }

    render() {
      const props = {...this.props, ...this.state};
      return <WrappedComponent {...props} />;
    }
  };
