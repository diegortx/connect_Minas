const UserModel = require('../model/UserModel');
const { response } = require('express');
const jwt = require('../config/jwt');



class AuthController {

    async login(req,res){
        const email = req.params.email;
        const password=  req.params.password;

       // const [email, password] = Buffer.from(hash, 'base64').toString().split(':');


        try{
            const user = await UserModel.findOne({ email, password})

            if(!user){
                return res.send(401)
            }

            const token = jwt.sign({ user: user.id})

            res.send({ user, token })
        } catch (error) {
            res.send(error)
        }
      
    }


    async users(req,res){
        try{
            const users = await UserModel.find()

            res.send(users);

        }catch (error){
            res.send(error)
        }
    }

    async me(req,res){
        res.send(req.auth);
    }


    
 


}

module.exports = new AuthController();