const bcrypt = require('bcrypt');
const User = require('../models/user');

async function signup(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    // Handle successful signup
    res.redirect('/login');
  } catch (error) {
    // Handle signup error
    res.redirect('/signup');
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      // Handle incorrect email or password
      res.redirect('/login');
    } else {
      req.session.userId = user._id;
      // Handle successful login
      res.redirect('/home');
    }
  } catch (error) {
    // Handle login error
    res.redirect('/login');
  }
}

function logout(req, res) {
  req.session.destroy();
  // Handle logout
  res.redirect('/login');
}

module.exports = { signup, login, logout };
