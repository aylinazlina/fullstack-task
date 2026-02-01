import mongoose,{Schema,Document,Model} from "mongoose";

export interface IUser extends Document{
    name: string;
    email:string;
    password:string;
    role:"ADMIN" | "MANAGER" | "STAFF" ;
    status: "ACTIVE" | "INACTIVE" ;
    invitedAT?: Date;
    createdAt:Date;

}

const UserSchema= new Schema <IUser>({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,enum:["ADMIN","MANAGER","STAFF"],
        default:"STAFF",
    },
    status:{
        type:String,
        enum: ["ACTIVE","INACTIVE"],
        default: "ACTIVE",
    },
    invitedAT:{type:Date},

},{timestamps:true});

export default mongoose.model<IUser>("User",UserSchema);