const express = require("express");
const User = require("../models/user-model");

const home = async (req, res) => {
  try {
    res.status(200).send("hello router");
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  try {
    res.status(200).send("welcome to registeration page");
    const { username, email, password } = req.body;
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(400).json({ msg: "email already exist" });
    }

    // const saltRound = 10;
    // const hash_password = await bcrypt.hash(password, saltRound);

    const userCreated = await User.create({
      username,
      email,
      password: hash_password,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { home, register };
