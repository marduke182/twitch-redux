import React from 'react';
import format from 'format-number';
const formatNumber = format();

class Game extends React.Component {
  render () {
    const { game, onClick} = this.props;
    const viewers = formatNumber(game.viewers);
    return (
      <div className='game-container col-md-3'>
        <div className='game-image' onClick={onClick}>
          <img src={game.box.medium} width='100%'/>
          <div className='overlay'>
            <i className='glyphicon glyphicon-new-window'/>
          </div>
        </div>
        <div className='game-footer'>
          <div className='game-title'>{game.name}</div>
          <div className='game-viewers'>
            {viewers} viewers.
          </div>
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  game  : React.PropTypes.object,
  onClick: React.PropTypes.func
};

export default Game;
