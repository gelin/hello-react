import './style.scss';

import PropTypes from 'prop-types';
import React from 'react';
import {withRouter} from 'react-router-dom';


class Layout extends React.Component {
  render() {
    return (
      <div className="layout">
        <div className="layout__content">{this.props.children}</div>
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node,
};

Layout.defaultProps = {
  children: '',
};

export default withRouter(
  (Layout)
);
