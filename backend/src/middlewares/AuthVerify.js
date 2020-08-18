const jwt = require('../config/jwt');
const UserModel = require('../model/UserModel');


const AuthVerify = async (req,res,next) => {

    const token = req.params.token


    try{

        const payload = await jwt.verify(token);
        const user = await UserModel.findById(payload.user)
        
        if(!user){
            res.send(401);
        }

        req.auth = user

        next()
    }catch (error){
        res.send(error);
    }
}

module.exports = AuthVerify;