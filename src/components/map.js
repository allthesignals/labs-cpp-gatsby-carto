import React from "react"
import PropTypes from "prop-types";
import DownloadMapData from "../components/downloadMapData";
import RadiusFilter from "../components/radiusFilter";

const getMapState = (window) => {
  const currentMapRef = window.location.href;
  const statefulMapUrl = new URL(decodeURIComponent(currentMapRef));

  return statefulMapUrl.searchParams.get('state');
}

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // the "vizjson", carto's internal configuration object.
      mapConfig: null,

      // the embedded map's current "state" query parameter, which reflects map state
      currentState: '',

      mapInstance: null,

      Leaflet: null,
    };
  }

  captureStateChange = (event) => {
    setTimeout(() => {
      const state = getMapState(event.view);

      this.setState({
        currentState: state,
      });

      this.props.onChange(state);
    }, 500);
  }

  mapDidLoad = (event) => {
    event.persist(); // this some React thing — needed for using later.

    const iframeWindow = event.target.contentWindow;
    // binds the click event to capture clicks which affect mapstate
    iframeWindow.addEventListener('click', this.captureStateChange);

    // grabs the reliable map node for use in the mutation observer
    const internalLeafletMap = iframeWindow.document.querySelector('#map');

    // https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
    // used to observe for the first mutation on the #map node
    const observer = new MutationObserver((mutationsList, observer) => {
      this.setState({
        mapInstance: iframeWindow.mapView.getNativeMap(), // mapView is private to Carto!
        Leaflet: iframeWindow.L,
      });

      this.props.onLoad(iframeWindow);

      // disconnect when it first emits — we should only need the first mutation as that
      // is when the leaflet map is loaded
      observer.disconnect();
    });

    observer.observe(internalLeafletMap, { attributes: true, childList: true, subtree: true });

    this.setState({
      mapConfig: iframeWindow.vizJSON,
      currentState: getMapState(event.target.contentWindow),
    });
  }

  render() {
    const iframeStyle = {
      width: '100%',
      minHeight: '90vh',
      border: 0,
      margin: 0,
    };

    return (
      <div>
        <iframe
          className="carto-embedded-iframe"
          style={iframeStyle}
          src={this.props.url}
          onLoad={this.mapDidLoad}
          allowFullScreen={true}
        />
        {this.state.mapConfig && <DownloadMapData
          mapConfig={this.state.mapConfig}
          state={this.state.currentState}
        />}
        {this.state.mapInstance && <RadiusFilter
          map={this.state.mapInstance}
          Leaflet={this.state.Leaflet}
        />}
      </div>
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
