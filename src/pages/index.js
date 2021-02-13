import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Map from "../components/map"

const PROXY_SERVICE_RELATIVE_URL = '/.netlify/functions/proxy';

const constructCartoProxyUrl = (location, cartoMapUrl) => {
  const cartoProxyEmbedUrl = `/.netlify/functions/proxy?site=${encodeURIComponent(cartoMapUrl)}`;

  if (!location.search.includes('state')) {
    return cartoProxyEmbedUrl;
  }

  const dynamicFilters = decodeURIComponent(location.search.split('?state=')[1]);

  return `${cartoProxyEmbedUrl}&state=${dynamicFilters}`;
}

class IndexPage extends React.Component {
  constructor(props) {
    super(props);

    const dynamicUrl = constructCartoProxyUrl(
      props.location,
      'https://nycplanning.carto.com/u/dcpbuilder/builder/27da8190-35a4-4026-b6cf-4c20bbe8923a/embed',
    );

    this.state = {
      initialMapState: dynamicUrl,
    };
  }

  mapDidChange = (state) => {
    console.log(state);
    this.props.navigate(`/?state=${state}`);
  }

  render() {
    const siteTitle = "Facilities";

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="Home"
          keywords={[`capital planning`, `new york city`, `nyc`, `dcp`]}
        />
        <Map
          url={this.state.initialMapState}
          onChange={this.mapDidChange}
        />
      </Layout>
    )
  }
}

export default IndexPage
