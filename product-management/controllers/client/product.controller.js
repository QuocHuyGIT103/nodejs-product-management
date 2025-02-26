const Product = require("../../models/product.model");

// [GET] /products
module.exports.index = async (req, res) => {
  const products = await Product.find({
    status: "active",
    deleted: false,
  }).sort({ position: "desc" });

  const newProducts = products.map((product) => {
    product.priceNew =
      product.price * (1 - product.discountPercentage / 100).toFixed(0);
    return product;
  });

  // console.log(newProducts);
  res.render("client/pages/products/index", {
    pageTitle: "Products Page",
    products: newProducts || [],
  });
};

// [GET] /products/:slug
module.exports.deltail = async (req, res) => {
  console.log(req.params.slug);
  try {
    const find = {
      deleted: false,
      slug: req.params.slug,
      status: "active",
    };

    const product = await Product.findOne(find);

    console.log(product);

    res.render("client/pages/products/detail", {
      pageTitle: product.title,
      product: product || {},
      message: { success: req.flash("success")[0] || "" },
    });
  } catch (error) {
    res.redirect(`/products`);
  }
};
