const BusinessData = require('../modules/business');
const Utility = require('../Utiliy/utility');

let responseData;
/**
 * User adds business.
 * @param name string
 * @param email string
 * @param user_id number
 * @param reg_no string
 */
async function addBusiness(req, res) {
    try {
        const db = req.app.get('db')
        const user_id = req.user.user_id;
        const name = req.body.name;
        const email = req.body.email;
        const reg_no = req.body.reg_no;
        const obj = {
            "user_id": user_id,
            "name": name,
            "email": email,
            "reg_no": reg_no
        }
        const data = await BusinessData.addBusiness(db, obj);
        if (data.insertId) {
            responseData = Utility.getResponseData(true, 'Business added successfully', 200);
            res.status(responseData.meta.code).json(responseData);
        } else{
            res.send('Issue, Please try later');
        }
    } catch (e) {
        responseData = Utility.getResponseData(false, 'Failed, Please try again', 404);
        res.status(responseData.meta.code).json(responseData);
    }
}

/**
 * User gets all it's business.
 * @param user_id number
 * @return all the business details
 */
async function getBusiness(req, res){
    try{
        const db = req.app.get('db');
        const user_id = req.user.user_id;
        const businessData = await BusinessData.getBusiness(db, user_id);
        if(businessData.length){
            responseData = Utility.getResponseData(true, 'All your business', 200);
            responseData.meta['data'] = businessData;
            res.status(responseData.meta.code).json(responseData);
        } else{
            responseData = Utility.getResponseData(true, 'No business added, Add Business!!', 200);
        }
    } catch(e){
        responseData = Utility.getResponseData(false, 'Failed, Please try again', 404);
        res.status(responseData.meta.code).json(responseData);
    }
}

module.exports = { addBusiness, getBusiness };