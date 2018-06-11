import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Search from './Search';
import Gamer from './Gamer';

const Container = styled.div`
  display: flex;
  width: 25vw;
  padding: 10px 15px;
  background-color: #c4c4c4;
  height: 100vh;
  flex-direction: column;
`

const GamersList = styled.div`
  margin-top: 50px;
`

const Title = styled.h2`
  font-weight: bold;
  margin-bottom: 20px;
`

class GamersPanel extends React.Component {

  render() {
    const { gamers } = this.props;
    return (
      <Container>
        <Title>Gamers</Title>
        <Search />
        <GamersList>
          {gamers.map((gamer, index) => {
            return (
              <Gamer gamer={gamer} key={index} margin={true} />
            )
          })}
        </GamersList>
      </Container>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log('State', state);
  return {
    gamers: state.gamers
  };
}

export default connect(mapStateToProps)(GamersPanel);
