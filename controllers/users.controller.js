const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports.usersController = {
  registerUser: async (req, res) => {
    try {
      const { login, password } = req.body;
      const candidate = await User.findOne({ login: login });
      if (candidate) {
        return res
          .status(401)
          .json({ error: "Такой пользователь уже существует" });
      }
      const hash = await bcrypt.hash(
        password,
        Number(process.env.BCRYPT_ROUNDS)
      );
      const user = await User.create({ login: login, password: hash });
      res.json(user);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { login, password } = req.body;
    const candidate = await User.findOne({ login: login });

    if (!candidate) {
      return res.status(401).json({ error: "Неверный логин или пароль" });
    }
    const valid = await bcrypt.compare(password, candidate.password);

    if (!valid) {
      return res.status(401).json({ error: "Неверный логин или пароль" });
    }

    const payload = {
      id: candidate._id,
    };
    const token = await jwt.sign(payload, 'sfdsfadsv34r423221!@#', {
      expiresIn: "24h",
    });
    return res.json({
      token,
    });
    } catch (error) {
      console.log(error);
    }
  },
  getUsers: async (req,res) => {
    try {
      const users = await User.find()
      res.json(users)
    } catch (error) {
      res.json({ error: error.message });
    }
  }
};