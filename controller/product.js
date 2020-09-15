const Utility = require('../Utiliy/utility');
const ProductData = require('../modules/product');

let responseData;

/**
 * User adds product as a user or from a business name.
 * @param user_id number
 * @param business_id number
 * @param is_business boolean
 * @param is_user boolean
 * @param name string
 * @param mrp number
 * @param description string
 */
async function addProducts(req, res) {
    try {
        const db = req.app.get('db');
        const user_id = req.user.user_id;
        const business_id = req.body.business_id;
        const is_business = req.body.is_business;
        const is_user = req.body.is_user;
        const name = req.body.name;
        const mrp = req.body.mrp;
        const description = req.body.description;
        let obj = {
            "user_id": user_id,
            "name": name,
            "mrp": mrp,
            "description": description,
        };
        if (is_business) {
            obj["is_business"] = is_business;
            obj["business_id"] = business_id;
        }
        if (is_user) {
            obj["is_user"] = is_user;
        }
        const data = await ProductData.addProduct(db, obj);
        if (data.insertId) {
            responseData = Utility.getResponseData(true, 'Business added successfully', 200);
            res.status(responseData.meta.code).json(responseData);
        }
    } catch (err) {
        responseData = Utility.getResponseData(false, 'Failed, Please try again', 404);
        res.status(responseData.meta.code).json(responseData);
    }
}


/**
 * User can delete a product from their listed products.
 * @param product_id number
 */
async function removeProducts(req, res) {
    try {
        const db = req.app.get('db');
        const product_id = req.body.product_id;
        const is_removed = await ProductData.removeProduct(db, product_id);
        if (is_removed.affectedRows) {
            responseData = Utility.getResponseData(true, 'Product deleted successfully', 200);
            res.status(responseData.meta.code).json(responseData);
        }
    } catch (e) {
        responseData = Utility.getResponseData(false, 'Failed, Please try again', 404);
        res.status(responseData.meta.code).json(responseData);
    }
}


/**
 * User can check all their listed products.
 * @param user_id number
 * @param product_id number
 */
async function checkPostedProducts(req, res) {
    try{
        const db = req.app.get('db');
        const user_id = req.user.user_id;
        const productData = await ProductData.getAllProducts(db, user_id);
        if(productData.length){
            responseData = Utility.getResponseData(true, 'All your products', 200);
            responseData.meta['data'] = productData;
            res.status(responseData.meta.code).json(responseData);
        } else{
            responseData = Utility.getResponseData(true, 'No Products added yet!!', 200);
        }
    } catch (e) {
        responseData = Utility.getResponseData(false, 'Failed, Please try again', 404);
        res.status(responseData.meta.code).json(responseData);
    }
}

  /**
   * User can update the details of the products.
   * @param user_id number
   * @param product_id number
   * either of the following items - @param name @param mrp @param description
   */

async function updateProductDetails(req, res){
    try{
        const db = req.app.get('db');
        const user_id = req.user.user_id;
        const product_id = req.body.product_id;
        const name = req.body.name;
        const mrp = req.body.mrp;
        const description = req.body.description;
        let obj = {
            "user_id": user_id,
            "product_id": product_id,
        };
        if(!!name){
            obj.name = name;
        }
        if(!!mrp){
            obj.mrp = mrp;
        }
        if(!!description){
            obj.description = description;
        }
        if(obj.hasOwnProperty("name") || obj.hasOwnProperty("mrp") || obj.hasOwnProperty("description")){
            const is_updated = await ProductData.updateProductDetails(db, obj);
            if(is_updated.affectedRows){
                responseData = Utility.getResponseData(true, 'Updated Product successfully', 200);
                res.status(responseData.meta.code).json(responseData);
            }
        } else {
            responseData = Utility.getResponseData(true, 'Nothing to update', 200);
            res.status(responseData.meta.code).json(responseData);
        }
    } catch (e) {
        responseData = Utility.getResponseData(false, 'Failed, Please try again', 404);
        res.status(responseData.meta.code).json(responseData);
    }
}


module.exports = { addProducts, removeProducts, checkPostedProducts, updateProductDetails }