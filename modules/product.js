const Utility = require('../Utiliy/utility');

module.exports = class Business {
    static async addProduct(database, obj) {
        const sql = 'INSERT INTO product_details SET ?';
        const data = await Utility.queryData(sql, obj, database);
        return data;
    }
    
    static async removeProduct(database, id) {
        const sql = `UPDATE product_details SET is_delete = 1 WHERE product_id = ${id}`;
        console.log(sql);
        const data = await Utility.queryDataWithoutObject(sql, database); 
        return data;
    }

    static async getAllProducts(database, id){
        const sql = `Select * from product_details where user_id = ${id} and is_delete = 0`;
        const data = await Utility.queryDataWithoutObject(sql, database);
        return data;
    }
    
    static async updateProductDetails(database, obj){
        const sql = 'Update product_details SET ? where product_id = ' + obj.product_id + ' and user_id = ' + obj.user_id;
        const data = await Utility.queryData(sql, obj, database);
        return data;
    }
}