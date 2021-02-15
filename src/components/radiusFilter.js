import React from "react"

export default class RadiusFilter extends React.Component {
  constructor(props) {
    super(props);

    this.props.Leaflet.circle([40.72075399390691, -74.01841163635255], 200).addTo(this.props.map);
  }

  render() {
    return <div
      className="button"
      style={{ position: "absolute", bottom: "64px", right: "16px" }}
    >
      Add Radius
    </div>;
  }
}
