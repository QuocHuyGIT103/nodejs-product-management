// [GET] /admin/products
const filterStatus = require('../../helpers/filterStatus');
const Product = require('../../models/product.model')

const filterStatusHelper = require('../../helpers/filterStatus');
const searchHelper = require('../../helpers/search');


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
    let objectPagination = {
        limitItems: 4,
        currentPage: 1
    };

    if(req.query.page){
        objectPagination.currentPage = parseInt(req.query.page);

    }

    objectPagination.skip = (objectPagination.currentPage -1) * objectPagination.limitItems;

    const countProducts = await Product.countDocuments(find);
    const totalPages = Math.ceil(countProducts/objectPagination.limitItems);

    objectPagination.totalPages = totalPages;
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