import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import streamActions          from 'actions/streams';
import gameActions            from 'actions/games';
import Streams                 from 'components/Streams';
import Games                 from 'components/Games';


// We define mapStateToProps and mapDispatchToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  streams: state.entities.streams,
  channels: state.entities.channels,
  activeGame: state.activeGame,
  games: state.topGames.items.map(item => state.entities.games[item]),
  gameStreams: state.activeGame ? state.streams[state.activeGame].items : [],
  counter: state.counter,
  routerState: state.router
});
const mapDispatchToProps = (dispatch) => ({
  actions: {
    stream: bindActionCreators(streamActions, dispatch),
    game: bindActionCreators(gameActions, dispatch)
  }
});
export class GamesView extends React.Component {
  constructor (prop) {
    super(prop);
    this.handleStreamClick = this.handleStreamClick.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleGameClick = this.handleGameClick.bind(this);
    const { actions, gameStreams, activeGame, games} = this.props;
    if (activeGame && (!gameStreams || gameStreams.length === 0)) {
      actions.stream.fetchStreamsIfNeeded(activeGame);
    }
    if (!games || games.length === 0) {
      actions.game.requestTopGames(activeGame);
    }
  }

  handleStreamClick (streamId) {
    this.props.actions.stream.changeCurrentStream(streamId);
  }

  handleGameClick (gameName) {
    this.props.actions.stream.changeActiveGame(gameName);
  }

  handleScroll () {
    console.log('must load next streams');
  }

  render () {
    const { gameStreams, streams, channels, games } = this.props;

    return (
      <div className='container text-center'>
        <h1>Games</h1>
        <Games
          games={games}
          onGameClick={this.handleGameClick}
          scrollFunc={this.handleScroll}
        />
      </div>
    );
  }
}

GamesView.propTypes = {
  actions: React.PropTypes.object,
  games: React.PropTypes.array,
  counter: React.PropTypes.number,
  activeGame: React.PropTypes.string,
  gameStreams: React.PropTypes.array,
  streams: React.PropTypes.object,
  channels: React.PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(GamesView);
