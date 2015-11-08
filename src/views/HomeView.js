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
  topChannels: state.streams.top.items,
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
    const { actions, topChannels} = this.props;
    if (!topChannels || topChannels.length === 0) {
      actions.stream.fetchStreamsIfNeeded('top');
    }
  }

  handleStreamClick (streamId) {
    this.props.actions.stream.changeCurrentStream(streamId);
  }

  handleScroll () {
    const { actions } = this.props;
    actions.stream.fetchStreamsIfNeeded('top');
  }

  render () {
    const { topChannels, streams, channels } = this.props;
    return (
      <div className='container text-center'>
        <h1>Top Channels</h1>
        <Streams
          streams={topChannels}
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
  topChannels: React.PropTypes.array,
  streams: React.PropTypes.object,
  channels: React.PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
