import jwt_decode from 'jwt-decode';

interface AccessToken {
  sub: string,
  event_id: string,
  token_use: string,
  scope: string,
  auth_time: number,
  iss: string,
  exp: number,
  iat: number,
  jti: string,
  client_id: string,
  username: string
}

export const decodeAccessToken = (token: string): AccessToken => {
  return jwt_decode(token);
}

