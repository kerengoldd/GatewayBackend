const mongoose=require("mongoose");

const requestStatuseSchema=new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    file: Array,
    status: {
        type: Boolean,
        default: false
    }
});

module.exports=mongoose.model("request-ststus",requestStatuseSchema);