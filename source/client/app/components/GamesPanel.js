import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import intersection from 'lodash.intersection';
import moment from 'moment';

const Container = styled.div`
  display: flex;
  width: 75vw;
  padding: 10px 15px;
  height: 100vh;
  flex-direction: column;
`

const Title = styled.h2`
  font-weight: bold;
  margin-bottom: 20px;
`

const GamesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-height: 90vh;
  overflow: scroll;
`

const Game = styled.div`
  height: 170px;
  width: 32%;
  display: flex;
  background: #efefef;
  flex-direction: column;
  margin: 5px;
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
  width: 100%;
  font-size: 14px;
  margin: 10px;
`

const GamePlaytime = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  color: #fff;
  font-size: 10px;
  background-color: #0000006e;
  padding: 2px;
  border-radius: 2px;
`

const CommonCount = styled.p`
  font-size: 12px;
`

class GamesPanel extends React.Component {
  render() {
    const { gamers } = this.props;

    let commonGames = [];
    if (gamers && gamers.length > 0) {
      let games = gamers[0].games;
      games.forEach(game => {
        if (game.is_mmo) {
          let gameIdPresents = true;
          gamers.forEach(gamer => {
            let gamesIds = gamer.games.map(game => game.appid);
            if (gamesIds.indexOf(game.appid) === -1) {
              console.log('Game presents, user', gamer)
              gameIdPresents = false;
            }
          })
          console.log('Game is common?', gameIdPresents)
          if (gameIdPresents) {
            commonGames.push(game);
          }
        }
      })
    }
    console.log('Intersected', commonGames)
    return (
      <Container>
        <Title>Games 
          {commonGames && commonGames.length > 0 ? (
            <CommonCount>
              {commonGames.length} common
            </CommonCount>
          ) : ''}
        </Title>
        <GamesList>
          {commonGames.map(game => {
            //let gameImageUrl = 'http://media.steampowered.com/steamcommunity/public/images/apps/' + game.appid + '/' + game.img_logo_url + '.jpg';
            let gameImageUrl = 'https://steamcdn-a.akamaihd.net/steam/apps/' + game.appid + '/header.jpg';
            return (
              <Game>
                <GameImage src={gameImageUrl} />
                <GamePlaytime>{Math.round(game.playtime_forever/60)} h</GamePlaytime>
                <GameName>{game.name}</GameName>
              </Game>
            );
          })}
        </GamesList>
      </Container>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    gamers: state.gamers
  }
}

export default connect(mapStateToProps)(GamesPanel);
