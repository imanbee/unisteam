import React from 'react'
import { renderRoutes } from 'react-router-config'

export default class AppRoot extends React.PureComponent {
  render() {
    const { routes } = this.props.route

    return(
      <div className="app">
        <main className="s-main">
          { renderRoutes(routes) }
        </main>
      </div>
    )
  }
}
