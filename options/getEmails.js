const RequestStatus=require("../schemas/requestStatusSchema");

module.exports=function(req,res){
    RequestStatus.find({status: true},(err,requests)=>{
        if(err)
            return res.send({status: 500, msg: err.message});
        else if(!requests)
            return res.send({status: 400, msg: "No email request found!"});
        else
            return res.send({status: 200, result: requests})
    });
}