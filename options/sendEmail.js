const RequestStatus=require("../schemas/requestStatusSchema");
const defaultTimedInstance=require("node-virustotal").makeAPI();

module.exports=function(req,res){
    if(req.body.from&&req.body.to&&req.body.from!=req.body.to&&req.body.subject&&req.body.content)
    {
        for(let index in req.files)
            defaultTimedInstance.uploadFile(req.files[index].data,req.files[index].name,'application/x-msdownload',(err,file_result)=>{
                if(err||file_result)
                    return res.send({status: 400, msg: "Invalid file!"});
            });
        let request_status=new RequestStatus({
            from: req.body.from,
            to: req.body.to,
            subject: req.body.subject,
            content: req.body.content,
            file: req.files,
            status: true
        });
        request_status.save((err)=>{
            if (err) 
                return res.send({status: 500, msg:err.message});
        });
        return res.send({status: 200, result: request_status});
    }
    else
        return res.send({status: 400, msg: "Failed to create the element!"});
}