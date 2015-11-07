import React from 'react';
import {FormattedNumber} from 'react-intl';


class Stream extends React.Component {
  render () {
    const { streamId, streams, channels, onClick} = this.props;
    const stream = streams[streamId];
    const channel = channels[stream.channel];

    return (
      <div className='stream-container col-md-4' onClick={onClick}>
        <div className='stream-image'>
          <img src={stream.preview.medium} />
        </div>
        <div className='stream-game'>{stream.game}</div>
        <div className='stream-title'>{channel.status}</div>
        <div className='stream-footer'>
          <div className='stream-viewers'>
            <FormattedNumber value={stream.viewers} />
          </div>
        </div>
      </div>
    );
  }
}

Stream.propTypes = {
  streamId  : React.PropTypes.number,
  channels: React.PropTypes.object,
  streams: React.PropTypes.object,
  onClick: React.PropTypes.func
};

export default Stream;
