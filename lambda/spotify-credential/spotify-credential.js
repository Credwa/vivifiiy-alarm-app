const { URLSearchParams } = require('url');
const fetch = require('node-fetch');

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) {
  throw new Error('SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET environment variables must be set');
}

function sendJson(code, body) {
  const response = {
    statusCode: code,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body)
  };
  return response;
}

async function postAsync(params) {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams(params).toString()
  });

  return await response.json();
}

async function refreshTokenAsync(refreshToken) {
  const params = {
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET
  };

  const result = await postAsync(params);

  if (result && result.access_token) {
    return { token: result.access_token, expiresIn: result.expires_in };
  } else {
    throw new Error(JSON.stringify(result));
  }
}

async function fetchTokenAsync({ code, redirectUri }) {
  const params = {
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirectUri,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET
  };

  const result = await postAsync(params);

  if (result && result.access_token) {
    return {
      token: result.access_token,
      refreshToken: result.refresh_token,
      expiresIn: result.expires_in
    };
  } else {
    throw new Error(JSON.stringify(result));
  }
}

exports.handler = async (event, context, callback) => {
  const payload = event.body;

  if (!(payload.code && payload.redirectUri) && !payload.refreshToken) {
    return sendJson(500, {
      error: `Invalid request body, please include either: code and redirectUri or refreshToken`
    });
  }

  try {
    if (payload.refreshToken) {
      const { token, expiresIn } = await refreshTokenAsync(payload.refreshToken);
      return sendJson(200, { token, expiresIn });
    } else {
      const { token, refreshToken, expiresIn } = await fetchTokenAsync({
        code: payload.code,
        redirectUri: payload.redirectUri
      });
      return sendJson(200, { token, refreshToken, expiresIn });
    }
  } catch (e) {
    console.log('error!');
    return sendJson(500, { error: e.message });
  }
};
