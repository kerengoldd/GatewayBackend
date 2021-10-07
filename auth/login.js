const User = require('../schemas/usersSchema');
const Bcrypt = require('bcrypt-nodejs');
const jsonwebtoken = require('jsonwebtoken');

module.exports=function(req,res){
    User.findOne({email: req.body.email}, function(err, user){
        if(err)
            return res.send({status: 500, msg: err.message});
        else if (!user)
            return res.send({ status: 401, msg:'The email address ' + req.body.email + ' is not associated with any account or it is not valid. please check and try again!'});
        Bcrypt.compare(req.body.password, user.password, (err,result)=>{
            if(err)
                return res.send({status: 401, msg:'Wrong password!'});
            if(!result)
                return res.send({status: 401, msg:'Email or password is wrong!'});
            else {
                user.password="";
                return res.send({status: 200, result: jsonwebtoken.sign({user},process.env.SECRET_TOKEN,{expiresIn:'3600s'})});
            }
        });
    });
}


