const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const authMiddleware = async (req, res, next) => {
    const authHeaders = req.header('Authorization');
    if (!authHeaders) {
        return res.status(401).send({ error: 'No token Provided'});
    }

    if(!authHeaders.startsWith("Bearer ")){
        return  res.status(401).send({ error: 'Invalid token.'});
    }

    const token = authHeaders.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).send({ error: 'Invalid token.' });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(400).send({ error: 'Invalid token.' });
    }
};

module.exports = authMiddleware;