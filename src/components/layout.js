import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Header from './header';



class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    const blogPath = `${__PATH_PREFIX__}/blog/`

    return (
      <Wrapper>
        <Header/>
        <Main>{children}</Main>

        <Footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </Footer>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  min-height: 100vh;
`

const Main = styled.main`
  min-height: 100vh;
`


const Footer = styled.footer`
  text-align: center;
  margin: 24px;
`

export default Layout
