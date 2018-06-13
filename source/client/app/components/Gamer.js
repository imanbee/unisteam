import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  width: calc(100%-10px);
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease-out;
  padding: 5px;
  border-radius: 4px;

  &:hover {
    background-color: #939393;
  }
`

const Avatar = styled.img`
  width: 36px;
  height: 36px;
  display: flex;
  margin-right: 10px;
  font-size: 10px;
  text-align: center;
  line-height: 0px;
`

const UserName = styled.h4`
  font-weight: bold;
  display: flex;
  margin-bottom: 3px;
`

const GamerInfo = styled.div`
  display: flex;
  flex-direction: column;
`

const GamesCount = styled.p`
  display: flex;
  justify-self: end;
  font-size: 12px;
  right: 12px;
  top: 9px;
`

const RemoveButton = styled.button`
  width: 25px;
  height: 25px;
  position: absolute;
  right: 5px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
`


class Gamer extends React.Component {

  onRemoveGamer = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.onRemove();
  }

  render () {
    const { gamer, margin, readonly } = this.props;

    let multiplayerGames = gamer.games && gamer.games.length > 0 ? gamer.games.filter(game => {
      return game.is_multiplayer
    }): [];

    return (
      <Container style={{marginBottom: margin ? '10px' : '0'}}>
        <Avatar src={gamer.avatarfull} alt="Avatar"/>
        <GamerInfo>
          <UserName>{gamer.realname || gamer.personaname}</UserName>
          <GamesCount>{multiplayerGames.length || 0} multiplayer games</GamesCount>
        </GamerInfo>
        {!readonly && <RemoveButton onClick={this.onRemoveGamer}>&#10005;</RemoveButton>}
      </Container>
    )
  }
}

export default Gamer;
