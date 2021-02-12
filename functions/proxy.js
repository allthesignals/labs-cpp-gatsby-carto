const request = require('superagent');
const { URL } = require('url');

exports.handler = async (event) => {
  const site = event.queryStringParameters && event.queryStringParameters.site
  const { origin } = new URL(site);

  if (origin !== 'https://nycplanning.carto.com' && origin !== 'https://nycplanning-web.carto.com') {
    return {
      statusCode: 500,
      body: 'Origin not allowed.',
    }
  }

  const response = await request
    .get(site)

  return {
    'statusCode': 200,
    'headers': {
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/html',
    },
    'body': response.text,
  }
}
