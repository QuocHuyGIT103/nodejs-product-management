// [GET] /admin/products
const filterStatus = require('../../helpers/filterStatus');
const Product = require('../../models/product.model')
module.exports.index = async (req, res) => {
    // console.log(req.query.status);

    // Đoạn bộ lọc
    const filterStatusHelper = require('../../helpers/filterStatus');

    const filterStatus = filterStatusHelper(req.query);

    // console.log(filterStatus);
    
    let find = {
        deleted: false
    };

    if(req.query.status){
        find.status = req.query.status;
    }

    let keyword = "";

    if(req.query.keyword){
        keyword = req.query.keyword;
        const regex = new RegExp(keyword, "i");
        find.title = regex;
    }

    const products = await Product.find(find);

    // console.log(products);

    res.render("admin/pages/products/index", {
        pageTitle: "Trang DS SP",
        products: products || [],
        filterStatus: filterStatus,
        keyword: keyword
    })
}