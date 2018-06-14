import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import intersection from 'lodash.intersection';
import moment from 'moment';
import Game from './Game';

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
  height: 90vh;
  overflow: scroll;
  justify-content: space-between;
  align-items: center;
`

const CommonCount = styled.span`
  margin-right: 5px;
`

const NotFound = styled.p`
  font-size: 14px;
  font-style: italic;
  align-self: baseline;
`

class GamesPanel extends React.Component {

  // TODO: adjust criteria
  calculateAveragePlaytime = (game) => {
    let playtimeArray = game.playtime_users.map(pt => pt.playtime);
    let average = playtimeArray.reduce((acc, val) => acc + val, 0) / playtimeArray.length;
    return playtimeArray.length * 2000 * average;
  }

  render() {
    const { gamers } = this.props;

    let commonGames = [];
    if (gamers && gamers.length > 0) {
      let games = gamers[0].games;
      games.forEach(game => {
        game.playtime_users = [];
        if (game.is_multiplayer) {
          let gameIdPresents = true;
          gamers.forEach(gamer => {
            let gamesIds = gamer.games.map(game => game.appid);
            if (gamesIds.indexOf(game.appid) === -1) {
              gameIdPresents = false;
            } else {
              let playtime = gamer.games.find(g => g.appid === game.appid).playtime_forever;
              game.playtime_users.push({user: gamer, playtime});
            }
          })
          if (gameIdPresents) {
            commonGames.push(game);
          }
        }
      })
    }
    commonGames.sort((a, b) => {
      let deltaPlaytimeA = this.calculateAveragePlaytime(a);
      let deltaPlaytimeB = this.calculateAveragePlaytime(b);
      return deltaPlaytimeB - deltaPlaytimeA;
    })
    return (
      <Container>
        <Title>
          {commonGames && commonGames.length > 0 ? (
            <CommonCount>
              {commonGames.length}
            </CommonCount>
          ) : ''}
          Games 
        </Title>
        <GamesList>
          {commonGames.map((game, index) => {
            return <Game game={game} key={index} />
          })}
          {!commonGames || commonGames.length === 0 ? (
            <NotFound>No common multiplayer games</NotFound>
          ) : null}
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
