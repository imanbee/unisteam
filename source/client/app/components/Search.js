import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux';
import styled from 'styled-components';
import debounce from 'lodash.debounce';
import * as actions from '../store/actions'
import Gamer from './Gamer'

const Container = styled.div`
  position: relative;
`

const Input = styled.input`
  height: 30px;
  width: calc(100% - 25px);
  border: 1px solid #fff;
  border-radius: 4px;
  padding: 4px 10px;
`

const Result = styled.div`
  width: calc(100% - 13px);
  position: absolute;
  top: 35px;
  border: 1px solid #c8c8c8;
  border-radius: 0px 0px 4px 4px;
  padding: 4px;
  display: flex;
  background-color: #a3a3a3;
  border-top: none;
`

const Loader = styled.div`
  font-size: 10px;
  margin: 10px;
  text-indent: -9999em;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(to right, #ffffff 10%, rgba(69, 69, 69, 0.70) 63%);
  position: relative;
  animation: load3 1.4s infinite linear;
  transform: translateZ(0);
  position: absolute;
  top: 0px;
  right: 0px;

  &:before {
    width: 50%;
    height: 50%;
    background: #ffffff;
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: '';
  }

  &:after {
    background: #ffffff;
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: '';
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  @keyframes load3 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

class Search extends React.PureComponent {

  state = {
    gamer: null,
    error: null,
    loading: false,
    searchString: ''
  }

  fetchUserData = debounce((e) => {
    e.preventDefault();
    e.stopPropagation();
    let user = e.target.value;
    this.setState({gamer: null})
    if (user && user !== '') {
      this.setState({loading: true})
      axios.get('/api/steam/?username=' + user).then(response => {
        let data = response.data;
        let gamer = data;
        this.setState({gamer, loading: false})
      }).catch((error) => {
        this.setState({error: error, loading: false})
      })
    }
  }, 500)

  onUsernameChanged = (e) => {
    e.persist();
    this.fetchUserData(e);
    this.setState({searchString: e.target.value})
  };

  addGamer = () => {
    const { gamer } = this.state;
    const { dispatch } = this.props;
    console.log('Add gamer', gamer)
    dispatch(actions.addGamer(gamer));
    this.setState({searchString: '', gamer: null})
  }

  render() {
    const { searchString, count, loading, gamer } = this.state
    
    return(
      <Container>
        <Input
          type="text"
          value={searchString}
          onChange={this.onUsernameChanged}
          placeholder="Enter Steam username"
          disabled={loading}
        />
        {loading ? <Loader /> : null}
        {gamer ?
          (
            <Result onClick={this.addGamer}>
              <Gamer gamer={gamer} readonly={true} />
            </Result>
          ) : null
        }
      </Container>
    )
  }
}


export default connect()(Search);
