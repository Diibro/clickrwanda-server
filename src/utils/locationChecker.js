const locationChecker = (req, res) => {
     console.log(req.ip);
     console.log(req.headers["x-forwaded-for"] || req.connection.remoteAddress);
}

module.exports = locationChecker;