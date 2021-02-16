import React from "react"
import MapPage from '../templates/map-page';

class HousingPage extends React.Component {
  render() {
    return <MapPage
      mapUrl='https://nycplanning-web.carto.com/u/planninglabs/builder/db9d59dc-8cb6-400c-9bf8-1324bd01fd24/embed'
      keywords={[`capital planning`, `new york city`, `nyc`, `dcp`]}
      location={this.props.location}
      navigate={this.props.navigate}
    />;
  }
}

export default HousingPage
