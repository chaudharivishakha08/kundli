const jwt = require('jsonwebtoken');
exports.authorization = (req, res, next) => {
    try {
        const token = req.cookies.access_token;
        if (!token) {
            return res.status(401).json({ error: 'Authentication required. Please login first.' });
        }
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data;
    return next();
    } catch (error) {
        console.error('Auth error:', error);
        res.status(401).json({ error: 'Invalid or expired token. Please login again.' });
    }
};