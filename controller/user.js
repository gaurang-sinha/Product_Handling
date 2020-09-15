require('dotenv').config()
const UserData = require('../modules/user');
const Utility = require('../Utiliy/utility');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');


async function getHashData(password, salt) {
    let cipher = crypto.createCipher(process.env.HASH_ALGO, salt);
    let crypted = cipher.update(password, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}




  /**
   * User signs up.
   * @param name string
   * @param password string(hashed)
   * @param email string
   * @param bio string
   * a row in db is inserted
   */
async function signUp(req, res) {
    try {
        let responseData;
        const db = req.app.get('db');
        const name = req.body.name;
        const password = await getHashData(req.body.password, process.env.HASH_SALT);
        const email = req.body.email;
        const bio = req.body.bio;
        const obj = {
            "name": name,
            "password": password,
            "email": email,
            "bio": bio,
        }
        const data = await UserData.createUser(db, obj);
        if (data.insertId) {
            responseData = Utility.getResponseData(true, 'Sign Up successful', 200);
            res.status(responseData.meta.code).json(responseData);
        }
    } catch (e) {
        responseData = Utility.getResponseData(false, 'Failed, Please try again', 404);
        res.status(responseData.meta.code).json(responseData);
    }
}


function checkAuth(userData) {
    if (userData.length) {
        return true;
    }
    return false;
}

function generateAccessToken(user) {
    const userRec = Object.assign({}, user[0]);
    return jwt.sign(userRec, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
}

  /**
   * User log in.
   * @param name string
   * @param password string
   * authentication of the user is done
   * then a jwt token is generated that helps in authenticating the request.
   */
async function login(req, res) {
    try {
        let responseData;
        const db = req.app.get('db');
        const name = req.query.name;
        const password = req.query.password;
        const hashedPassword = await getHashData(password, process.env.HASH_SALT);
        const userData = await UserData.getUserData(db, name, hashedPassword);
        const is_authenticated = checkAuth(userData);
        if (is_authenticated) {
            const accessToken = generateAccessToken(userData);
            responseData = Utility.getResponseData(true, 'Log in successful', 200);
            responseData.meta['accessToken'] = accessToken;
            res.status(responseData.meta.code).json(responseData);
        } else {
            responseData = Utility.getResponseData(false, 'Unauthenticated', 401);
            res.status(responseData.meta.code).json(responseData);
        }
    } catch (e) {
        responseData = Utility.getResponseData(false, 'Failed, Please try again', 404);
        res.status(responseData.meta.code).json(responseData);
    }
}

module.exports = { signUp, login };