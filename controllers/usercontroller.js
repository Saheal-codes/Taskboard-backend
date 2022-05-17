const usermodel = require("../models/usermodel");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

exports.signupUser = async (req, res) => {
  try {
    const newuser = await usermodel.create({
      username: req.body.Name,
      email: req.body.Email,
      password: CryptoJS.AES.encrypt(
        req.body.Password,
        process.env.hpass
      ).toString(),
    });
    res.status(200).send({ message: "User added successfully", data: newuser });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};
exports.loginUser = async (req, res) => {
  try {
    //console.log(req.body);
    const user = await usermodel.findOne({
      email: req.body.Email,
    });
    if (!user) {
      res.status(404).send({ message: "User not found" });
    } else {
      const decrypted = CryptoJS.AES.decrypt(
        user.password,
        process.env.hpass
      ).toString(CryptoJS.enc.Utf8);
      if (decrypted === req.body.Password) {
        const { password, ...others } = user._doc;
        const accesstoken = jwt.sign(others, process.env.jwtpass);
        res.status(200).send({
          message: "User logged in successfully",
          data: others,
          accesstoken,
        });
      } else {
        res.status(401).send({ message: "Invalid Credentials !" });
      }
    }
  } catch (error) {
    res.status(500).send(error);
    //console.log(error);
  }
};
exports.verifytoken = async (req, res) => {
  res.send({ token: req.token, user: req.user });
};
