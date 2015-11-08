import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import streamActions          from 'actions/streams';
import Streams                 from 'components/Streams';


// We define mapStateToProps and mapDispatchToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  streams: state.entities.streams,
  channels: state.entities.channels,
  gameName: state.router.params.channelName,
  gameChannels: state.streams[state.router.params.channelName] ? state.streams[state.router.params.channelName].items : []
});
const mapDispatchToProps = (dispatch) => ({
  actions: {
    stream: bindActionCreators(streamActions, dispatch)
  }
});
export class ChannelView extends React.Component {
  constructor (prop) {
    super(prop);
    this.handleStreamClick = this.handleStreamClick.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentWillMount () {
    const { actions, gameChannels, gameName} = this.props;
    if (!gameChannels || gameChannels.length === 0) {
      actions.stream.fetchStreamsIfNeeded(gameName);
    }
  }

  handleStreamClick (streamId) {
    this.props.actions.stream.changeCurrentStream(streamId);
  }

  handleScroll () {
    const { actions, gameName} = this.props;
    actions.stream.fetchStreamsIfNeeded(gameName);
  }


  render () {
    const { gameChannels, streams, channels, gameName } = this.props;

    return (
      <div className='container text-center'>
        <h1>{gameName} Channels</h1>
        <Streams
          streams={gameChannels}
          allStreams={streams}
          channels={channels}
          onStreamClick={this.handleStreamClick}
          scrollFunc={this.handleScroll}
        />
      </div>
    );
  }
}

ChannelView.propTypes = {
  actions: React.PropTypes.object,
  gameChannels: React.PropTypes.array,
  gameName: React.PropTypes.string,
  streams: React.PropTypes.object,
  channels: React.PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelView);
