import React from 'react';
import Game from 'components/Game';
import infiniteScrollify from 'components/InfiniteScrollify';


class Games extends React.Component {
  render () {
    const { games, onGameClick} = this.props;

    return (
      <div className='games-container'>
        {games.map(game => {
          const streamClick = onGameClick.bind(this, game.name);
          return (<Game
            game={game}
            onClick={streamClick}
            key={game.name}/>);
        }
        )}
      </div>
    );
  }
}

Games.propTypes = {
  games: React.PropTypes.array,
  onGameClick: React.PropTypes.func
};

export default infiniteScrollify(Games);
