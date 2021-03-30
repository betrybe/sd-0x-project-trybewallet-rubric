import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrenciesAction, includeExpenseAction, editAction } from '../actions';

const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class Form extends Component {
  constructor() {
    super();
    this.state = {
      description: '',
      value: 0,
      tag: 'Alimentação',
      method: 'Dinheiro',
      currency: 'USD',
    };
    this.handleInput = this.handleInput.bind(this);
    this.onClick = this.onClick.bind(this);
    this.renderInput = this.renderInput.bind(this);
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleInput({ target }) {
    const { editing } = this.props;
    this.setState({ [target.name]: target.value });
    if (target.name === 'tag' && !editing) {
      const { getCurrencies } = this.props;
      getCurrencies();
    }
  }

  onClick(type) {
    const { method, tag, description, value, currency } = this.state;
    const { includeExpense, currencies, edit } = this.props;
    const expense = {
      exchangeRates: currencies, method, tag, description, value, currency,
    };
    return type !== 'edit' ? includeExpense(expense) : edit(expense);
  }

  renderInput(name) {
    const { state } = this;
    return (<input
      name={ name }
      data-testid={ `${name}-input` }
      value={ state[name] }
      onChange={ this.handleInput }
    />);
  }

  renderSelect(name, options) {
    return (
      <select
        name={ name }
        data-testid={ `${name}-input` }
        onChange={ (e) => this.handleInput(e) }
      >
        {options.map(
          (option) => <option key={ option } data-testid={ option }>{option}</option>,
        )}
      </select>
    );
  }

  renderBtn(editing) {
    if (editing) {
      return (
        <button type="button" onClick={ () => this.onClick('edit') }>
          Editar despesa
        </button>
      );
    }
    return <button type="button" onClick={ this.onClick }>Adicionar despesa</button>;
  }

  renderAddForm() {
    const { currencies, editing } = this.props;
    return (
      <>
        {this.renderInput('value')}
        {this.renderInput('description')}
        {this.renderSelect('currency',
          Object.keys(editing ? editing.exchangeRates : currencies))}
        {this.renderSelect('method', methods)}
        {this.renderSelect('tag', tags)}
        {this.renderBtn(editing)}
      </>
    );
  }

  render() {
    return (
      <div>
        {this.renderAddForm() }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(getCurrenciesAction()),
  includeExpense: (expense) => dispatch(includeExpenseAction(expense)),
  edit: (expense) => dispatch(editAction(expense)),
});

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  editing: wallet.editing,
});

Form.defaultProps = {
  editing: false,
};

Form.propTypes = {
  getCurrencies: PropTypes.func.isRequired,
  includeExpense: PropTypes.func.isRequired,
  currencies: PropTypes.objectOf(PropTypes.object).isRequired,
  editing: PropTypes.objectOf(PropTypes.object),
  edit: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
