const Product = require('../../models/product.model');

// [GET] /products
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: 'active',
        deleted: false
    });

    const newProducts = products.map(product => {
        product.priceNew = product.price * (1 - product.discountPercentage / 100).toFixed(0);
        return product;
    });


    console.log(newProducts);
    res.render("client/pages/products/index", {
        pageTitle: "Products Page",
        products: newProducts || []
    })
}