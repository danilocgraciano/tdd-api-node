const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = async (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Token not provided' });
    }

    const [scheme, token] = authHeader.split(' ');

    if (!/Bearer$/i.test(scheme)) {
        return res.status(401).json({ message: 'Token malformatted' });
    }

    try {
        const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET);

        req.userId = decoded.id;
    } catch (err) {
        return res.status(401).json({ message: err.message });
    }


    return next();
}