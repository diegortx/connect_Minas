const jwt = require('../config/jwt');
const UserModel = require('../model/UserModel');




class UserController {

    async create(req, res){

        const user = new UserModel(req.body);

        const token = jwt.sign({ user: user.id})

        await user
                .save()
                .then(response => {
                    return res.status(200).json({ response, token});
                })
                .catch(error => {
                    return res.status(500).json(error);
                })
    }


    async update(req, res){

        await UserModel.findByIdAndUpdate({'_id': req.params.id}, req.body, { new:true})
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            })

    }

    async all(req, res){
        await UserModel.find()
                .sort('id')
                .then(response => {
                    return res.status(200).json(response);
                })
                .catch(error => {
                    return res.status(500).json(error);
                });
    }

    async show(req, res){
        await UserModel.findById(req.params.id)
                .then(response => {
                    if(response)
                        return res.status(200).json(response);
                    else
                        return res.status(404).json({error : 'Usuario não encontranda'})
                })
                .catch(error => {
                    return res.status(500).json(error)
                })
    }

    async delete(req, res){
        await UserModel.deleteOne({'_id' : req.params.id})
                .then(response => {
                    return res.status(200).json(response)
                })
                .catch(error => {
                    return res.status(500).json(error)
                })
    }

    
    async done(req, res){
        await UserModel.findByIdAndUpdate(
            {'_id': req.params.id},
            {new: true}            
        ).then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(500).json(error);
        })
    }

}

module.exports = new UserController();