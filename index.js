const express = require('express');
const app = express();
const user = require('./controller/user');
const business = require('./controller/business');
const product = require('./controller/product');
const db = require('./config/dbConnection'); 
const middleware = require('./middleware/auth');

app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({  
  extended: true
})); 
let connection = db.createMySqlConnection();
app.set('db', connection);
app.listen(3000,() => console.log("Server running on port 3000"));


//routes----

app.post('/user/signup', user.signUp);
app.get('/user/login', user.login);
app.post('/user/addbusiness', middleware.authenticateToken, business.addBusiness);
app.get('/user/getbusiness', middleware.authenticateToken, business.getBusiness);
app.post('/user/addProducts', middleware.authenticateToken, product.addProducts);
app.post('/user/removeProducts', middleware.authenticateToken, product.removeProducts);
app.get('/user/checkPostedProducts', middleware.authenticateToken, product.checkPostedProducts);
app.post('/user/updateProductDetails', middleware.authenticateToken, product.updateProductDetails);


module.exports = {connection, app}



