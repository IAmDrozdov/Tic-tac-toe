import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Header.css';

const propTypes = {
  username: PropTypes.string
};

const defaultProps = {
  username: 'if u c this mess, its mean that its not work'
};
const Header = ({ username }) => {
  return (
    <div>
      {username}
    </div>
  );
};

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {
    username: state.username
  };
}

export default connect(mapStateToProps)(Header);