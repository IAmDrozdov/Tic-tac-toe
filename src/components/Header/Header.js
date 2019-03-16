import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setUsernameAction } from '../../actions/headerActions';
import './Header.css';

const propTypes = {
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired
};
const Header = ({ username, setUsername }) => {
  return (
    <div>
      {username}
      <button
        type='button'
        onClick={() => setUsername(`${(new Date()).getMilliseconds()}`)}
      >
        set to lol
      </button>
    </div>
  );
};

Header.propTypes = propTypes;

const mapStateToProps = state => ({
  username: state.header.username
});

const mapDispatchToProps = (dispatch) => ({
  setUsername: (username) => dispatch(setUsernameAction(username))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);