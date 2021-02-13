import React from "react"
import fetch from 'node-fetch';

// https://dcpbuilder.carto.com/api/v3/viz/27da8190-35a4-4026-b6cf-4c20bbe8923a/analyses/a0
const buildSqlQueryLink = (state, vizJSON) => {
  const userName = vizJSON.datasource.user_name;
  const sqlApiEndpoint = `https://${userName}.carto.com/api/v2/sql?format=csv&q=`;
  let appliedFilters = '';

  if (state && state.includes('widgets')) {
    const { widgets } = JSON.parse(state);
    const vizWidgets = vizJSON.widgets;
    const widgetIds = Object.keys(widgets);

    console.log(vizJSON);

    const whereClause = widgetIds
      .map(id => vizWidgets.find(w => w.id === id))
      .filter(widget => widget.type === 'category')
      .map(widget => {
        const { acceptedCategories: categories } = widgets[widget.id];

        return `${widget.options.column} IN (${categories.map(cat => `'${cat}'`).join(",")})`;
      })
      .join(' AND ');

    appliedFilters = `WHERE ${whereClause}`;
  }

  return `${sqlApiEndpoint}SELECT * FROM cartodb_query_6 ${appliedFilters}`;
}

export default class DownloadMapData extends React.Component {
  render() {
    const link = buildSqlQueryLink(this.props.state, this.props.vizJSON);

    return (
      <a
        className="button"
        href={link}
        style={{ position: "absolute", bottom: "16px", right: "16px" }}
      >
        Download Data
      </a>
    )
  }
}
