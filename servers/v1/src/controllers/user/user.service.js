const { sign: jwtSign } = require('jsonwebtoken');
const { randomBytes: cryptoRandomBytes } = require('crypto');
const { SECRET: appSecret } = require('../../configs');
const { RefreshToken } = require('../../models/refresh-token.model');

module.exports = {
  genAccToken,
  genRefToken,
  setTokenCookie,
  refreshTokens,
}

async function findRefToken(oldRefToken) {
  const refToken = await RefreshToken.findOne({ token: oldRefToken }).populate('user');
  if (!refToken || !refToken.isActive) throw 'Invalid token';
  return refToken;
}

async function refreshTokens({ oldRefToken, ipAddress }) {
  const refToken = await findRefToken(oldRefToken);
  const { user } = refToken;

  // replace old refresh token with a new one and save
  const newRefreshToken = await genRefToken(user, ipAddress);

  refToken.revoked['date'] = Date.now();
  refToken.revoked['ip'] = ipAddress;
  refToken.replacedWith = newRefreshToken.token;

  await refToken.save();

  // generate new jwt
  const { token, payload } = await genAccToken(user);

  // return basic details and tokens
  return {
    ...payload,
    token,
    refreshToken: newRefreshToken.token
  };
}

function genAccToken(user) {

  const payload = {
    _id: user._id,
    username: user.username,
    role: user.role
  };

  return new Promise((resolve, reject) => {
    jwtSign(payload, appSecret, { expiresIn: 60 }, (err, token) => {
      return err
        ? reject('Failed to generate token!!')
        : resolve({ payload, token: 'Bearer ' + token });
    });
  });
}

function genRefToken(user, ipAddress) {

  // create a refresh token that expires in 7 days
  const newRefToken = new RefreshToken({
    user: user._id,
    token: randomTokenString(),
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    created: {
      ip: ipAddress
    }
  });

  return Promise.resolve(newRefToken.save());

}

function setTokenCookie(res, refreshToken) {
  // create http only cookie with refresh token that expires in 7 days
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  };

  return Promise.resolve(res.cookie('refreshToken', refreshToken, cookieOptions))
}

// helper functions
const randomTokenString = () => cryptoRandomBytes(40).toString('hex');

