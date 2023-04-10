const db = require("../models");
const user = db.Users;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  register: async (req, res) => {
    const {username, email, password, confPassword, phoneNumber} = req.body;

    // Cek apakah password dan confPassword sama
    if (password !== confPassword) {
      return res
        .status(400)
        .send({status: false, message: `Password dan confPassword tidak sama`});
    }

    // password minimal 8 karakter
    if (password.length < 8) {
      return res
        .status(400)
        .send({status: false, message: `Password setidaknya harus 8 karakter`});
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    try {
      const userExist = await user.findOne({
        where: {
          email,
        },
      });

      // cek apakah email sudah ada
      if (userExist) {
        return res
          .status(200)
          .send({status: false, message: `Email sudah digunakan`});
      }

      await user.create({
        username: username,
        email: email,
        password: hashPass,
        phoneNumber: phoneNumber,
      });

      res.status(200).send(`Success menambahkan user`);
    } catch (error) {
      res.status(400).send(error);
      console.log(error);
    }
  },

  ///////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////  LOGIN USER
  ///////////////////////////////////////////////////////////////////////////////
  login: async (req, res) => {
    try {
      const userExist = await user.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (!userExist) {
        return res.status(400).send({message: `User tidak ditemukan`});
      }

      // compare password
      // parameter pertama dari pass dari user
      // parameter kedua dari database
      const isVerify = await bcrypt.compare(
        req.body.password,
        userExist.password
      );

      // jika password user yang dikirim tidak cocok maka
      if (!isVerify) {
        res.status(400).send({status: false, message: `Password tidak cocok`});
      }

      // membuat token
      const payload = {
        id: userExist.id,
        isAdmin: userExist.isAdmin,
      };
      const token = jwt.sign(payload, "JWT", {expiresIn: "24h"});

      res.status(200).send({
        status: true,
        message: `Anda sudah login`,
        data: {
          id: userExist.id,
          username: userExist.username,
          email: userExist.email,
          phoneNumber: userExist.phoneNumber,
          isAdmin: userExist.isAdmin,
        },
        token,
      });
    } catch (error) {
      res.status(400).send(error);
    }
  },
};
