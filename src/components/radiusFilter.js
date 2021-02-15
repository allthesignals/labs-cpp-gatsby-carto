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
      style={{ position: "absolute", bottom: "64px", right: "16px" }}
      onClick={this.addRadius}
    >
      Add Radius
    </div>;
  }
}
