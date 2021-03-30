import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import { deleteExpenseAction, editingSwitchAction } from '../actions';

const heads = [
  'Descrição', 'Tag', 'Método de pagamento', 'Valor',
  'Moeda', 'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão',
];
class Expenses extends Component {
  renderHeads() {
    const { editingSwitch } = this.props;
    return (
      <thead>
        <tr>
          {heads.map((head) => <td key={ head }>{head}</td>)}
          <td>
            <button type="button" onClick={ editingSwitch }>Editar/Excluir</button>
          </td>
        </tr>
      </thead>
    );
  }

  renderEditDeleteBtn(id) {
    const { editingSwitch, deleteEx } = this.props;
    return (
      <td>
        <button
          type="button"
          data-testid="delete-btn"
          onClick={ () => deleteEx(id) }
        >
          X
        </button>
        <button
          type="button"
          data-testid="edit-btn"
          onClick={ () => editingSwitch(id) }
        >
          Edit
        </button>
      </td>);
  }

  renderBody() {
    const { expenses } = this.props;
    return expenses.map((
      { value, description, method, tag, currency, exchangeRates, id },
    ) => (
      <tr key={ description }>
        <td key={ description }>{description}</td>
        <td key={ tag }>{tag}</td>
        <td key={ method }>{method}</td>
        <td key={ value }>{value}</td>
        <td key={ currency }>Real</td>
        <td key={ exchangeRates[currency].name }>{exchangeRates[currency].name}</td>
        <td key={ 1 }>{parseFloat(exchangeRates[currency].ask).toFixed(2)}</td>
        <td key={ 2 }>{(parseFloat(exchangeRates[currency].ask) * value).toFixed(2)}</td>
        {this.renderEditDeleteBtn(id)}
      </tr>
    ));
  }

  render() {
    return (
      <div>
        <table>
          {this.renderHeads()}
          <tbody>
            {this.renderBody()}
          </tbody>
        </table>
      </div>
    );
  }
}

Expenses.propTypes = {
  expenses: PropType.arrayOf(PropType.object).isRequired,
  deleteEx: PropType.func.isRequired,
  editingSwitch: PropType.func.isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
  editing: wallet.editing,
});

const mapDispatchToProps = (dispatch) => ({
  deleteEx: (id) => dispatch(deleteExpenseAction(id)),
  editingSwitch: (id) => dispatch(editingSwitchAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
