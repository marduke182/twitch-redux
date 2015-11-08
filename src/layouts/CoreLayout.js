import React from 'react';
import 'styles/core.scss';
import Header from 'components/Header';
import Player from 'components/Player';


export default class CoreLayout extends React.Component {
  static propTypes = {
    children : React.PropTypes.element
  }

  render () {
    return (
      <div className='page-container'>
        <Header/>
        <div className='view-container'>
          <iframe
            src='http://nodeknockout.com/iframe/usb-in-barcelona'
            frameBorder='0'
            scrolling='no'
            allowTransparency='true'
            width='115'
            height='25'
          >
          </iframe>
          {this.props.children}
          <Player/>
        </div>
      </div>
    );
  }
}
