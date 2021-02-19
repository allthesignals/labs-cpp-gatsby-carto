import React from "react"
import styled from "styled-components"


class Layout extends React.Component {
  render() {
    const {
      location,
      title,
      loaded = true,
      children,
    } = this.props;
    const rootPath = `${__PATH_PREFIX__}/`
    const blogPath = `${__PATH_PREFIX__}/blog/`

    return (
      <Main
        style={{ visibility: loaded ? 'visible' : 'hidden' }}
      >
        {children}
      </Main>
    )
  }
}

const Main = styled.main`
  // min-height: 100vh;
`

export default Layout
