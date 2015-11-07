import React from 'react';


class Stream extends React.Component {
  render () {
    const { streamId, streams, channels} = this.props;
    const stream = streams[streamId];
    const channel = channels[stream.channel];
    return (
      <div className='stream-container col-md-4'>
        <div className='stream-image'>
          <img src={stream.preview.medium} />
        </div>
        <div className='stream-game'>{stream.game}</div>
        <div className='stream-title'>{channel.status}</div>
        <div className='stream-footer'>
          <div className='stream-viewers'>{stream.viewers}</div>
        </div>
      </div>
    );
  }
}

export default Stream;
