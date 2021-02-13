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
    setTimeout(() => {
      const { document } = window;

      const [filtersNode] = document.getElementsByClassName('CDB-Widget-canvas');

      filtersNode.parentNode.insertBefore(filtersNode, filtersNode.parentNode.firstChild);

      document.head.insertAdjacentHTML("beforeend", `
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
        `);

      document.head.insertAdjacentHTML("beforeend", STYLE_OVERRIDES);
    }, 500);
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

const constructCartoProxyUrl = (location, cartoMapUrl) => {
  const cartoProxyEmbedUrl = `/.netlify/functions/proxy?site=${encodeURIComponent(cartoMapUrl)}`;

  if (!location.search.includes('state')) {
    return cartoProxyEmbedUrl;
  }

  const dynamicFilters = decodeURIComponent(location.search.split('?state=')[1]);

  return `${cartoProxyEmbedUrl}&state=${dynamicFilters}`;
}

class Map extends React.Component {
  constructor(props) {
    super(props);

    const dynamicUrl = constructCartoProxyUrl(
      props.location,
      props.url,
    );

    this.state = {
      initialMapState: dynamicUrl,
      mapConfig: null,
      currentState: '',
      mapInstance: null,
    };
  }

  handleClick = (event) => {
    setTimeout(() => {
      const state = getMapState(event.view);

      this.setState({
        currentState: state,
      });

      this.props.onChange(state);
    }, 500);
  }

  mapDidLoad = (event) => {
    event.persist();
    event.target.contentWindow.addEventListener('click', this.handleClick);

    this.setState({
      mapConfig: event.target.contentWindow.vizJSON,
      currentState: getMapState(event.target.contentWindow),
    });

    restyleLiveMap(event.target.contentWindow);
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
        <RadiusFilter
          map={this.state.mapInstance}
        />
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
