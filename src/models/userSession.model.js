import mongoose from 'mongoose';
const UserSessionSchema=new mongoose.Schema({
  whatsappId:{type:String,required:true,unique:true},
  currentState:{type:String,default:'WELCOME'},
  history:{type:Array,default:[]}
},{timestamps:true});
export default mongoose.model('UserSession',UserSessionSchema);
