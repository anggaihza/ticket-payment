const db = require("../models");
const user = db.Users;

module.exports = {
  getAll: async (req, res) => {
    try {
      const response = await user.findAll();
      res.status(200).send({data: response});
    } catch (error) {
      res.status(400).send(error);
    }
  },
  getAllById: async (req, res) => {
    try {
      const response = await user.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).send({data: response});
    } catch (error) {
      res.status();
      console.log(error);
      res.status(400).send(error);
    }
  },
};
