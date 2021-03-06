import 'babel-polyfill'
import './styles/styles.sass'
import React from 'react'
import ReactDOM  from 'react-dom'
import AppRouter from './app/AppRouter'


const development = module.hot && process.env.NODE_ENV === 'development'
const render = development ? ReactDOM.render : ReactDOM.hydrate

render(<AppRouter/>, document.getElementById('root'))

if (development) {
  module.hot.accept()
}
