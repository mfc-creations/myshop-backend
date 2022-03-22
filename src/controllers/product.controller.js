const productService = require("../services/product.service");

module.exports = {
  fetchAllProducts: async (req, res, next) => {
    try {
      const { category, name } = req.query;
      const data = await productService.fetchProducts(category, name);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  fetchProduct: async (req, res, next) => {
    try {
      const { category, slug } = req.params;
      const data = await productService.fetchProduct({ category, slug });
      if (!data) {
        throw { message: "Product not found" };
      }
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
