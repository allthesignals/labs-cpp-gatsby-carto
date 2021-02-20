import React from "react"
import PropTypes from "prop-types";

const getMapState = (window) => {
  const currentMapRef = window.location.href;
  const statefulMapUrl = new URL(decodeURIComponent(currentMapRef));

  return statefulMapUrl.searchParams.get('state');
}

class Map extends React.Component {
  captureStateChange = (iframeWindow) => {
    // binds the click event to capture clicks which affect mapstate
    iframeWindow.addEventListener('click', () => {
      setTimeout(() => {
        const state = getMapState(iframeWindow);

        this.props.onChange(state);
      }, 500);
    });
  }

  extractMapInstance = (iframeWindow) => {
    return new Promise((resolve) => {
      // grabs the reliable map node for use in the mutation observer
      const internalLeafletMap = iframeWindow.document.querySelector('#map');

      // https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
      // used to observe for the first mutation on the #map node
      const observer = new MutationObserver((mutationsList, observer) => {
        const mapInstance = iframeWindow.mapView.getNativeMap();

        // disconnect when it first emits — we should only need the first mutation as that
        // is when the leaflet map is loaded
        observer.disconnect();

        resolve({
          mapInstance: mapInstance, // mapView is private to Carto!
          iframeLeaflet: iframeWindow.L,
        });
      });

      observer.observe(internalLeafletMap, { attributes: true, childList: true, subtree: true });
    });
  }

  mapDidLoad = async (event) => {
    event.persist(); // this some React thing — needed for using later.

    const iframeWindow = event.target.contentWindow;

    this.captureStateChange(iframeWindow);
    const mapInstanceState = await this.extractMapInstance(iframeWindow);

    this.props.onLoad({
      currentState: getMapState(event.target.contentWindow),
      iframeWindow,
      ...mapInstanceState,
    });
  }

  render() {
    const iframeStyle = {
      width: '100%',
      height: '90vh',
      border: 0,
      margin: 0,
    };

    return (
      <iframe
        className="carto-embedded-iframe"
        style={iframeStyle}
        src={this.props.url}
        onLoad={this.mapDidLoad}
        allowFullScreen={true}
      />
    )
  }
}

Map.defaultProps = {
  onChange() {},
  onLoad() {},
}

Map.propTypes = {
  url: PropTypes.string,
  onChange: PropTypes.func,
  onLoad: PropTypes.func,
};

export default Map;
