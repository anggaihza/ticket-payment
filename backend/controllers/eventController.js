const db = require("../models");
const jwt = require("jsonwebtoken");
const event = db.Events;
const {Op} = require("sequelize");

module.exports = {
  allEvent: async (req, res) => {
    try {
      // const {name, date, venue, ticketQuota, ticketPrice} = req.body;

      const data = await event.findAll({
        where: {
          date: {
            [Op.gte]: new Date(),
          },
        },
      });

      res
        .status(200)
        .send({status: 200, message: `Success menampilkan event`, data});
    } catch (error) {
      res.status(400).send({
        status: 400,
        message: `Gagal menampilkan event: ${error.message}`,
      });
      console.log(error);
    }
  },
  addEvent: async (req, res) => {
    try {
      let token = req.headers.authorization;
      if (!token) {
        return res.status(400).send({message: `Token tidak ditemukan`});
      }
      token = token.split(" ")[1];

      console.log(token);

      const verify = jwt.verify(token, "JWT");
      console.log(verify);

      if (verify.isAdmin == 0) {
        return res.status(400).send({message: `Anda bukan admin`});
      }

      const data = await event.create({
        ...req.body,
        admin_id: verify.id,
      });

      res
        .status(200)
        .send({status: 200, message: `Success menambahkan event`, data});
    } catch (error) {
      res.status(400).send({
        status: 400,
        message: `Gagal menambahkan event: ${error.message}`,
      });
      console.log(error);
    }
  },
};
