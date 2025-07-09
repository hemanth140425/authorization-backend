import mongoose from 'mongoose';
const subSchema = new mongoose.Schema({
    userId : {type : String, required : true, trim:true},
    price: {type : Number, required : true,min: [0,'price should be greater than 0'],max: [100000,'price should be less than 100000']},
    currency : {type : String, required : true,enum : ['USD','EUR','INR']},
    frequency : {type : String, required : true,enum : ['MONTHLY','YEARLY','DIALY']},
    category : {type : String, required : true,enum : ['BASIC','PRO','PREMIUM']},
    status : {type : String, required : true,enum : ['ACTIVE','CANCELLED','EXPIRED']},
    paymentMethod : {type : String, required : true,enum : ['CREDIT_CARD','DEBIT_CARD','UPI']},
    startdate:{
        type : Date,
        required : true,
        validate:{
            validator : (value) => value < new Date(),
            message : 'start date should be less than today'
        }
    },
    renewaldate : {
        type : Date,
        required : true,
        validate:{
            validator : (value) => value > this.startdate,
            message :'renewal date should be greater than today'
        }
    },
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }
},{timestamps : true});
subSchema.pre('save',function(next){
    const renewalperiod = {
        DIALY:1,
        WEEKLY : 7,
        MONTHLY : 30,
        YEARLY : 365,
    }
    if(!this.renewaldate){
        const renewaldate = new Date(this.startdate);
        this.renewaldate.setDate(renewaldate.getDate() + renewalperiod[this.frequency]);
    }
    if(this.renewaldate<new Date()){
        this.status = "EXPIRED";
    }
    next();
})
const subcription = mongoose.model('Subscription',subSchema);
export default subcription;