import mongoose, {Document, Model, Schema} from "mongoose";

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    age: number;
    gender: string;
    photoUrl: string;
    about: String;
    skills: [String];
}

const userSchema: Schema<IUser> = new Schema<IUser>({
    firstName: {type: String, required: true},
    lastName: {type: String},
    email: {type: String, required: true, unique: true,lowercase: true, trim: true},
    password: {type: String, required: true},
    age: {type: Number},
    gender: {type: String,validate(value:String){
        // @ts-ignore
            if(!["male","female","others"].includes(value)){
            throw new Error("Please enter a valid gender");
        }
    }},
    photoUrl: {type: String,default : "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg?semt=ais_hybrid&w=740&q=80"},
    about: {type: String, default: "This is a default about of the user! "},
    skills: [String]
},{
    timestamps: true,
});

export const UserModel: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
