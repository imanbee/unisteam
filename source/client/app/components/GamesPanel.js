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
  height: 90vh;
  overflow: scroll;
  justify-content: space-between;
  align-items: center;
`

const Game = styled.div`
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
          {commonGames.map(game => {
            //let gameImageUrl = 'http://media.steampowered.com/steamcommunity/public/images/apps/' + game.appid + '/' + game.img_logo_url + '.jpg';
            let gameImageUrl = 'https://steamcdn-a.akamaihd.net/steam/apps/' + game.appid + '/header.jpg';
            return (
              <Game>
                <GameImage src={gameImageUrl} />
                <GamePlaytime>
                  {game.playtime_users.map(pt => {
                    let hours = Math.round(pt.playtime/60);
                    let minutes = Math.abs(pt.playtime - hours*60);
                    if (hours > 0 && minutes > 0) {
                      return (
                        <GamerPlaytime>
                          <GamerUserpic src={pt.user.avatarfull}/> {hours ? hours + ' h': ''} {minutes ? minutes + ' m' : ''}
                        </GamerPlaytime>
                      )
                    } else {
                      return null;
                    }
                  })}
                </GamePlaytime>
                <GameName title={game.name}>{game.name}</GameName>
              </Game>
            );
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
