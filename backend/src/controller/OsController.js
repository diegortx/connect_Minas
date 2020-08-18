const OsModel = require('../model/OsModel');
const {
        startOfDay, endOfDay, 
        startOfWeek, endOfWeek,
        startOfMonth, endOfMonth,
        startOfYear, endOfYear    
    } = require('date-fns');

const current = new Date();

class OsController {

    async create(req, res){

        const os = new OsModel(req.body);

        await os
                .save()
                .then(response => {
                    return res.status(200).json(response);
                })
                .catch(error => {
                    return res.status(500).json(error);
                })
    }

    async update(req, res){

        await OsModel.findByIdAndUpdate({'_id': req.params.id}, req.body, { new:true})
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            })

    }

    async all(req, res){
        await OsModel.find({ user_id: {'$in': req.params.user_id} })
            .sort('when')
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error =>{
                return res.status(500).json(error);
            })
    }

    async show(req, res){
        await OsModel.findById(req.params.id)
                .then(response => {
                    if(response)
                        return res.status(200).json(response);
                    else
                        return res.status(404).json({error : 'Ordem de Serviço não encontranda'})
                })
                .catch(error => {
                    return res.status(500).json(error)
                })
    }

    async delete(req, res){
        await OsModel.deleteOne({'_id' : req.params.id})
                .then(response => {
                    return res.status(200).json(response)
                })
                .catch(error => {
                    return res.status(500).json(error)
                })
    }

    async done(req, res){
        await OsModel.findByIdAndUpdate(
            {'_id': req.params.id},
            {'done': req.params.done},
            {new: true}            
        ).then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(500).json(error);
        })
    }

    async late (req, res){
        await OsModel
                .find({
                    'when': {'$lt': current},
                    'user_id': {'$in': req.params.user_id}
                })
                .sort('when')
                .then( response => {
                    return res.status(200).json(response);
                }) 
                .catch( error => {
                    return res.status(500).json(error);
                })
    }

    async today (req, res){
        await OsModel
                .find({
                    'user_id': {'$in': req.params.user_id},
                    'when': {'$gte': startOfDay(current), '$lt': endOfDay(current)},
                })
                .sort('when')
                .then( response => {
                    return res.status(200).json(response);
                }) 
                .catch( error => {
                    return res.status(500).json(error);
                })
    }

    async week (req, res){
        await OsModel
                .find({
                    'user_id': {'$in': req.params.user_id},
                    'when': {'$gte': startOfWeek(current), '$lt': endOfWeek(current)},
                })
                .sort('when')
                .then( response => {
                    return res.status(200).json(response);
                }) 
                .catch( error => {
                    return res.status(500).json(error);
                })
    }

    async month (req, res){
        await OsModel
                .find({
                    'user_id': {'$in': req.params.user_id},
                    'when': {'$gte': startOfMonth(current), '$lt': endOfMonth(current)},
                })
                .sort('when')
                .then( response => {
                    return res.status(200).json(response);
                }) 
                .catch( error => {
                    return res.status(500).json(error);
                })
    }
    
    async year (req, res){
        await OsModel
                .find({
                    'user_id': {'$in': req.params.user_id},
                    'when': {'$gte': startOfYear(current), '$lt': endOfYear(current)},
                })
                .sort('when')
                .then( response => {
                    return res.status(200).json(response);
                }) 
                .catch( error => {
                    return res.status(500).json(error);
                })
    }
}


module.exports = new OsController();