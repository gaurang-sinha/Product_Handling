// const db = require('../config/dbConnection')
async function listing(req, res){
    const db = req.app.get('db');
    const data = await getData(db);
    res.send(data);
}

function getData(db){
    const sql = 'SELECT * FROM user_detail';
    return new Promise((resolve, reject) =>{
        db.query(sql, (err, res)=>{
            if(err){
                reject(err);
            }
            resolve(res);
        })
    })
}

module.exports = {listing};