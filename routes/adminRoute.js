const express = require('express');
const multer = require("multer");
const adminRoute = express.Router();
const adminController = require("../controller/adminContrl")
const categoryController = require('../controller/categoryContrl')
const productController = require('../controller/productContrl')
const customerController = require("../controller/customerContrl");
const { upload } = require('../config/upload')
const { isAdminLoggedIn, isAdminLoggedOut } = require('../middlewares/adminAuth')
const { adminValidateID } = require('../middlewares/idValidation')
const nocache = require('nocache')
require('dotenv').config()



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../../public/admin/uploads"));
    },
    filename: function (req, file, cb) {
        const name = Date.now() + "-" + file.originalname;
        cb(null, name);
    },
});

const upload1 = multer({
    storage: storage,
    limits: {
        fieldSize: 1024 * 1024 * 10,
    },
});

adminRoute.use((req, res, next) => {
    req.app.set("layout", "admin/layouts");
    next();
});



adminRoute.use((req, res, next) => {
    req.app.set('layout', 'admin/layouts/adminLayout');
    next();
})
adminRoute.use(nocache())


adminRoute.get('/', isAdminLoggedOut, adminController.loadLogin)
adminRoute.post('/', adminController.verifyAdmin);
adminRoute.get('/logout', isAdminLoggedIn, adminController.logout)



adminRoute.get("/dashboard",isAdminLoggedIn, adminController.dashboardpage);

adminRoute.get('/user', isAdminLoggedIn, adminController.userManagement)
adminRoute.post('/user/search', isAdminLoggedIn, adminController.searchUser)
adminRoute.post('/user/blockUser/:id', adminValidateID, isAdminLoggedIn, adminController.blockUser)
adminRoute.post('/user/unBlockUser/:id', adminValidateID,isAdminLoggedIn, adminController.unBlockUser)


adminRoute.get('/category', isAdminLoggedIn, categoryController.categoryManagement)
adminRoute.get('/addCategory', isAdminLoggedIn, categoryController.addCategory)
adminRoute.post('/addCategory', isAdminLoggedIn, categoryController.insertCategory)
adminRoute.get('/category/list/:id',adminValidateID, isAdminLoggedIn, categoryController.list)
adminRoute.get('/category/unList/:id',adminValidateID, isAdminLoggedIn, categoryController.unList)
adminRoute.get('/editCategory/:id',adminValidateID, isAdminLoggedIn, categoryController.editCategory)
adminRoute.post('/editCategory/:id',adminValidateID, isAdminLoggedIn, categoryController.updateCategory)
adminRoute.post('/category/search',adminValidateID, isAdminLoggedIn, categoryController.searchCategory)


adminRoute.get('/product/addProduct', isAdminLoggedIn, productController.addProduct)
 
adminRoute.post('/product/addProduct',
         upload.fields([{ name: "images" }]),
    productController.insertProduct) 
adminRoute.get('/products', isAdminLoggedIn, productController.productManagement)
adminRoute.post('/product/list/:id',adminValidateID, isAdminLoggedIn, productController.listProduct)
adminRoute.post('/product/unList/:id',adminValidateID, isAdminLoggedIn, productController.unListProduct)
adminRoute.get('/product/editproduct/:id',adminValidateID, isAdminLoggedIn, productController.editProductPage)
adminRoute.post('/product/editproduct/:id',adminValidateID, productController.updateProduct)
adminRoute.put('/product/edit-image/:id', adminValidateID,upload.single("image"),
     productController.editImage)
adminRoute.delete('/product/delete-image/:id',adminValidateID, productController.deleteImage)




adminRoute.get("/orders",isAdminLoggedIn, adminController.ordersPage);
adminRoute.get("/orders/:id", isAdminLoggedIn,adminController.editOrder);
adminRoute.put("/orders/update/:id", isAdminLoggedIn,adminController.updateOrderStatuss);
adminRoute.post("/orders/search", isAdminLoggedIn,adminController.searchOrder);





adminRoute.get("/coupons", isAdminLoggedIn,adminController.couponspage);
adminRoute.get("/coupon/add", isAdminLoggedIn,adminController.addCoupon);
adminRoute.get("/coupon/edit/:id",adminValidateID,isAdminLoggedIn, adminController.editCouponPage);

adminRoute.post("/coupon/add", isAdminLoggedIn,adminController.createCoupon);
adminRoute.post("/coupon/edit/:id",adminValidateID, isAdminLoggedIn,adminController.updateCoupon);



adminRoute.get("/sales-report",isAdminLoggedIn, adminController.salesReportpage);
adminRoute.get("/sales-data-weekly", adminController.getSalesData);
adminRoute.get("/get/sales-report", adminController.generateSalesReport);

adminRoute.get('*', (req, res) => { res.render('./admin/page404', { title: 'Error' }) })


module.exports = adminRoute