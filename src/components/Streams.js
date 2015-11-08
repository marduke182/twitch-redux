import React from 'react';
import Stream from 'components/Stream';
import infiniteScrollify from 'components/InfiniteScrollify';


class Streams extends React.Component {
  render () {
    const { streams, allStreams, channels, onStreamClick} = this.props;

    return (
      <div className='streams-container'>
        {streams.map(streamId => {
          const streamClick = onStreamClick.bind(this, streamId);
          return (<Stream
            streams={allStreams}
            channels={channels}
            streamId={streamId}
            onClick={streamClick}
            key={streamId}/>);
        }
        )}
      </div>
    );
  }
}

Streams.propTypes = {
  channels: React.PropTypes.object,
  allStreams: React.PropTypes.object,
  streams: React.PropTypes.array,
  onStreamClick: React.PropTypes.func
};

export default infiniteScrollify(Streams);
