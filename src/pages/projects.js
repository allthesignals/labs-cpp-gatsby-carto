import React from "react"
import MapPage from '../templates/map-page';

class ProjectsPage extends React.Component {
  render() {
    return <MapPage
      mapUrl='https://nycplanning-web.carto.com/u/planninglabs/builder/15ad2ac2-020b-45cf-926b-b8ff3cbecf6c/embed'
      keywords={[`capital planning`, `new york city`, `nyc`, `dcp`]}
      location={this.props.location}
      navigate={this.props.navigate}
      title={'Projects'}
    />;
  }
}

export default ProjectsPage
