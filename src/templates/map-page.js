import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Map from "../components/map"

class MapPage extends React.Component {
  mapDidChange = (state) => {
    const { pathname } = this.props.location;

    this.props.navigate(`${pathname}?state=${state}`);
  }

  render() {
    return (
      <Layout
        location={this.props.location}
        title={this.props.siteTitle}
      >
        <SEO
          title="Home"
          keywords={this.props.keywords}
        />
        <Map
          url={this.props.mapUrl}
          onChange={this.mapDidChange}
          location={this.props.location}
        />
      </Layout>
    )
  }
}

export default MapPage;
