import React from "react"
import MapPage from '../templates/map-page';

class IndexPage extends React.Component {
  render() {
    return <MapPage
      mapUrl='https://nycplanning-web.carto.com/u/planninglabs/builder/eab1a602-225a-4d35-b4c3-472880801d8f/embed'
      keywords={[`capital planning`, `new york city`, `nyc`, `dcp`]}
      location={this.props.location}
      navigate={this.props.navigate}
    />;
  }
}

export default IndexPage
