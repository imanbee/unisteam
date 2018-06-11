import React from 'react'
import express from 'express'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import StaticRouter from 'react-router-dom/StaticRouter'
import { matchRoutes, renderRoutes } from 'react-router-config'
import getUserGames from './SteamAPI.js';

import routes from '../client/app/routes'
import configureStore from '../client/app/store/configureStore'

const store = configureStore()
const router = express.Router()

router.get('/api/steam/', (req, res) => {
  let username = req.query.username;
  if (username) {
    getUserGames(username).then(response => {
      res.send(JSON.stringify(response))
    })
  } else {
    res.status(400)
    res.send('Username is not defined')
  }
})

router.get('*', (req, res) => {
  const branch = matchRoutes(routes, req.url)

  const promises = branch.map(({route}) => {
    let fetchData = route.component ? route.component.fetchData : null;
    return fetchData instanceof Function ? fetchData(store) : Promise.resolve(null)
  })

  return Promise.all(promises).then(() => {
    const context = {}
    const html = renderToString(
      <Provider store={ store }>
        <StaticRouter location={req.url} context={ context }>
          { renderRoutes(routes) }
        </StaticRouter>
      </Provider>
    )
    if (context.status === 404) {
      res.status(404)
    }
    if (context.status === 302) {
      return res.redirect(302, context.url)
    }
    res.render('index', {
      html,
      state: store.getState(),
      title: 'UNISTEAM',
      production: process.env.NODE_ENV === 'production' })
  })
})

module.exports = router
