const Bcrypt=require('bcrypt-nodejs');
const User=require('../schemas/usersSchema');

module.exports = function(req, res, next) {
    if(req.body.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
        User.findOne({email: req.body.email}, function (err, user) {
            if(err)
                return res.send({status: 500, msg: err.message});
            else if(user)
                return res.send({status: 400, msg:'This email address is already associated with another account.'});
            else
            {
                req.body.password=Bcrypt.hashSync(req.body.password, Bcrypt.genSaltSync(10));
                user=new User({email: req.body.email, password: req.body.password});
                user.save((err)=>{
                    if (err) 
                        return res.send({status: 500, msg:err.message});
                    else
                        return res.status({status: 200, result: {email: user.email}});
                });
            }
        });
    else
        return res.send({status: 400, msg:'This email input is not email.'});
}


