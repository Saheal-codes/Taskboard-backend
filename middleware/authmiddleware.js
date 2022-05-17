const jwt = require("jsonwebtoken");
const usermodel = require("../models/usermodel");

exports.verifytoken = (req, res, next) => {
  const token = req.body.token;
  //console.log(token);
  if (!token)
    return res
      .status(401)
      .send({ message: "Unauthorized & No tekoen reciceved" });
  jwt.verify(token, process.env.jwtpass, (err, user) => {
    if (err) return res.status(403).send({ message: "Token not valid now !" });
    req.token = token;
    // Check if the user is still in the database
    usermodel.findById(user._id, (err, user) => {
      if (err) return res.status(500).send({ message: "Error" });
      if (!user) return res.status(404).send({ message: "User not found" });
      req.user = user;
      next();
    });
  });
};
