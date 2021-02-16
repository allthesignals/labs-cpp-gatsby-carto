const request = require('superagent');
const { URL } = require('url');

const ALLOWED_ORIGINS = [
  'https://nycplanning.carto.com',
  'https://nycplanning-web.carto.com',
  'https://dcpbuilder.carto.com',
];

exports.handler = async (event) => {
  const site = event.queryStringParameters && event.queryStringParameters.site

  if (!site) {
    return {
      statusCode: 500,
      body: 'No site param.',
      site,
    }
  }

  const siteUrl = new URL(site);

  if (!ALLOWED_ORIGINS.includes(siteUrl.origin)) {
    return {
      statusCode: 500,
      body: 'Origin not allowed.',
    }
  }

  const response = await request
    .get(site);

  return {
    'statusCode': 200,
    'headers': {
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/html',
    },
    'body': response.text,
  }
}
