const UserModel = require('../model/UserModel');

const UserValidation = async (req,res,next) => {

    const { 
        name,
        cpf,
        email,
        celphone,
        password,
        office
     } = req.body;

    if(!name)
        return res.status(400).json({ error: 'Nome é Obrigatório!'});    
    else if(!cpf)
        return res.status(400).json({ error: 'CPF é Obrigatório!'});
    else if(!email)
        return res.status(400).json({ error: 'E-MAIL é Obrigatório!'});
    else if(!celphone)
        return res.status(400).json({ error: 'Telefone é Obrigatório!'});
    else if(!password)
        return res.status(400).json({ error: 'Senha é Obrigatório!'});
    else if(!office)
        return res.status(400).json({ error: 'Cargo é Obrigatório!'});
    else{

        let exists;
        let existsEmail;

        exists = await UserModel.
                            findOne(
                                { 
                                    'cpf' : {'$eq' : cpf}                                                                        
                                }
                            );
        
        if(exists){
            return res.status(400).json({ error: 'Ja existe uma pessoa cadastrada com esse CPF'});
        }

        existsEmail = await UserModel.
                            findOne(
                                {
                                    'email': {'$eq' : email}
                                }
                            );
        if(existsEmail){
            return res.status(400).json({ error: 'Ja existe uma pessoa cadastrada com esse EMAIL'});
        }

        next();
    }
}

module.exports = UserValidation;