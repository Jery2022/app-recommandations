import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema, model } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Middleware pour hacher le mot de passe avant de sauvegarder l'utilisateur
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

const User = model('User', UserSchema);

export async function findAll() {
    return await User.find();
}

export async function create(userData) {
    const user = new User(userData);
    return await user.save();
}

export async function findById(id) {
    return await User.findById(id);
}

export async function deleteOne(id) {
    return await User.deleteOne(id);
}

export async function update(id, userData) {
    return await User.findByIdAndUpdate(id, userData, { new: true });
}

export default User;