import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

class IndexPage extends React.Component {
  render() {
    const siteTitle = "Gatsby Starter Personal Website"

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="Home"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <iframe
          className="carto-embedded-iframe"
          style="width:100%; min-height:90vh; border:0; margin:0;"
          src="/.netlify/functions/proxy?site=https://dcpbuilder.carto.com/builder/27da8190-35a4-4026-b6cf-4c20bbe8923a/embed"
        />
      </Layout>
    )
  }
}

export default IndexPage
