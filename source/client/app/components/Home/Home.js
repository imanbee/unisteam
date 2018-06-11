import React from 'react'
import axios from 'axios'
import GamersPanel from '../GamersPanel'
import GamesPanel from '../GamesPanel'
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
`

class Home extends React.PureComponent {

  render() {
    return(
      <Container>
        <GamersPanel />
        <GamesPanel />
      </Container>
    )
  }
}

export default Home;
