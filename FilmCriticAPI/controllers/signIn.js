const redis = require('redis');
const jwt = require('jsonwebtoken');
// setup redis client
const redisClient = redis.createClient({host: '127.0.0.1'})

const fetchUserPasswordFromLoginTableDB = (email, db) => {
    return db('login')
        .where({email: email})
        .select('password')
        .then(data => Promise.resolve(data[0].password))
        .catch(e => Promise.reject("Cannot fetch user pw from PSQL Login Table")) 
}

const validateCredentials = async(textPw, hashPw, bcrypt) => {
    const validPw = await bcrypt.compare(textPw, hashPw);
    if(!validPw) {
        return Promise.reject('Wrong Credentials')
    } 
    return validPw;
}

const fetchUserDataFromUserTableDB = (isValid, email, db) => {
    if(!isValid) return Promise.reject('User login password is not authenticated')
    return db('users')
        .where({email: email})
        .select('*')
        .then(userData => Promise.resolve(userData[0]))
        .catch(e => Promise.reject("Cannot fetch user data from PSQL User Table"))
}

const createUserJwtObj = (userData) => {
    const userJwtObj = {id: userData.id, email: userData.email}
    return Promise.resolve(userJwtObj)
}

const setTokenInRedis = (token, id) => {
    return Promise.resolve(redisClient.set(token, id))
}
const generateAccessToken = async (userJwtObj) => {
    const token = await jwt.sign(userJwtObj, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '2h'});
    await setTokenInRedis(token, userJwtObj.id)
    const accessToken = {...userJwtObj, token }
    console.log(accessToken)
    return accessToken;
}

const handleSignIn = async (req, res, bcrypt, db) => {
    try {
        const {email, password} = req.body;
        const hashPw = await fetchUserPasswordFromLoginTableDB(email, db);
        const isValid = await validateCredentials(password, hashPw, bcrypt);
        const userData = await fetchUserDataFromUserTableDB(isValid, email, db)
        const userJwtObj = await createUserJwtObj(userData)
        const accessToken = await generateAccessToken(userJwtObj) 
        // First timer: token sent back contains {email, id, token}  
        const userDataAfterLogin = {accessToken, userData}
        res.json(userDataAfterLogin)
        // Client will save token in local storage, fetch to "/posts" setting header with Authorizzation + bearer token
    } catch (e) {
        console.log(e)
       let message = 'Something Went Wrong During Login';
       if(e === 'Wrong Credentials') {
           message = e;
       } 
       res.status(400).json(message)
    }
}

const signInAuthentication = (req, res, bcrypt, db) => {
    handleSignIn(req, res, bcrypt, db);
}

module.exports = {
    signInAuthentication: signInAuthentication,
    redisClient: redisClient
}