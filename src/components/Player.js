import React from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import streamActions          from 'actions/streams';

const mapStateToProps = (state) => ({
  streams: state.entities.streams,
  channels: state.entities.channels,
  currentStream: state.currentStream
});
const mapDispatchToProps = (dispatch) => ({
  actions: {
    stream: bindActionCreators(streamActions, dispatch)
  }
});
class Player extends React.Component {
  constructor (props) {
    super(props);
    this.handlerCloseStream = this.handlerCloseStream.bind(this);
  }
  handlerCloseStream () {
    this.props.actions.stream.resetCurrentStream();
  }

  render () {
    const { streams, channels, currentStream} = this.props;
    const { streamId } = currentStream;
    const stream = streams[streamId];
    let channel;
    if (stream) {
      channel = channels[stream.channel];
    }
    const height = 600 * 9 / 16;
    let container;
    if (channel) {
      container = (
        <div className='player-container col-md-12'>
          <div className='player-actions'>
            <i className='glyphicon glyphicon-remove-circle' onClick={this.handlerCloseStream} />
          </div>
          <iframe
            src={`http://player.twitch.tv/?channel=${channel.name}`}
            frameBorder='0'
            height={`${height}px`}
            width='100%'
            allowFullScreen='true'
          ></iframe>
        </div>
        );
    } else {
      container = (<div></div>);
    }
    return (
      <div>
        {container}
      </div>
    );
  }
}

Player.propTypes = {
  actions: React.PropTypes.object,
  channels: React.PropTypes.object,
  streams: React.PropTypes.object,
  currentStream: React.PropTypes.object,
  streamId: React.PropTypes.number
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);

