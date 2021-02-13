import React from "react"
import PropTypes from "prop-types";

class Map extends React.Component {
  handleChange = (event) => {
    setTimeout(() => {
      const currentMapRef = event.view.location.href;
      const statefulMapUrl = new URL(decodeURIComponent(currentMapRef));
      const state = statefulMapUrl.searchParams.get('state');

      this.props.onChange(state);
    }, 500);
  }

  mapDidLoad = (event) => {
    event.persist();

    event.target.contentWindow.addEventListener('click', this.handleChange);
  }

  render() {
    const { url } = this.props;
    const iframeStyle = {
      width: '100%',
      minHeight: '90vh',
      border: 0,
      margin: 0,
    };

    return (
      <iframe
        className="carto-embedded-iframe"
        style={iframeStyle}
        src={url}
        onLoad={this.mapDidLoad}
        allowFullScreen={true}
      />
    )
  }
}

Map.defaultProps = {
  onChange() {},
}

Map.propTypes = {
  url: PropTypes.string,
  onChange: PropTypes.func,
};

export default Map;
