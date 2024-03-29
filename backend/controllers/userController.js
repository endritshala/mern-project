const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// sign up user
const signupUser = async (req, res) => {
  const { firstName, lastName, email, password, address, age, gender } =
    req.body;

  try {
    const user = await User.signup(
      firstName,
      lastName,
      email,
      password,
      address,
      age,
      gender
    );

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { loginUser, signupUser };
