const OsModel = require('../model/OsModel');
const { isPast } = require('date-fns');

const OsValidation = async (req,res,next) => {

    const { 
        title,
        description,
        city,
        when,
        user_id
     } = req.body;

    if(!title)
        return res.status(400).json({ error: 'Titulo é Obrigatório!'}) ;   
    else if(!description)
        return res.status(400).json({ error: 'Descrição é Obrigatório!'});
    else if(!city)
        return res.status(400).json({ error: 'Cidade é Obrigatório!'});
    else if(!when)
        return res.status(400).json({ error: 'Data e Hora são Obrigatórios!'});
    else if(!user_id)
        return res.status(400).json({ error: 'ID do Usuario é Obrigatório!'});
    else if (isPast(new Date(when)))
        return res.status(400).json({ error: 'Escolha uma data Futura'});
    else{
        
        let exists;
        if(req.params.id){

            exists = await OsModel.
            findOne(
                { 
                    '_id': {'$ne': req.params.id},
                    'when' : {'$eq' : new Date(when)},
                    'user_id': { '$in': user_id}
                }
            ); 
        }else{


            exists = await OsModel.
                                findOne(
                                    { 
                                        'when' : {'$eq' : new Date(when)},
                                        'user_id': { '$in': user_id}
                                    }
                                );
        }   
         
        if(exists){
            return res.status(400).json({ error: 'Ja existe uma tarefa nesse dia e horario pra essa pessoa'});
        }

        next();
    }
}

module.exports = OsValidation;