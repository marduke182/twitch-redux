import React from 'react';
import 'styles/core.scss';
import Header from 'components/Header';

export default class CoreLayout extends React.Component {
  static propTypes = {
    children : React.PropTypes.element
  }

  render () {
    return (
      <div className='page-container'>
        <Header/>
        <div className='view-container'>
          {this.props.children}
        </div>
      </div>
    );
  }
}
