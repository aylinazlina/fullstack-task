import mongoose,{Schema,Document} from "mongoose";

export interface IInvite extends Document {
    email:string;
    role: "ADMIN" | "MANAGER" | "STAFF";
    token:string;
    expiresAt:Date;
    acceptedAt?:Date;

}

const InviteSchema=new Schema<IInvite>({
    email:{type:String,required:true},
    role:{type:String,
        enum:["ADMIN","MANAGER","STAFF"],
        required:true,
    },
    token:{type:String,required:true,unique:true},
    expiresAt: {type:Date,required:true},
    acceptedAt:{type:Date,default:null},
    




},{timestamps:true});

export default mongoose.model<IInvite>("Invite",InviteSchema);
