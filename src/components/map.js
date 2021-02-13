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

  reorganize = (window) => {
    try {
      const { document } = window;

      const [filtersNode] = document.getElementsByClassName('CDB-Widget-canvas');

      filtersNode.parentNode.insertBefore(filtersNode, filtersNode.parentNode.firstChild);

      document.head.insertAdjacentHTML("beforeend", `
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
      `);

      document.head.insertAdjacentHTML("beforeend", `
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
      `);
    } catch (e) {
      console.log(e);
      console.log('Something went wrong restructuring iframe!');
    }
  }

  mapDidLoad = (event) => {
    event.persist();

    event.target.contentWindow.addEventListener('click', this.handleChange);

    this.reorganize(event.target.contentWindow);
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
