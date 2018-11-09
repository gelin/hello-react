import './style.scss';

import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';

import {getGreetings, resetGreetings} from './actions';


class Greetings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      submitDisabled: true,
    };
  }

  onChange = (e) => {
    const state = {
      ...this.state,
      [e.target.name]: e.target.value,
    };

    const isValid = this.validate(state);
    this.setState({
      ...state,
      submitDisabled: !isValid,
    });
    if (!isValid) {
      this.props.resetGreetings();
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.getGreetings(this.state.name);
  };

  validate = (data) => {
    const isNotEmpty = (str) => !!str;
    const validatingRules = [
      {
        name: 'name',
        validatingRules: [isNotEmpty],
      },
    ];

    return validatingRules.reduce((res, el) => {
      const val = data[el.name];
      return res && el.validatingRules.reduce((_res, func) => _res && func(val), true);
    }, true);
  };

  render() {
    return (
      <div className="greetings">
        <form
          autoComplete="off"
          className="greetings-form"
          onChange={this.onChange}
          onSubmit={this.onSubmit}
        >
          <div className="greetings-form__input">
            <div className="greetings-form__input-title">User name</div>
            <input type="text" name="name" placeholder="Enter your name" />
          </div>
          <button className="greetings-form__submit" type="submit" disabled={this.state.submitDisabled}>
            Hello!
          </button>
          <textarea
            className="greetings-form__text"
            name="text"
            readOnly={true}
            rows={1}
            placeholder="Enter name and try HELLO!"
            value={this.props.greetings}
          />
        </form>
      </div>
    );
  }
}

Greetings.propTypes = {
  getGreetings: PropTypes.func,
  resetGreetings: PropTypes.func,
  greetings: PropTypes.string,
};

Greetings.defaultProps = {
  getGreetings: () => {},
  resetGreetings: () => {},
  greetings: '',
};

const mapStateToProps = (state) => ({
  greetings: state.greetingsReducer.greetings,
});

const mapDispatchToProps = (dispatch) => ({
  getGreetings: bindActionCreators(getGreetings, dispatch),
  resetGreetings: bindActionCreators(resetGreetings, dispatch),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Greetings)
);
