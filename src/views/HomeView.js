import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import streamActions          from 'actions/streams';
import Stream                 from 'components/Stream';

// We define mapStateToProps and mapDispatchToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  streams: state.entities.streams,
  channels: state.entities.channels,
  currentStreams: state.streams.items,
  counter : state.counter,
  routerState : state.router
});
const mapDispatchToProps = (dispatch) => ({
  actions: {
    stream: bindActionCreators(streamActions, dispatch)
  }
});
export class HomeView extends React.Component {
  static propTypes = {
    actions  : React.PropTypes.object,
    counter  : React.PropTypes.number,
    currentStreams: React.PropTypes.Array,
    streams: React.PropTypes.object,
  };

  componentWillMount () {
    const { actions } = this.props;
    actions.stream.requestStreams();
  }

  render () {
    const { currentStreams, streams, channels } = this.props;
    return (
      <div className='container text-center'>
        <h1>Last Steams</h1>
        <div className='streams-container row'>
          {currentStreams.map(streamId => (
            <Stream streams={streams} channels={channels} streamId={streamId} key={streamId}/>
          ))}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
