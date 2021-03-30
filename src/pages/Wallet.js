import React from 'react';
import Expenses from '../components/Expenses';
import Form from '../components/Form';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Form />
        <Expenses />
      </div>
    );
  }
}

export default Wallet;
