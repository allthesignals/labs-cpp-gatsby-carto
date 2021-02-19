import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Map from "../components/map"

// I'd like this to be configurable from map-page
const STYLE_OVERRIDES = `
  <style type="text/css">
    * {
      border-radius: 0;
    }

    .CDB-Widget-canvasInner {
      border-radius: 0;
    }

    .CDB-Embed-tab {
      padding: 0;
    }

    .CDB-Text {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    }
  </style>
`;

// I'd like this to be configurable from map-page
const restyleLiveMap = async (iframeDocument) => {
  try {
    const [filtersNode] = iframeDocument.getElementsByClassName('CDB-Widget-canvas');

    // moves the filters to the other side
    filtersNode.parentNode.insertBefore(filtersNode, filtersNode.parentNode.firstChild);

    iframeDocument.head.insertAdjacentHTML("beforeend", `
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
      `);

    iframeDocument.head.insertAdjacentHTML("beforeend", STYLE_OVERRIDES);

    console.log('is restyling');
  } catch (e) {
    console.log(e);
    console.log('Something went wrong restructuring iframe!');
  }
}

// specially combines URL with current map state
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

class MapPage extends React.PureComponent {
  constructor(props) {
    super(props);

    const combinedUrl = constructCartoProxyUrl(
      props.mapUrl,
      props.location.search,
    );

    this.state = {
      url: combinedUrl,
      loaded: false,
    };
  }

  handleLoad = async (window) => {
    await restyleLiveMap(window.document);

    this.setState({
      loaded: true,
    });
  }

  mapDidChange = (state) => {
    const { pathname } = this.props.location;

    this.props.navigate(`${pathname}?state=${state}`);
  }

  render() {
    return (
      <Layout
        location={this.props.location}
        title={this.props.siteTitle}
        loaded={this.state.loaded}
      >
        <SEO
          title="Home"
          keywords={this.props.keywords}
        />
        <Map
          url={this.state.url}
          onChange={this.mapDidChange}
          onLoad={this.handleLoad}
        />
      </Layout>
    )
  }
}

export default MapPage;
