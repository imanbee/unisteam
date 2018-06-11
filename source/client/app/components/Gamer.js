import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;
  position: relative;
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
`

const GamesCount = styled.p`
  font-weight: bold;
  display: flex;
  justify-self: end;
  font-size: 12px;
  right: 12px;
  position: absolute;
  top: 9px;
  transition: all 2s ease-out;
`

const RemoveButton = styled.button`
  width: 25px;
  height: 25px;
`


class Gamer extends React.Component {

  render () {
    const { gamer, margin } = this.props;

    return (
      <Container style={{marginBottom: margin ? '10px' : '0'}}>
        <Avatar src={gamer.avatar} alt="Avatar"/>
        <UserName>{gamer.realname || gamer.personaname}</UserName>
        <GamesCount>{gamer.game_count || 0} games</GamesCount>
        <RemoveButton>&#10005;</RemoveButton>
      </Container>
    )
  }
}

export default Gamer;
