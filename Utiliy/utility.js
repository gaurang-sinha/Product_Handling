module.exports = class Utility {
    
    static queryData(sql, obj, db){
        return new Promise((resolve, reject) =>{
            db.query(sql, obj, (err, res)=>{
                if(err){
                    reject(err);
                }
                resolve(res);
            })
        })
    }
    
    static queryDataWithoutObject(sql, db){
        return new Promise((resolve, reject) =>{
            db.query(sql, (err, res)=>{
                if(err){
                    reject(err);
                }
                resolve(res);
            })
        })
    }

    static getResponseData(flag, msg, code){
        let responseData;
        if(flag){
            responseData = {
                meta: {
                    code: 200,
                    success: true,
                    message: msg,
                },
            };
        } else{
            responseData = {
                meta: {
                    code: code,
                    success: false,
                    message: msg,
                },
            };
        }
        return responseData;
    }
};