const roleCheck = (requiredRole) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).send({ error: 'Unauthorized' });
        }

        if (req.user.role !== requiredRole) {
            return res.status(403).json({ message: "Access denied" });
        }

        next();
    };
}