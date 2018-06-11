const axios = require('axios');
const csvtojson = require('csvtojson');
const path = require('path');

const API_KEY = '8738270D3B5D8959A13E1BC255D5702A';

let mmoGames = [];
let pathToCSV = path.resolve(__dirname, './resources/multiplayer_games.csv');
csvtojson({
  delimiter: ';'
}).fromFile(pathToCSV).then((jsonObj)=>{
  console.log(jsonObj);
  mmoGames = jsonObj;
})

// Wrong implementation. Needs to get Multiplayer tag, not MMO genre
//axios.get('http://steamspy.com/api.php?request=genre&genre=Massively').then(response => {
  //mmoGames = response.data;
//})

export default function getUserGames(username) {
  const userIdUrl = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${API_KEY}&vanityurl=${username}`;
  return axios.get(userIdUrl).then(response => {
    console.log('UserID response is', response.data);
    let res = response.data.response;
    let status = res.success;
    if (status === 1) {
      let steamId = res.steamid;
      const gamesUrl = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${API_KEY}&steamid=${steamId}&format=json&include_appinfo=1&include_played_free_games=1`;
      return axios.get(gamesUrl).then(response => {
        console.log('Get user games ', response.data)
        let ownedGames = response.data.response;
        ownedGames.games.forEach(game => {
          if (mmoGames[game.appid] && mmoGames[game.appid].appid) {
            game.is_mmo = true;
          }
        })
        ownedGames.games = ownedGames.games.sort(function(a, b) {
          return b.playtime_forever - a.playtime_forever;
        })
        const userUrl = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${API_KEY}&steamids=${steamId}`;
        return axios.get(userUrl).then(response => {
          let players = response.data.response.players;
          let user = players && players.length > 0 ? players[0] : {};
          console.log('Get user ', players, user)
          return {
            ...user,
            ...ownedGames
          }
        })
      })
    } else if (status === 42) {
      return {error: true, message: 'Username not found'}
    }
  });
}