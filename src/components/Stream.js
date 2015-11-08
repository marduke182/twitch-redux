import React from 'react';
import {FormattedNumber} from 'react-intl';


class Stream extends React.Component {
  render () {
    const { streamId, streams, channels, onClick} = this.props;
    const stream = streams[streamId];
    const channel = channels[stream.channel];

    return (
      <div className='stream-container col-md-3'>
        <div className='stream-image' onClick={onClick}>
          <img src={stream.preview.medium} width='100%'/>
          <div className='overlay'>
            <i className='glyphicon glyphicon-play-circle'></i>
          </div>
        </div>
        <div className='stream-footer'>
          <div className='stream-title'>{channel.status}</div>
          <div className='stream-viewers'>
            <FormattedNumber value={stream.viewers} /> viewers on {channel.name}
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
