// [GET] /admin/products
const filterStatus = require('../../helpers/filterStatus');
const Product = require('../../models/product.model')

const filterStatusHelper = require('../../helpers/filterStatus');
const searchHelper = require('../../helpers/search');
const paginationHelper = require('../../helpers/pagination');

//[GET] /admin/products
module.exports.index = async (req, res) => {
    // console.log(req.query.status);

    // Đoạn bộ lọc
    const filterStatus = filterStatusHelper(req.query);

    // console.log(filterStatus);
    
    let find = {
        deleted: false
    };

    if(req.query.status){
        find.status = req.query.status;
    }

    //Tìm kiếm 
    const objectSearch = searchHelper(req.query);

    if(objectSearch.regex){
        find.title = objectSearch.regex;
    }

    //Pagination

    const countProducts = await Product.countDocuments(find);

    let objectPagination = paginationHelper(
        {
            limitItems: 4,
            currentPage: 1
        },
        req.query,
        countProducts   
    );
    //End Pagination


    const products = await Product.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip);

    // console.log(products);

    res.render("admin/pages/products/index", {
        pageTitle: "Trang DS SP",
        products: products || [],
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    })
}

// [GET] /admin/products/changeStatus/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;

    await Product.updateOne({_id: id}, {status: status});

    res.redirect("back");
}