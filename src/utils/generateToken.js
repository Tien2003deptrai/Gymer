const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '1h';
const jwtRefreshExpiresIn = process.env.JWT_REFERSH_EXPIRES_IN || '1d';

const accessToken = (id) => {
    const token = jwt.sign(
        { id },
        jwtSecret,
        { expiresIn: jwtExpiresIn }
    )
    return token;
}

const refreshToken = (id) => {
    const token = jwt.sign(
        { id },
        jwtRefreshSecret,
        { expiresIn: jwtRefreshExpiresIn }
    )
    return token;
}

module.exports = {
    accessToken,
    refreshToken
}

// module.exports = new Authentication()