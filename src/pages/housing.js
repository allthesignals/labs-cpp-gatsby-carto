import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Map from "../components/map"

class IndexPage extends React.Component {
  render() {
    const siteTitle = "Gatsby Starter Personal Website"

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="Home"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <Map url="https://nycplanning.carto.com/u/dcpbuilder/builder/27da8190-35a4-4026-b6cf-4c20bbe8923a/embed" />
      </Layout>
    )
  }
}

export default IndexPage
