import React from "react"
import PropTypes from "prop-types";
import DownloadMapData from "../components/downloadMapData";
import RadiusFilter from "../components/radiusFilter";

const STYLE_OVERRIDES = `
  <style type="text/css">
    * {
      border-radius: 0;
    }

    .CDB-Widget-canvasInner {
      border-radius: 0;
    }

    .CDB-Legends-canvas {
      left: unset;
      right: 16px;
    }

    .CDB-Embed-tab {
      padding: 0;
    }

    .CDB-Text {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    }
  </style>
`;

const restyleLiveMap = (window) => {
  try {
    const { document } = window;

    const [filtersNode] = document.getElementsByClassName('CDB-Widget-canvas');

    filtersNode.parentNode.insertBefore(filtersNode, filtersNode.parentNode.firstChild);

    document.head.insertAdjacentHTML("beforeend", `
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
      `);

    document.head.insertAdjacentHTML("beforeend", STYLE_OVERRIDES);
  } catch (e) {
    console.log(e);
    console.log('Something went wrong restructuring iframe!');
  }
}

const getMapState = (window) => {
  const currentMapRef = window.location.href;
  const statefulMapUrl = new URL(decodeURIComponent(currentMapRef));

  return statefulMapUrl.searchParams.get('state');
}

const constructCartoProxyUrl = (cartoMapUrl, stateParam = '') => {
  // the base URL (without query params) must be encoded
  const cartoProxyEmbedUrl = `/.netlify/functions/proxy?site=${encodeURIComponent(cartoMapUrl)}`;

  if (!stateParam.includes('state')) {
    return cartoProxyEmbedUrl;
  }

  // if there are filters being passed through the parent site, they need to be decoded
  const dynamicFilters = decodeURIComponent(stateParam.split('?state=')[1]);

  // start with the encoded base URL and append the filters
  return `${cartoProxyEmbedUrl}&state=${dynamicFilters}`;
}

class Map extends React.Component {
  constructor(props) {
    super(props);

    const dynamicUrl = constructCartoProxyUrl(
      props.url,
      props.location.search,
    );

    this.state = {
      // the full embed url, including params
      initialMapState: dynamicUrl,

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

    // binds the click event to capture clicks which affect mapstate
    event.target.contentWindow.addEventListener('click', this.captureStateChange);

    // grabs the reliable map node for use in the mutation observer: https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
    const internalLeafletMap = event.target.contentWindow.document.querySelector('#map');
    const observer = new MutationObserver((mutationsList, observer) => {
      this.setState({
        mapInstance: event.target.contentWindow.mapView.getNativeMap(),
        Leaflet: event.target.contentWindow.L,
      });

      restyleLiveMap(event.target.contentWindow);

      // disconnect when it first emits — we should only need the first mutation as that
      // is when the leaflet map is loaded
      observer.disconnect();
    });

    observer.observe(internalLeafletMap, { attributes: true, childList: true, subtree: true });

    this.setState({
      mapConfig: event.target.contentWindow.vizJSON,
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
          src={this.state.initialMapState}
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
}

Map.propTypes = {
  url: PropTypes.string,
  onChange: PropTypes.func,
};

export default Map;
