import mongoose,{Document,Schema} from 'mongoose';

export interface IProject extends Document{
    name:string;
    description?:string;
    status:"ACTIVE" | "ARCHIVED" | "DELETE";
    isDeleted:boolean;
    createdBy:mongoose.Types.ObjectId;



}

const ProjectSchema=new Schema<IProject>({
    name:{type:String,required:true},
    description:{type:String},
    status:{
        type:String,
        enum:["ACTIVE","ARCHIVED","DELETED"],
        default: "ACTIVE",
    },
    isDeleted:{type:Boolean,default:false},
    createdBy:{type:mongoose.Types.ObjectId,ref: "User"},
},{timestamps:true});


export default mongoose.model<IProject>("Project",ProjectSchema);
