const db = require("../models");
const { Op } = require("sequelize");
module.exports = {
  fetchProducts: async (category, name = "") => {
    return (await category)
      ? db.Product.findAll({
          where: { category, name: { [Op.iLike]: `%${name}%` } },
        })
      : db.Product.findAll({ where: { name: { [Op.iLike]: `%${name}%` } } });
  },

  fetchProduct: async (data) => {
    return await db.Product.findOne({
      where: { category: data.category, slug: data.slug },
    });
  },
};
