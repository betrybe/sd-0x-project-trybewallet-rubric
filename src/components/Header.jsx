import { connect } from 'react-redux';
import propTypes from 'prop-types';
import React from 'react';

class Header extends React.Component {
  render() {
    const { email, total, currency } = this.props;
    return (
      <div>
        <p data-testid="email-field">
          {email}
        </p>
        <hr />
        Total:
        <div data-testid="total-field">
          {`${total}`}
          {' '}
          <p data-testid="header-currency-field">{currency || 'BRL'}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  total: wallet.total,
  currency: wallet.currency,
});

Header.propTypes = {
  email: propTypes.string.isRequired,
  total: propTypes.number,
  currency: propTypes.string,
};
Header.defaultProps = {
  total: 0,
  currency: 'BRL',
};
export default connect(mapStateToProps)(
  Header,
);
