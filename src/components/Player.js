import React from 'react';


class Player extends React.Component {
  render () {
    const { streamId, streams, channels} = this.props;
    const stream = streams[streamId];
    let channel;
    if (stream) {
      channel = channels[stream.channel];
    }
    let container;
    if (channel) {
      container = (<iframe src={`http://player.twitch.tv/?channel=${channel.name}`} frameBorder='0' height='600px' width='100%'></iframe>);
    } else {
      container = (<div>No selected stream</div>);
    }
    return (
      <div className='stream-container col-md-12'>
        {container}
      </div>
    );
  }
}

Player.propTypes = {
  channels: React.PropTypes.object,
  streams: React.PropTypes.object,
  streamId: React.PropTypes.number
};

export default Player;
