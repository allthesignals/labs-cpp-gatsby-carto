import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Map from "../components/map"

class IndexPage extends React.Component {
  mapDidChange = (state) => {
    this.props.navigate(`/?state=${state}`);
  }

  render() {
    const siteTitle = "Facilities";

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="Home"
          keywords={[`capital planning`, `new york city`, `nyc`, `dcp`]}
        />
        <Map
          url='https://nycplanning.carto.com/u/dcpbuilder/builder/27da8190-35a4-4026-b6cf-4c20bbe8923a/embed'
          onChange={this.mapDidChange}
          location={this.props.location}
        />
      </Layout>
    )
  }
}

export default IndexPage
