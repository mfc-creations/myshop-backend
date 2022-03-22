const checkoutService = require("../services/checkout.service");
const db = require("../models");

module.exports = {
  checkout: async (req, res, next) => {
    const t = await db.sequelize.transaction();
    try {
      const data = await checkoutService.checkout(req.body, req.user.id, t);
      res.status(200).json(data);
    } catch (err) {
      t.rollback();
      res.status(500).json({ message: err.message });
    }
  },
};
