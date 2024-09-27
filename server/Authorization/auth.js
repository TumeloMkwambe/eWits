const crypto = require('crypto');
require('dotenv').config();

function generateApiKey() {
  return crypto.randomBytes(64).toString('hex');
}

const apiKey = process.env.API_KEY;

const apiKeyAuth = (req, res, next) => {
    const providedKey = req.headers['x-api-key'];

    if (!providedKey) {
        return res.status(403).json({ message: 'API key is required' });
    }

    if (providedKey !== apiKey) {
        return res.status(403).json({ message: `Forbidden: Invalid API key` });
    }

    next(); // Proceed to the next middleware/route handler if the API key is valid
};

module.exports = apiKeyAuth;