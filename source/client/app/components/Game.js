import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: auto;
  width: 32%;
  display: flex;
  background: #efefef;
  flex-direction: column;
  margin-bottom: 20px;
  border-radius: 4px;
  box-shadow: 0px 2px 6px 0px rgba(117,117,117,0.47);
  position: relative;
`

const GameImage = styled.img`
  width: 100%;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`

const GameName = styled.h3`
  width: 93%;
  font-size: 14px;
  line-height: 24px;
  margin: 5px 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const GamePlaytime = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  color: #fff;
  font-size: 10px;
  background-color: #000000d9;
  padding: 2px;
  border-radius: 2px;
`

const GamerPlaytime = styled.p`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2px;
`

const GamerUserpic = styled.img`
  height: 18px;
  width: 18px;
  margin-right: 5px;
`

class Game extends React.Component {

  render () {
    const { game } = this.props;

    let gameImageUrl = 'https://steamcdn-a.akamaihd.net/steam/apps/' + game.appid + '/header.jpg';

    return (
      <Container>
        <GameImage src={gameImageUrl} />
        <GamePlaytime>
          {game.playtime_users.map((pt, i) => {
            let hours = Math.round(pt.playtime/60);
            let minutes = Math.abs(pt.playtime - hours*60);
            if (hours > 0 && minutes > 0) {
              return (
                <GamerPlaytime key={i}>
                  <GamerUserpic src={pt.user.avatarfull}/> {hours ? hours + ' h': ''} {minutes ? minutes + ' m' : ''}
                </GamerPlaytime>
              )
            } else {
              return null;
            }
          })}
        </GamePlaytime>
        <GameName title={game.name}>{game.name}</GameName>
      </Container>
    )
  }
}

export default Game;
