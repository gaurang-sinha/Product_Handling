const Utility = require('../Utiliy/utility');

module.exports = class Business {

    static async addBusiness(database, obj) {
        const sql = 'INSERT INTO business_detail SET ?';
        const data = await Utility.queryData(sql, obj, database);
        return data;
    }

    static async getBusiness(database, id){
        const sql = `Select * from business_detail where user_id = ${id}`;
        const data = await Utility.queryDataWithoutObject(sql, database);
        return data;
    }
};