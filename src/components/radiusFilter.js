import React from "react"

export default class RadiusFilter extends React.Component {
  addRadius = () => {
    this.props.map.on('click', (event) => {
      this.props.Leaflet.circle(event.latlng, 200).addTo(this.props.map);
    });
  }

  render() {
    return <div
      className="button"
      onClick={this.addRadius}
    >
      Add Radius
    </div>;
  }
}
