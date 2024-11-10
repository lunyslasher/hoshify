import {Schema, model} from 'mongoose';
import {IUser} from "../interfaces/IUser";

const UserSchema = new Schema({
    email: {type: String, unique: true, required: true},
    username: {type: String},
    password: {type: String, required: true},
});

const User = model<IUser>(`User`, UserSchema);

export default User;