import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import streamActions          from 'actions/streams';
import Stream                 from 'components/Stream';
import Streams                 from 'components/Streams';
import Player                 from 'components/Player';


// We define mapStateToProps and mapDispatchToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  streams: state.entities.streams,
  channels: state.entities.channels,
  currentStreams: state.streams.items,
  currentStream: state.currentStream,
  counter: state.counter,
  routerState: state.router
});
const mapDispatchToProps = (dispatch) => ({
  actions: {
    stream: bindActionCreators(streamActions, dispatch)
  }
});
export class HomeView extends React.Component {
  constructor (prop) {
    super(prop);
    this.handleStreamClick = this.handleStreamClick.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentWillMount () {
    const { actions } = this.props;
    actions.stream.requestStreams();
  }

  handleStreamClick (streamId) {
    this.props.actions.stream.changeCurrentStream(streamId);
  }

  handleScroll () {
    console.log('must load next streams');
  }

  render () {
    const { currentStream, currentStreams, streams, channels } = this.props;
    const { streamId: currentStreamId } = currentStream;
    return (
      <div className='container text-center'>
        <h1>Last Steams</h1>
        <Player channels={channels} streams={ streams } streamId={ currentStreamId }/>
        <Streams
          streams={currentStreams}
          allStreams={streams}
          channels={channels}
          onStreamClick={this.handleStreamClick}
          scrollFunc={this.handleScroll}
        />
      </div>
    );
  }
}

HomeView.propTypes = {
  actions: React.PropTypes.object,
  counter: React.PropTypes.number,
  currentStreams: React.PropTypes.array,
  currentStream: React.PropTypes.object,
  streams: React.PropTypes.object,
  channels: React.PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
