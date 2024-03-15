import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: { type: String, required: true },
},{timesstamps: true});

const User = mongoose.model('User', userSchema);

export default User;
