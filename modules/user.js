const Utility = require('../Utiliy/utility');

module.exports = class User {
    static async createUser(database, obj) {
        const sql = 'INSERT INTO user_detail SET ?';
        const data = await Utility.queryData(sql, obj, database);
        return data;
    }

    static async getUserData(database, name, password){
        const sql = `select * from user_detail where name = '${name}' and password = '${password}'` ;
        const data = await Utility.queryDataWithoutObject(sql, database);
        return data;
    }
};