const Admin = require('../models/Admin.model')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports.adminController = {
  registerAdmin: async (req, res) => {
    try {
      const { login, password } = req.body;
      const candidate = await Admin.findOne({ login: login });
      if (candidate) {
        return res
          .status(401)
          .json({ error: "Такой пользователь уже существует" });
      }
      const hash = await bcrypt.hash(
        password,
        Number(process.env.BCRYPT_ROUNDS)
      );
      const admin = await Admin.create({ login: login, password: hash });
      res.json(admin);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  loginAdmin: async (req, res) => {
    const { login, password } = req.body;
    const candidate = await Admin.findOne({ login: login });

    if (!candidate) {
      return res.status(401).json({ error: "Неверный логин или пароль" });
    }
    const valid = await bcrypt.compare(password, candidate.password);

    if (!valid) {
      return res.status(401).json({ error: "Неверный логин или пароль" });
    }

    const payload = {
      id: candidate._id,
      admin: candidate.isAdmin
    };
    const token = await jwt.sign(payload, 'adminAdmin222333', {
      expiresIn: "24h",
    });
    return res.json({
      token,
    });
  },
  getAdmins: async (req,res) => {
    try {
      const admin = await Admin.find()
      res.json(admin)
    } catch (error) {
      res.json({ error: error.message });
    }
  }
};