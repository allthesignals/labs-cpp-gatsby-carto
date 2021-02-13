import React from "react"
import MapPage from '../templates/map-page';

class HousingPage extends React.Component {
  render() {
    return <MapPage
      mapUrl='https://nycplanning.carto.com/u/dcpbuilder/builder/27da8190-35a4-4026-b6cf-4c20bbe8923a/embed'
      keywords={[`capital planning`, `new york city`, `nyc`, `dcp`]}
      location={this.props.location}
      navigate={this.props.navigate}
    />;
  }
}


export default HousingPage
